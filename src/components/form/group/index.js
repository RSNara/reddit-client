import React from 'react';

function FormGroup({ children, ...props}) {
  return (
    <div className="py2" {...props}>
      { children }
    </div>
  );
}

FormGroup.propTypes = {
  children: React.PropTypes.node,
};

export default FormGroup;
