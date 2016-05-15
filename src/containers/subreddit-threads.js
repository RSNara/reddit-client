import React, { PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { getFieldsOfSubredditThreads } from '../selectors/main';
import ThreadCard from '../components/thread-card';

const SubredditThreads = ({ params: { subreddit }, threads }) => {
  return (
    <div>
      {
        threads.map((thread, i) => (
          <ThreadCard thread={thread} key={i} subreddit={subreddit} />
        ))
      }
    </div>
  );
};

SubredditThreads.propTypes = {
  threads: PropTypes.instanceOf(List).isRequired,
  params: PropTypes.shape({
    subreddit: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  (state, { params: { subreddit } }) => ({
    threads: getFieldsOfSubredditThreads(state, subreddit, [
      'title', 'id', 'score', 'author', 'thumbnail', 'selftext', 'url', 'is_self', 'num_comments',
    ]),
  }),
)(SubredditThreads);
