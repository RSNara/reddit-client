import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Map } from 'immutable';
import ThreadLink from './thread-link';
import ThreadOrigin from './thread-origin';
import ImagePreviewExpandToggle from './image-preview-expand-toggle';
import KarmaControls from './karma-controls';
import CardThumbnail from './card-thumbnail';
import ImagePreview from './image-preview';
import CardContainer from './card-container';

import { getLinkToComments } from './utils';

const ThreadCard = ({
  thread,
  shouldExpandThumbnail,
  toggleExpandThumbnail,
}) => {
  const data = thread.get('data', Map());
  const subreddit = data.get('subreddit', '');
  const commentsLink = getLinkToComments(subreddit, thread);
  const expandPreview = shouldExpandThumbnail();
  const author = data.get('author', '');
  const createdAt = data.get('created_utc', Date.now());
  const isStickied = data.get('stickied', false);
  const showThumbnail = !data.get('is_self') && !!data.get('thumbnail');
  return (
    <CardContainer stickied={isStickied}>
      <div className="flex items-center">
        <KarmaControls score={data.get('score', 0)} />
        <CardThumbnail visible={showThumbnail} thread={thread} />
        <div className="flex-auto px1">
          <div className="h5 truncate">
            <ThreadLink subreddit={subreddit} thread={thread} />
            <ThreadOrigin createdAt={createdAt} author={author} />
            <ImagePreviewExpandToggle visible={showThumbnail} onToggle={toggleExpandThumbnail} isExpanded={expandPreview} />
            <Link to={commentsLink} className="h6 text-decoration-none navy">
              {data.get('num_comments')} comments
            </Link>
          </div>
        </div>
      </div>
      <ImagePreview thread={thread} isExpanded={expandPreview} />
    </CardContainer>
  );
};


ThreadCard.propTypes = {
  thread: PropTypes.instanceOf(Map).isRequired,
  shouldExpandThumbnail: PropTypes.func.isRequired,
  toggleExpandThumbnail: PropTypes.func.isRequired,
};

export default ThreadCard;
