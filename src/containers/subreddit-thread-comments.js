import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  getSubredditThreadComments,
  getFieldsOfSubredditThread,
  getSubredditThreadCommentCache,
  getSubredditThreadExpandedChildren,
} from '../selectors/main';
import { List, Map } from 'immutable';
import ThreadComment from '../components/thread-comment';
import FetchCommentsLink from '../components/fetch-comments-link';
import ThreadCard from '../components/thread-card';
import {
  fetchSubredditThreadMoreComments,
  fetchSubredditThreadMoreRootComments,
  toggleSubredditThreadCommentExpandChildren,
  deleteSubredditThreadComment,
} from '../action-creators';
import { CHILDREN_EXPANDED } from '../constants';

const SubredditThreadComments = ({
  thread,
  threadComments,
  params,
  subredditThreadCommentCache,
  subredditThreadExpandedChildren,
  dispatch,
}) => {
  const { subreddit } = params;

  const fetchMoreComments = (linkId, children) => (
    dispatch(fetchSubredditThreadMoreComments(
      subreddit, thread.get('id'), linkId, children
    ))
  );

  const shouldExpandChildren = (commentId) => (
    subredditThreadExpandedChildren.get(commentId, CHILDREN_EXPANDED)
  );

  const toggleExpandChildren = (commentId) => (
    dispatch(toggleSubredditThreadCommentExpandChildren(
      subreddit, thread.get('id'), commentId
    ))
  );

  return (
    <section>
      <header>
        <ThreadCard thread={thread} subreddit={subreddit} />
        <p className="p2 bg-white border rounded"> { thread.get('selftext') } </p>
      </header>
      <section className="py1 h5">
        {
          threadComments.map((comment, i) => {
            if (comment.get('kind') === 'more') {
              const children = comment.getIn(['data', 'children'], List());
              return (
                <FetchCommentsLink
                  key={i}
                  fetchComments={() => (
                    dispatch(fetchSubredditThreadMoreRootComments(
                      subreddit, thread.get('id'), thread.get('name'), children.join(',')
                    )),
                    dispatch(deleteSubredditThreadComment(
                      subreddit, thread.get('id'), comment.getIn(['data', 'id'])
                    ))
                  )} />
              );
            }

            return (
              <ThreadComment
                comment={comment}
                cache={subredditThreadCommentCache}
                key={i}
                fetchMoreComments={fetchMoreComments}
                shouldExpandChildren={shouldExpandChildren}
                toggleExpandChildren={toggleExpandChildren}/>
            );
          })
        }
      </section>
    </section>
  );
};

SubredditThreadComments.propTypes = {
  params: PropTypes.shape({
    subreddit: PropTypes.string.isRequired,
  }).isRequired,
  thread: PropTypes.instanceOf(Map).isRequired,
  threadComments: PropTypes.instanceOf(List).isRequired,
  subredditThreadCommentCache: PropTypes.instanceOf(Map).isRequired,
  subredditThreadExpandedChildren: PropTypes.instanceOf(Map).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(
  (state, { params: { subreddit, thread }}) => ({
    thread: getFieldsOfSubredditThread(state, subreddit, thread, ['id', 'title', 'author', 'name', 'selftext', 'url', 'score', 'is_self', 'num_comments', 'thumbnail']),
    threadComments: getSubredditThreadComments(state, subreddit, thread),
    subredditThreadCommentCache: getSubredditThreadCommentCache(state, subreddit, thread),
    subredditThreadExpandedChildren: getSubredditThreadExpandedChildren(state, subreddit, thread),
  })
)(SubredditThreadComments);
