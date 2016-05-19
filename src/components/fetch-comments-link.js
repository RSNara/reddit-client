import React, { PropTypes } from 'react';

const FetchCommentsLink = ({ fetchComments, numberAvailable }) => {
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
        ({numberAvailable} replies)
      </span>
    </a>
  );
};

FetchCommentsLink.propTypes = {
  fetchComments: PropTypes.func.isRequired,
  numberAvailable: PropTypes.number.isRequired,
};

export default FetchCommentsLink;
