import React, { PropTypes } from 'react';
import { Set } from 'immutable';

const Thumbnail = ({ src = '', style }) => {
  return (
    <img
      src={getImageUrl(src)}
      style={{...style, ...defaultStyles}} />
  );
};

function getImageUrl(url) {
  return Set.of('default', 'self', 'nsfw').includes(url)
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
