import React, { PropTypes } from 'react';

const FetchCommentsLink = ({ fetchComments, childCount }) => {
  return (
    <a
      className="h6 text-decoration-none black"
      href="#"
      onClick={(event) => {
        event.preventDefault();
        fetchComments();
      }}>
      load more comments
      &nbsp;
      <span className="gray">
        ({childCount} replies)
      </span>
    </a>
  );
};

FetchCommentsLink.propTypes = {
  fetchComments: PropTypes.func.isRequired,
  childCount: PropTypes.number.isRequired,
};

export default FetchCommentsLink;
