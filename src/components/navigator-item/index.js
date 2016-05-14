import React from 'react';
import classNames from 'classnames';

function NavigatorItem({
  children,
  isVisible = true,
  mr = false,
  ml = false,
}) {
  const navItemClasses = classNames('truncate', {
    hide: !isVisible,
    mr2: mr,
    ml2: ml,
  });

  return (
    <div className={ navItemClasses }>
      { children }
    </div>
  );
}

NavigatorItem.propTypes = {
  children: React.PropTypes.node,
  isVisible: React.PropTypes.bool,
  mr: React.PropTypes.bool,
  ml: React.PropTypes.bool,
};

export default NavigatorItem;
