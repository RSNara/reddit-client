import React, { PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { getFieldsOfSubredditThreads } from '../selectors/main';
import { Link } from 'react-router';

const SubredditThreads = ({ params: { subreddit }, threads }) => {
  return (
    <ul>
      {
        threads.map((thread, i) => (
          <li key={i}>
            <Link to={`/r/${subreddit}/${thread.get('id')}/comments`}>
              {thread.get('title')}
            </Link>
          </li>
        ))
      }
    </ul>
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
    threads: getFieldsOfSubredditThreads(state, subreddit, [ 'title', 'id']),
  }),
)(SubredditThreads);
