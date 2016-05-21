import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Map } from 'immutable';
import { getLinkToComments } from './utils';

const ThreadLink = ({ subreddit, thread }) => {
  const data = thread.get('data', Map());
  const title = data.get('title', '');
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

ThreadLink.propTypes = {
  subreddit: PropTypes.string.isRequired,
  thread: PropTypes.instanceOf(Map).isRequired,
};

export default ThreadLink;
