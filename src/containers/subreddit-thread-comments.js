import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  getSubredditThreadComments,
  getFieldsOfSubredditThread,
  getSubredditThreadCommentCache,
} from '../selectors/main';
import { List, Map } from 'immutable';
import ThreadComment from '../components/thread-comment';
import ThreadCard from '../components/thread-card';
import { fetchSubredditThreadMoreComments } from '../action-creators';

const SubredditThreadComments = ({
  thread,
  threadComments,
  params,
  subredditThreadCommentCache,
  dispatch,
}) => {
  const { subreddit } = params;
  return (
    <section>
      <header>
        <ThreadCard thread={thread} subreddit={subreddit} />
        <p className="p2 bg-white border rounded"> { thread.get('selftext') } </p>
      </header>
      <section className="py1">
        {
          threadComments.map((comment, i) => (
            <ThreadComment
              comment={comment}
              cache={subredditThreadCommentCache}
              key={i}
              fetchMoreComments={(linkId, children) => (
                dispatch(fetchSubredditThreadMoreComments(
                  subreddit, thread.get('id'), linkId, children
                ))
              )}/>
          ))
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
  dispatch: PropTypes.func.isRequired,
};

export default connect(
  (state, { params: { subreddit, thread }}) => ({
    thread: getFieldsOfSubredditThread(state, subreddit, thread, ['id', 'title', 'author', 'selftext', 'url', 'score', 'is_self', 'num_comments']),
    threadComments: getSubredditThreadComments(state, subreddit, thread),
    subredditThreadCommentCache: getSubredditThreadCommentCache(state, subreddit, thread),
  })
)(SubredditThreadComments);
