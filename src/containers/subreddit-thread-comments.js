import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getFieldsOfSubredditThreadComments } from '../selectors/main';
import { List } from 'immutable';

const SubredditThreadComments = ({ threadComments }) => {
  return (
    <ul>
      {
        threadComments.map((comment, i) => (
          <li key={i}>
            <h3>{ comment.get('author') }</h3>
            <p> { comment.get('body') } </p>
          </li>
        ))
      }
    </ul>
  );
};

SubredditThreadComments.propTypes = {
  threadComments: PropTypes.instanceOf(List).isRequired,
};

export default connect(
  (state, { params: { subreddit, thread }}) => ({
    threadComments: getFieldsOfSubredditThreadComments(state, subreddit, thread, ['author', 'id', 'body']),
  })
)(SubredditThreadComments);
