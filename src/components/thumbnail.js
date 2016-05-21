import React, { PropTypes } from 'react';

const Thumbnail = ({ src = '', style }) => {
  return (
    <img
      src={src}
      style={{...style, ...defaultStyles}} />
  );
};

Thumbnail.propTypes = {
  src: PropTypes.string,
  style: PropTypes.object,
};

const defaultStyles = {
  maxWidth: '4rem',
  maxHeight: '4rem',
  width: 'auto',
  height: 'auto',
};

export default Thumbnail;
