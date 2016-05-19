import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Map } from 'immutable';
import ThreadVoteControls from './thread-vote-controls';
import Thumbnail from './thumbnail';
import cx from 'classnames';
import { differenceInHoursFromNow } from '../utils';

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
        {
          thread.get('is_self')
            ? null
            : <Thumbnail src={thread.get('thumbnail')} />
        }
        <div className="px2 flex-auto">
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

            <div className="h6">
              submitted by&nbsp;
              <span className="bold">{thread.get('author')}</span>,&nbsp;
              <span className="gray">
                {differenceInHoursFromNow(thread.get('created_utc'))}
                &nbsp;hours ago
              </span>
            </div>
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
