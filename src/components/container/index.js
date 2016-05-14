import React from 'react';
import classNames from 'classnames';

function Container({ children, size = 1, center }) {
  const containerClasses = classNames('clearfix', 'px1', {
    'max-width-1': size === 1,
    'max-width-2': size === 2,
    'max-width-3': size === 3,
    'max-width-4': size === 4,
    'mx-auto': center,
  });

  return (
    <div className={ containerClasses }>
      { children }
    </div>
  );
}

Container.propTypes = {
  children: React.PropTypes.node,
  size: React.PropTypes.oneOf([1, 2, 3, 4]),
  center: React.PropTypes.bool,
};

export default Container;
