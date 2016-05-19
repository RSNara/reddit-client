import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Map } from 'immutable';
import ThreadVoteControls from './thread-vote-controls';
import Thumbnail from './thumbnail';
import cx from 'classnames';

const ThreadCard = ({
  subreddit,
  thread,
  shouldExpandThumbnail,
  toggleExpandThumbnail,
}) => {
  const commentsLink = `/r/${subreddit}/${thread.get('id')}/comments`;
  const title = thread.get('title');
  const isThumbnailExpanded = shouldExpandThumbnail();
  return (
    <div className="px1 my1 bg-darken-1 rounded">
      <div className="flex items-center">
        <ThreadVoteControls score={thread.get('score', 0)} />
        <Thumbnail src={thread.get('thumbnail')} />
        <div className="px1 flex-auto">
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

            <div className="h6">submitted by {thread.get('author')}</div>
            <a
              className="h4 text-decoration-none"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleExpandThumbnail();
              }}>
              [{ isThumbnailExpanded ? '-' : '+' }]
            </a>
            &nbsp;
            <Link to={commentsLink} className="h6 text-decoration-none navy">
              {thread.get('num_comments')} comments
            </Link>
          </div>
        </div>
      </div>
      <div className={cx({
        'flex justify-center items-center p2 bg-black rounded': isThumbnailExpanded,
      })}>
        {
          isThumbnailExpanded
            ? <img src={thread.get('thumbnail')} />
            : null
        }
      </div>
    </div>
  );
};

ThreadCard.propTypes = {
  subreddit: PropTypes.string.isRequired,
  thread: PropTypes.instanceOf(Map).isRequired,
  shouldExpandThumbnail: PropTypes.func.isRequired,
  toggleExpandThumbnail: PropTypes.func.isRequired,
};

export default ThreadCard;
