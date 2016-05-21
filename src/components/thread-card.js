import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Map } from 'immutable';
import ThreadVoteControls from './thread-vote-controls';
import ThreadThumbnail from './thread-thumbnail';
import cx from 'classnames';
import {
  differenceInHoursFromNow,
  getImageURLFromThread,
} from '../utils';

const getLinkToComments = (subreddit, thread) => (
  `/r/${subreddit}/${thread.getIn(['data', 'id'])}/comments`
);

const CommentsLink = ({ subreddit, thread }) => {
  const data = thread.get('data', Map());
  const title = thread.get('title', '');
  const commentsLink = getLinkToComments(subreddit, thread);
  if (data.get('is_self')) {
    return (
      <Link to={commentsLink} className="text-decoration-none">
        {title}
      </Link>
    );
  }

  return (
    <a href={data.get('url')} className="text-decoration-none">
      {title}
    </a>
  );
};

CommentsLink.propTypes = {
  subreddit: PropTypes.string.isRequired,
  thread: PropTypes.instanceOf(Map).isRequired,
};

const ThreadOriginInfo = ({ thread }) => {
  const data = thread.get('data', Map());
  return (
    <div className="h6">
      submitted by&nbsp;
      <span className="bold">{data.get('author')}</span>,&nbsp;
      <span className="gray">
        {differenceInHoursFromNow(data.get('created_utc'))}
        &nbsp;hours ago
      </span>
    </div>
  );
};

ThreadOriginInfo.propTypes = {
  thread: PropTypes.instanceOf(Map).isRequired,
};

const ThreadCard = ({
  subreddit,
  thread,
  shouldExpandThumbnail,
  toggleExpandThumbnail,
}) => {
  const data = thread.get('data', Map());
  const isThumbnailExpanded = shouldExpandThumbnail();
  const commentsLink = getLinkToComments(subreddit, thread);
  return (
    <div
      className="px1 my1 bg-darken-1 rounded border-green"
      style={{
        ...style.stickied[data.get('stickied')],
        ...style.shadow,
      }}>
      <div className="flex items-center">
        <ThreadVoteControls score={data.get('score', 0)} />
        <ThreadThumbnail thread={thread} />
        <div className="flex-auto px1">
          <div className="h5 truncate">
            <CommentsLink subreddit={subreddit} thread={thread} />
            <ThreadOriginInfo thread={thread} />
            {
              data.get('is_self') || ! data.get('thumbnail')
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
            ? <img src={getImageURLFromThread(thread)} />
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
      borderLeft: '0.5rem solid silver',
    },
  },
  shadow: {
    boxShadow: '0.1rem 0.05rem 0.1rem gray',
  },
};

ThreadCard.propTypes = {
  subreddit: PropTypes.string.isRequired,
  thread: PropTypes.instanceOf(Map).isRequired,
  shouldExpandThumbnail: PropTypes.func.isRequired,
  toggleExpandThumbnail: PropTypes.func.isRequired,
};

export default ThreadCard;
