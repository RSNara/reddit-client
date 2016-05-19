import React, { PropTypes } from 'react';
import ThreadComment from './thread-comment';
import { Map, List } from 'immutable';

const ThreadCommentMore = ({
  comment,
  linkId,
  toggleExpandChildren,
  shouldExpandChildren,
  fetchMoreComments,
  cache,
}) => {
  const childData = comment.get('data');
  const moreChildren = childData.get('children', List());
  const canDisplay = moreChildren.filter((id) => cache.has(id));

  return (
    <div>
      {
        canDisplay.map((id) => (
          <ThreadComment
            toggleExpandChildren={toggleExpandChildren}
            shouldExpandChildren={shouldExpandChildren}
            fetchMoreComments={fetchMoreComments}
            comment={cache.get(id)}
            cache={cache}
            key={id} />
        )).concat(
          canDisplay.size < moreChildren.size
            ? (
                <a
                  className="h5 text-decoration-none black bold"
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    fetchMoreComments(linkId, moreChildren.join(','));
                  }}
                  key={canDisplay.size}>
                  Request more comments!
                </a>
              )
            : [])
        }
    </div>
  );
};

ThreadCommentMore.propTypes = {
  fetchMoreComments: PropTypes.func.isRequired,
  comment: PropTypes.instanceOf(Map).isRequired,
  cache: PropTypes.instanceOf(Map).isRequired,
  toggleExpandChildren: PropTypes.func.isRequired,
  shouldExpandChildren: PropTypes.func.isRequired,
  linkId: PropTypes.string.isRequired,
};

export default ThreadCommentMore;
