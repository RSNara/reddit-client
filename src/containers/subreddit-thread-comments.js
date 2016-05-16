import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  getSubredditThreadComments,
  getFieldsOfSubredditThread,
} from '../selectors/main';
import { List, Map } from 'immutable';
import ThreadComment from '../components/thread-comment';
import ThreadCard from '../components/thread-card';

const SubredditThreadComments = ({ thread, threadComments, params }) => {
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
            <ThreadComment comment={comment} key={i}/>
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
};

export default connect(
  (state, { params: { subreddit, thread }}) => ({
    thread: getFieldsOfSubredditThread(state, subreddit, thread, ['title', 'author', 'selftext', 'url', 'score', 'is_self', 'num_comments']),
    threadComments: getSubredditThreadComments(state, subreddit, thread),
  })
)(SubredditThreadComments);
