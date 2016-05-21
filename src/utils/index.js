import { Map, Set } from 'immutable';
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

export function differenceInHours(now, then) {
  const SECONDS_IN_HOUR = 60 * 60;
  return Math.floor((now - then) / SECONDS_IN_HOUR);
}

export function differenceInHoursFromNow(then) {
  return differenceInHours(Date.now() / 1000, then);
}

export function getThumbnailURLFromThread(thread) {
  const data = thread.get('data', Map());
  const thumbnail = data.get('thumbnail');
  return Set.of('default', 'self', 'nsfw', '').includes(thumbnail)
    ? 'http://placehold.it/500x500'
    : thumbnail;
}

export function getImageURLFromThread(thread) {
  const data = thread.get('data', Map());
  const domain = data.get('domain');
  const url = data.get('url');
  const isURLValidWRT = regex => regex.test(url);

  if (! /imgur/.test(domain) || [/\/gallery\//, /\/a\//].some(isURLValidWRT)) {
    return getThumbnailURLFromThread(thread);
  }

  if (! /(gifv|gif|png|jpg)/.test(url)) {
    return `${url}.jpg`;
  }

  return url;
}
