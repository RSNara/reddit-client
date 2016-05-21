import React, { PropTypes } from 'react';
import ToggleButton from './toggle-button';

const ImagePreviewToggleButton = ({ visible, onToggle, isExpanded }) => {
  if (! visible) {
    return <span />;
  }

  return (
    <ToggleButton onToggle={onToggle} value={isExpanded} />
  );
};

ImagePreviewToggleButton.propTypes = {
  visible: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

export default ImagePreviewToggleButton;
