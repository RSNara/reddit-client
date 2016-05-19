import React, { PropTypes } from 'react';
import { Set } from 'immutable';

const Thumbnail = ({ src = '', style }) => {
  const url = getURL(src);
  return (
    <img
      src={url}
      style={{...style, ...defaultStyles}} />
  );
};

function getURL(url) {
  return Set.of('default', 'self', 'nsfw', '').includes(url)
    ? 'http://placehold.it/500x500'
    : url;
}

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
