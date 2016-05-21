import React, { PropTypes } from 'react';

const CardContainer = ({ stickied, children }) => {
  return (
    <div
      className="px1 my1 bg-darken-1 rounded border-green"
      style={{
        ...style.stickied[stickied],
        ...style.shadow,
      }}>
      {children}
    </div>
  );
};

const style = {
  stickied: {
    true: {
      borderLeft: '0.5rem solid green',
    },
    false: {
      borderLeft: '0.5rem solid silver',
    },
  },
  shadow: {
    boxShadow: '0.1rem 0.05rem 0.1rem gray',
  },
};

CardContainer.propTypes = {
  stickied: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default CardContainer;
