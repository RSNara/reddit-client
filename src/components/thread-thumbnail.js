import React, { PropTypes } from 'react';
import Thumbnail from './thumbnail';
import { Map } from 'immutable';
import { getThumbnailURLFromThread } from '../utils';

const ThreadThumbnail = ({ thread }) => {
  const data = thread.get('data', Map());

  if (data.get('is_self') || ! data.get('thumbnail')) {
    return (
      <div />
    );
  }

  return (
    <div className="px1 flex items-center justify-center">
      <Thumbnail src={getThumbnailURLFromThread(thread)} />
    </div>
  );
};

ThreadThumbnail.propTypes = {
  thread: PropTypes.instanceOf(Map).isRequired,
};

export default ThreadThumbnail;
