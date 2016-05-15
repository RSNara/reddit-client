import React, { PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { getFieldsOfSubredditThreads } from '../selectors/main';
import { Link } from 'react-router';

const SubredditThreads = ({ params: { subreddit }, threads }) => {
  return (
    <table>
      <tbody>
      {
        threads.map((thread, i) => (
          <tr key={i}>
            <td>[{thread.get('score')}]</td>
            <td>
              <Link to={`/r/${subreddit}/${thread.get('id')}/comments`}>
                {thread.get('title')}
              </Link>
            </td>
          </tr>
        ))
      }
      </tbody>
    </table>
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
    threads: getFieldsOfSubredditThreads(state, subreddit, [ 'title', 'id', 'score' ]),
  }),
)(SubredditThreads);
