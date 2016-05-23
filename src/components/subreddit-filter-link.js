import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FRONT_PAGE_NAME } from '../constants';
import cx from 'classnames';

const SubredditFilterLink = ({ subreddit, filter, active }) => {
  return (
    <div className="pr1">
      <Link to={getSubredditFilterLink(subreddit, filter)}>
        <button
          type="button"
          className={ cx('btn btn-primary', { 'bg-gray': !active }) }>
          {filter}
        </button>
      </Link>
    </div>
  );
};

function getSubredditFilterLink(subreddit, filter) {
  if (subreddit === FRONT_PAGE_NAME) {
    return `/${filter}`;
  }

  return `/r/${subreddit}/${filter}`;
}

SubredditFilterLink.propTypes = {
  subreddit: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default SubredditFilterLink;
