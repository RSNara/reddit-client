import { Map } from 'immutable';
import { last, head, compose, prop, values, clone} from 'ramda';

export function indexById(list) {
  return list.reduce((table, value) => (
    table.set(value.get('id'), value)
  ), Map());
}

const getComments = compose(clone, head, last, last, prop('jquery'));

function groupCommentsByParent(comments) {
  return comments.reduce((children, comment) => {
    if (! children[comment.data.parent_id]) {
      children[comment.data.parent_id] = [comment];
    } else {
      children[comment.data.parent_id].push(comment);
    }
    return children;
  }, {});
}

export function createCommentTree(response) {
  const comments = getComments(response);
  const children = groupCommentsByParent(comments);

  for (const comment of comments) {
    if (children[comment.data.name]) {
      comment.data.replies = {
        data: {
          kind: 'Listing',
          children: children[comment.data.name],
        },
      };
      delete children[comment.data.name];
    }
  }

  /**
   * @todo
   * Why is there always only one node left for root?
   * Corresponds to the comment whose link_id was used to fetch more children.
   * console.log(Object.keys(children)) to investigate
   */
  return head(values(children)) || [];
}
