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
  const data = thread.get('data', Map());
  const commentsLink = `/r/${subreddit}/${data.get('id')}/comments`;
  const title = data.get('title');
  const isThumbnailExpanded = shouldExpandThumbnail();
  return (
    <div
      className="px1 my1 bg-darken-1 rounded border-green"
      style={style.stickied[data.get('stickied')]}>
      <div className="flex items-center">
        <ThreadVoteControls score={data.get('score', 0)} />
        {
          data.get('is_self')
            ? null
            : <div className="px1 flex items-center justify-center">
                <Thumbnail src={data.get('thumbnail')} />
              </div>
        }
        <div className="flex-auto px1">
          <div className="h5 truncate">
            {
              data.get('is_self')
                ? <Link to={commentsLink} className="text-decoration-none">
                    {title}
                  </Link>
                : <a href={data.get('url')} className="text-decoration-none">
                    {title}
                  </a>
            }

            <div className="h6">
              submitted by&nbsp;
              <span className="bold">{data.get('author')}</span>,&nbsp;
              <span className="gray">
                {differenceInHoursFromNow(data.get('created_utc'))}
                &nbsp;hours ago
              </span>
            </div>
            {
              data.get('is_self')
                ? null
                : <span>
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
                  </span>
            }
            <Link to={commentsLink} className="h6 text-decoration-none navy">
              {data.get('num_comments')} comments
            </Link>
          </div>
        </div>
      </div>
      <div className={cx({
        'flex justify-center items-center p2 bg-black rounded': isThumbnailExpanded,
      })}>
        {
          isThumbnailExpanded
            ? <img src={data.get('thumbnail')} />
            : null
        }
      </div>
    </div>
  );
};

const style = {
  stickied: {
    true: {
      borderLeft: '0.5rem solid green',
    },
    false: {
      border: 'none',
    },
  },
};

ThreadCard.propTypes = {
  subreddit: PropTypes.string.isRequired,
  thread: PropTypes.instanceOf(Map).isRequired,
  shouldExpandThumbnail: PropTypes.func.isRequired,
  toggleExpandThumbnail: PropTypes.func.isRequired,
};

export default ThreadCard;
