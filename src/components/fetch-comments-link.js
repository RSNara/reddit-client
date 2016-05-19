import React, { PropTypes } from 'react';

const FetchCommentsLink = ({ fetchComments }) => {
  return (
    <a
      className="h6 text-decoration-none black bold"
      href="#"
      onClick={(event) => {
        event.preventDefault();
        fetchComments();
      }}>
      Request more comments!
    </a>
  );
};

FetchCommentsLink.propTypes = {
  fetchComments: PropTypes.func.isRequired,
};

export default FetchCommentsLink;
