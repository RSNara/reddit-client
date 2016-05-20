import React, { PropTypes } from 'react';

const SubredditHeader = ({ title }) => {
  return (
    <h1 className="h1 mt1"> {title} </h1>
  );
};

SubredditHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SubredditHeader;
