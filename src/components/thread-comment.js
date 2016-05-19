import React, { PropTypes } from 'react';
import { Map, List } from 'immutable';
import cx from 'classnames';
import ThreadCommentMore from './thread-comment-more';
import ThreadCommentBody from './thread-comment-body';

const ThreadComment = ({
  comment,
  cache,
  fetchMoreComments,
  shouldExpandChildren,
  toggleExpandChildren,
}) => {
  const data = comment.get('data');
  const commentId = data.get('id');
  const linkId = data.get('link_id');
  const childrenExpanded = shouldExpandChildren(commentId);

  // replies is an empty string if there are no replies
  const children = data.getIn(['replies', 'data', 'children'], List());

  return (
    <section className="pl2 p1 bg-white border rounded mb1">
      <div className="flex">
        <div className="pr1">
          <i
            onClick={() => toggleExpandChildren(commentId)}
            aria-hidden="true"
            className={cx(
            'fa', {
              'fa-chevron-down': childrenExpanded,
              'fa-chevron-right': !childrenExpanded,
            })}
            style={{cursor: 'pointer'}}
          />
        </div>
        <div>
          <div className="h6 inline-block rounded">
            <span className="blue">
              {data.get('author')}
            </span>
            &nbsp;&nbsp;
            <span className="bold">
              {data.get('score')} points
            </span>
            &nbsp;&nbsp;
            <span className="dark-gray">
              {differenceInHours(Date.now() / 1000, data.get('created_utc'))} hours ago
            </span>
          </div>
          <ThreadCommentBody string={data.get('body')} className="mt0" />
        </div>
      </div>
      <div>
        {
          childrenExpanded
            ? children.map((child, i) => {
              const childKind = child.get('kind');

              if (childKind === 'more') {
                return (
                  <ThreadCommentMore
                    linkId={linkId}
                    toggleExpandChildren={toggleExpandChildren}
                    shouldExpandChildren={shouldExpandChildren}
                    fetchMoreComments={fetchMoreComments}
                    comment={child}
                    cache={cache}
                    key={i} />
                );
              }

              return (
                <ThreadComment
                  toggleExpandChildren={toggleExpandChildren}
                  shouldExpandChildren={shouldExpandChildren}
                  fetchMoreComments={fetchMoreComments}
                  comment={child}
                  cache={cache}
                  key={i} />
              );
            })
          : []
        }
      </div>
    </section>
  );
};

function differenceInHours(now, then) {
  const SECONDS_IN_HOUR = 60 * 60;
  return Math.floor((now - then) / SECONDS_IN_HOUR);
}

ThreadComment.propTypes = {
  fetchMoreComments: PropTypes.func.isRequired,
  comment: PropTypes.instanceOf(Map).isRequired,
  cache: PropTypes.instanceOf(Map).isRequired,
  toggleExpandChildren: PropTypes.func.isRequired,
  shouldExpandChildren: PropTypes.func.isRequired,
};

export default ThreadComment;
