import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as I from 'immutable';
import { THUMBNAIL_EXPANDED } from '../constants';
import {
  getFilteredOrderedSubredditThreads,
  getSubredditThreadCardExpandedThumbnails,
  getNameOfLastFetchedSubredditThreadWithFilter,
} from '../selectors/main';
import {
  toggleSubredditThreadCardExpandThumbnail,
  fetchSubredditThreads,
} from '../action-creators';
import SubredditPage from '../components/subreddit-page';
import { curry } from 'ramda';

const Subreddit = ({
  threads,
  params: { filter, subreddit },
  expandedImagePreviews,
  finalThread,
  dispatch,
}) => {
  return (
    <SubredditPage
      subreddit={subreddit}
      filter={filter}
      threads={threads}
      shouldShowImagePreview={shouldShowImagePreview(expandedImagePreviews)}
      toggleImagePreview={toggleImagePreview(dispatch, subreddit)}
      fetchThreadsOnNextPage={fetchThreadsOnNextPage(dispatch, subreddit, filter, finalThread)}/>
  );
};

const toggleImagePreview = curry((dispatch, subreddit, id) =>
  () => dispatch(toggleSubredditThreadCardExpandThumbnail(subreddit, id))
);

const shouldShowImagePreview = curry((expandedImagePreviews, id) =>
  () => expandedImagePreviews.get(id, THUMBNAIL_EXPANDED)
);

const fetchThreadsOnNextPage = curry((dispatch, subreddit, filter, finalThread) =>
  () => dispatch(fetchSubredditThreads(subreddit, 25, finalThread, filter))
);

Subreddit.propTypes = {
  threads: PropTypes.instanceOf(I.List).isRequired,
  params: PropTypes.shape({
    subreddit: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
  }).isRequired,
  expandedImagePreviews: PropTypes.instanceOf(I.Map).isRequired,
  dispatch: PropTypes.func.isRequired,
  finalThread: PropTypes.string,
};

export default (sub) => connect(
  (state, { params }) => {
    const { filter, subreddit = sub } = params;
    return {
      params: { ...params, subreddit: subreddit  },
      threads: getFilteredOrderedSubredditThreads(state, subreddit, filter),
      expandedImagePreviews: getSubredditThreadCardExpandedThumbnails(state, subreddit),
      finalThread: getNameOfLastFetchedSubredditThreadWithFilter(state, subreddit, filter),
    };
  },
)(Subreddit);
