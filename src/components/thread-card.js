import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Map } from 'immutable';
import VoteControls from './vote-controls';

const ThreadCard = ({ subreddit, thread }) => {
  const commentsLink = `/r/${subreddit}/${thread.get('id')}/comments`;
  return (
    <div className="flex px1 my1 bg-white border rounded items-center">
      <VoteControls score={thread.get('score')} />
      <div className="px1">
        <div>
          {
            thread.get('is_self')
              ? <Link to={commentsLink} className="h4 text-decoration-none">
                  {thread.get('title')}
                </Link>
              : <a href={thread.get('url')} className="h4 text-decoration-none">
                  {thread.get('title')}
                </a>
          }
          <div className="h6">submitted by {thread.get('author')}</div>
          <div>
            <Link to={commentsLink} className="h6 text-decoration-none navy">
              {thread.get('num_comments')} comments
            </Link>
          </div>
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
