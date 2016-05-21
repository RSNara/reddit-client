import React, { PropTypes } from 'react';
import ToggleButton from './toggle-button';
import { Map } from 'immutable';

const ImagePreviewToggleButton = ({ thread, onToggle, isExpanded }) => {
  const data = thread.get('data', Map());

  if (data.get('is_self') || ! data.get('thumbnail')) {
    return <span />;
  }

  return (
    <ToggleButton onToggle={onToggle} value={isExpanded} />
  );
};

ImagePreviewToggleButton.propTypes = {
  thread: PropTypes.instanceOf(Map).isRequired,
  onToggle: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

export default ImagePreviewToggleButton;
