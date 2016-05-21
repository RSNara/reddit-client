import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import { getThumbnailURLFromThread } from '../../utils';

const CardThumbnail = ({ visible = true, thread }) => {
  if (! visible) {
    return (
      <div />
    );
  }

  return (
    <div className="px1 flex items-center justify-center">
      <img style={style.img} src={getThumbnailURLFromThread(thread)} />
    </div>
  );
};

CardThumbnail.propTypes = {
  visible: PropTypes.bool,
  thread: PropTypes.instanceOf(Map).isRequired,
};

const style = {
  img: {
    maxWidth: '4rem',
    maxHeight: '4rem',
    width: 'auto',
    height: 'auto',
  },
};

export default CardThumbnail;
