import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  getSubredditThreadComments,
  getFieldsOfSubredditThread,
} from '../selectors/main';
import { List, Map } from 'immutable';
import ThreadComment from '../components/thread-comment';

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
            <h2> { threadIsSelf ? threadTitle : <a href={threadURL} className="text-decoration-none">{ threadTitle }</a>} </h2>
          </div>
          <h2 className="blue"> &nbsp;&nbsp;{ thread.get('author') } </h2>
        </div>
        <p className="p2 bg-white border rounded"> { thread.get('selftext') } </p>
      </header>
      <section className="py1">
        {
          threadComments.map((comment, i) => (
            // <div key={i} className="mb2">
              <ThreadComment comment={comment} key={i}/>
            // </div>
          ))
        }
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
    threadComments: getSubredditThreadComments(state, subreddit, thread),
  })
)(SubredditThreadComments);
