import React from 'react';

function Navigator({ children }) {
  return (
    <nav className="flex items-center p1 bg-white border-bottom">
      { children }
    </nav>
  );
}

Navigator.propTypes = {
  children: React.PropTypes.node,
};

export default Navigator;
