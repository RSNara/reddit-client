import React, { PropTypes } from 'react';
import marked from 'marked';
import cx from 'classnames';

// marked.setOptions({
//   breaks: true,
//   pedantic: true,
//   smartypants: true,
// });

const MarkdownBody = ({ string, className = '' }) => {
  return (
    <p
      className={cx(className, 'md-comment')}
      dangerouslySetInnerHTML={{__html: marked(string)}} />
  );
};

MarkdownBody.propTypes = {
  string: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default MarkdownBody;
