import React, { PropTypes } from 'react';
import marked from 'marked';
import cx from 'classnames';

const MarkdownBody = ({ string, className = '' }) => {
  return (
    <p
      className={cx(className, 'md-comment')}
      dangerouslySetInnerHTML={createMarkup()} />
  );
};

function createMarkup (string) {
  return {__html: marked(string)};
}

MarkdownBody.propTypes = {
  string: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default MarkdownBody;
