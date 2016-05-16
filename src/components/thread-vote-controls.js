import React, { PropTypes } from 'react';

const noop = () => {};

const ThreadVoteControls = ({ score, onUpvote = noop, onDownvote = noop }) => {
  return (
    <div className="flex flex-column items-center" style={style.root}>
      <button className="btn btn-small" onClick={onUpvote} type="button">
        <i className="fa fa-angle-up"/>
      </button>
      <div>{score}</div>
      <button className="btn btn-small" type="button" onClick={onDownvote}>
        <i className="fa fa-angle-down"/>
      </button>
    </div>
  );
};

ThreadVoteControls.propTypes = {
  score: PropTypes.number.isRequired,
  onUpvote: PropTypes.func,
  onDownvote: PropTypes.func,
};

const style = {
  root: {
    minWidth: '60px',
  },
};

export default ThreadVoteControls;
