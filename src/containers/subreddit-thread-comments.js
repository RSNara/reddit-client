import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  getSubredditThreadComments,
  getSubredditThread,
  getSubredditThreadCommentCache,
  getSubredditThreadExpandedChildren,
  getSubredditThreadCardExpandedThumbnails,
} from '../selectors/main';
import { List, Map } from 'immutable';
import ThreadComment from '../components/thread-comment';
import FetchCommentsLink from '../components/fetch-comments-link';
import ThreadCard from '../components/thread-card';
import MarkdownBody from '../components/markdown-body';
import {
  fetchSubredditThreadMoreComments,
  fetchSubredditThreadMoreRootComments,
  toggleSubredditThreadCommentExpandChildren,
  toggleSubredditThreadCardExpandThumbnail,
  deleteSubredditThreadComment,
} from '../action-creators';
import { CHILDREN_EXPANDED, THUMBNAIL_EXPANDED } from '../constants';
import { complement } from 'ramda';
import SubredditHeader from '../components/subreddit-header';

const SubredditThreadComments = ({
  thread,
  threadComments,
  params,
  subredditThreadCommentCache,
  subredditThreadExpandedChildren,
  subredditThreadCardExpandedThumbnails,
  dispatch,
}) => {
  const { subreddit } = params;
  const data = thread.get('data', Map());

  const fetchMoreComments = (linkId, children) => (
    dispatch(fetchSubredditThreadMoreComments(
      subreddit, data.get('id'), linkId, children
    ))
  );

  const shouldExpandChildren = (commentId) => (
    subredditThreadExpandedChildren.get(commentId, CHILDREN_EXPANDED)
  );

  const toggleExpandChildren = (commentId) => (
    dispatch(toggleSubredditThreadCommentExpandChildren(
      subreddit, data.get('id'), commentId
    ))
  );

  const toggleExpandThumbnail = () => (
    dispatch(toggleSubredditThreadCardExpandThumbnail(
      subreddit, data.get('id'),
    ))
  );

  const shouldExpandThumbnail = () => (
    subredditThreadCardExpandedThumbnails.get(data.get('id'), THUMBNAIL_EXPANDED) &&
    ! data.get('is_self')
  );

  const moreComment = threadComments.find(isMore);
  const normalComments = threadComments.filter(complement(isMore));

  return (
    <section>
      <header>
        <SubredditHeader title={subreddit} />
        <ThreadCard
          shouldExpandThumbnail={shouldExpandThumbnail}
          toggleExpandThumbnail={toggleExpandThumbnail}
          thread={thread}
          subreddit={subreddit} />
        {
          data.get('is_self') && data.get('selftext')
            ? <MarkdownBody
                string={data.get('selftext')}
                className="px3 py1 h5 bg-silver shadow rounded" />
            : null
        }
      </header>
      <section className="py1 h5">
        {
          normalComments.map((comment, i) => (
            <ThreadComment
              comment={comment}
              cache={subredditThreadCommentCache}
              key={i}
              fetchMoreComments={fetchMoreComments}
              shouldExpandChildren={shouldExpandChildren}
              toggleExpandChildren={toggleExpandChildren}/>
          ))
        }
        {
          moreComment
            ? <FetchCommentsLink
                childCount={moreComment.getIn(['data', 'count'], 0)}
                fetchComments={() => (
                  dispatch(fetchSubredditThreadMoreRootComments(
                    subreddit,
                    data.get('id'),
                    data.get('name'),
                    moreComment.getIn(['data', 'children'], List()).join(',')
                  )),
                  dispatch(deleteSubredditThreadComment(
                    subreddit, data.get('id'), moreComment.getIn(['data', 'id'])
                  ))
                )} />
            : null
        }
      </section>
    </section>
  );
};

const isMore = (comment) => comment.get('kind') === 'more';

SubredditThreadComments.propTypes = {
  params: PropTypes.shape({
    subreddit: PropTypes.string.isRequired,
  }).isRequired,
  thread: PropTypes.instanceOf(Map).isRequired,
  threadComments: PropTypes.instanceOf(List).isRequired,
  subredditThreadCommentCache: PropTypes.instanceOf(Map).isRequired,
  subredditThreadExpandedChildren: PropTypes.instanceOf(Map).isRequired,
  subredditThreadCardExpandedThumbnails: PropTypes.instanceOf(Map).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(
  (state, { params: { subreddit, thread } }) => ({
    thread: getSubredditThread(state, subreddit, thread) || Map(),
    threadComments: getSubredditThreadComments(state, subreddit, thread),
    subredditThreadCommentCache: getSubredditThreadCommentCache(state, subreddit, thread),
    subredditThreadExpandedChildren: getSubredditThreadExpandedChildren(state, subreddit, thread),
    subredditThreadCardExpandedThumbnails: getSubredditThreadCardExpandedThumbnails(state, subreddit),
  })
)(SubredditThreadComments);
