import React, { PropTypes } from 'react';

const ToggleButton = ({ onToggle, value }) => {
  return (
    <span>
      <a
        className="h4 text-decoration-none"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onToggle();
        }}>
        [{ value ? '-' : '+' }]
      </a>
      &nbsp;
    </span>
  );
};

ToggleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};

export default ToggleButton;
