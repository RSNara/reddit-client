import React from 'react';

function Input({
  type = 'text',
  placeholder = '',
  fieldDefinition,
  ...props,
}) {
  return (
    <input
      className="block col-12 mb1 input"
      type={ type }
      placeholder={ placeholder }
      { ...fieldDefinition }
      { ...props } />
  );
}

Input.propTypes = {
  type: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  fieldDefinition: React.PropTypes.object.isRequired,
};

export default Input;
