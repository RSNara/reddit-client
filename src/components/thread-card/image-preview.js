import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import cx from 'classnames';
import { getImageURLFromThread } from '../../utils';

const ImagePreview = ({ isExpanded, thread}) => {
  return (
    <div className={cx({
      'flex justify-center items-center p2 bg-black rounded': isExpanded,
    })}>
      {
        isExpanded
          ? <img src={getImageURLFromThread(thread)} />
          : null
      }
    </div>
  );
};

ImagePreview.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  thread: PropTypes.instanceOf(Map).isRequired,
};

export default ImagePreview;
