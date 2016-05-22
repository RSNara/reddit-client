import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

const SubredditFilterLink = ({ subreddit, filter, active }) => {
  return (
    <div className="pr1">
      <Link to={`/r/${subreddit}/${filter}`}>
        <button
          type="button"
          className={ cx('btn btn-primary', { 'bg-gray': !active }) }>
          {filter}
        </button>
      </Link>
    </div>
  );
};

SubredditFilterLink.propTypes = {
  subreddit: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default SubredditFilterLink;
