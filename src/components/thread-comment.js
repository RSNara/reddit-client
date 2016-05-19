import React, { PropTypes } from 'react';
import { Map, List } from 'immutable';

const ThreadComment = ({ comment, cache, fetchMoreComments }) => {
  const data = comment.get('data');
  const linkId = data.get('link_id');

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
          children.map((child, i) => {
            const childKind = child.get('kind');
            const childData = child.get('data');

            if (childKind === 'more') {
              const moreChildren = childData.get('children', List());
              const canDisplay = moreChildren.filter((id) => cache.has(id));

              return canDisplay.map((id) => (
                <ThreadComment fetchMoreComments={fetchMoreComments} comment={cache.get(id)} cache={cache} key={id} />
              )).concat(
                canDisplay.size === 0
                  ? (
                      <button type="button" className="btn btn-small blue" onClick={() => fetchMoreComments(linkId, moreChildren.join(','))} key={i}>
                        Request more comments!
                      </button>
                    )
                  : []
              );
            }

            return (
              <ThreadComment fetchMoreComments={fetchMoreComments} comment={child} cache={cache} key={i} />
            );
          })
        }
      </div>
    </section>
  );
};

ThreadComment.propTypes = {
  fetchMoreComments: PropTypes.func.isRequired,
  comment: PropTypes.instanceOf(Map).isRequired,
  cache: PropTypes.instanceOf(Map).isRequired,
};

export default ThreadComment;
