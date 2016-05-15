import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  getFieldsOfSubredditThreadComments,
  getFieldsOfSubredditThread,
} from '../selectors/main';
import { List, Map } from 'immutable';

const SubredditThreadComments = ({ thread, threadComments }) => {
  const threadIsSelf = thread.get('is_self');
  const threadTitle = thread.get('title');
  const threadURL = thread.get('url');
  return (
    <section>
      <header>
        <div className="flex justify-between">
          <div className="flex">
            <h2> [{ thread.get('score') }] &nbsp;&nbsp; </h2>
            <h2> { threadIsSelf ? threadTitle : <a href={threadURL}>{ threadTitle }</a>} </h2>
          </div>
          <h2 className="blue"> &nbsp;&nbsp;{ thread.get('author') } </h2>
        </div>
        <p className="p2 bg-white border rounded"> { thread.get('selftext') } </p>
      </header>
      <section className="py1 border rounded">
        <ul>
          {
            threadComments.map((comment, i) => (
              <li key={i}>
                <h3>{ comment.get('author') } ({ comment.get('score') })</h3>
                <p>{ comment.get('body') }</p>
              </li>
            ))
          }
        </ul>
      </section>
    </section>
  );
};

SubredditThreadComments.propTypes = {
  thread: PropTypes.instanceOf(Map).isRequired,
  threadComments: PropTypes.instanceOf(List).isRequired,
};

export default connect(
  (state, { params: { subreddit, thread }}) => ({
    thread: getFieldsOfSubredditThread(state, subreddit, thread, ['title', 'author', 'selftext', 'url', 'score', 'is_self']),
    threadComments: getFieldsOfSubredditThreadComments(state, subreddit, thread, ['author', 'id', 'body', 'score']),
  })
)(SubredditThreadComments);
