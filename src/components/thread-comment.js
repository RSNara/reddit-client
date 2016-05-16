import React, { PropTypes } from 'react';
import { Map, List } from 'immutable';

const ThreadComment = ({ comment }) => {
  const data = comment.get('data');

  // replies is an empty string if there are no replies
  const children = data.getIn(['replies', 'data', 'children'], List());

  return (
    <section className="pl2 p1 bg-white border rounded mb1">
      <div>
        <div className="h6">{data.get('author')}</div>
        <p className="mt0">{data.get('body')}</p>
      </div>
      <div>
        {
          children.map((child, i) => (
            <ThreadComment comment={child} key={i} />
          ))
        }
      </div>
    </section>
  );
};

ThreadComment.propTypes = {
  comment: PropTypes.instanceOf(Map).isRequired,
};

export default ThreadComment;
