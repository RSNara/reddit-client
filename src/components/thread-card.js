import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Map } from 'immutable';
import ThreadVoteControls from './thread-vote-controls';

const ThreadCard = ({ subreddit, thread }) => {
  const commentsLink = `/r/${subreddit}/${thread.get('id')}/comments`;
  const title = thread.get('title');
  return (
    <div className="flex px1 my1 bg-darken-1 rounded items-center">
      <ThreadVoteControls score={thread.get('score', 0)} />
      <div className="px1 flex-auto">
        <div>
          <div className="h5 truncate">
          {
            thread.get('is_self')
              ? <Link to={commentsLink} className="text-decoration-none">
                  {title}
                </Link>
              : <a href={thread.get('url')} className="text-decoration-none">
                  {title}
                </a>
          }
          </div>
          <div className="h6">submitted by {thread.get('author')}</div>
          <Link to={commentsLink} className="h6 text-decoration-none navy">
            {thread.get('num_comments')} comments
          </Link>
        </div>
      </div>
    </div>
  );
};

ThreadCard.propTypes = {
  subreddit: PropTypes.string.isRequired,
  thread: PropTypes.instanceOf(Map).isRequired,
};

export default ThreadCard;
