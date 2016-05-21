import React, { PropTypes } from 'react';
import ThreadAge from './thread-age';

const ThreadOrigin = ({ author, createdAt }) => {
  return (
    <div className="h6">
      submitted by&nbsp;
      <span className="bold">{author}</span>,&nbsp;
      <ThreadAge createdAt={createdAt} />
    </div>
  );
};

ThreadOrigin.propTypes = {
  author: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
};

export default ThreadOrigin;
