export const getLinkToComments = (subreddit, thread) => (
  `/r/${subreddit}/${thread.getIn(['data', 'id'])}/comments`
);
