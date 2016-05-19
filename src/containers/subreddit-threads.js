import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';
import { connect } from 'react-redux';
import {
  getFieldsOfSubredditThreads,
  getSubredditThreadCardExpandedThumbnails,
} from '../selectors/main';
import ThreadCard from '../components/thread-card';
import { comparator } from 'ramda';
import { toggleSubredditThreadCardExpandThumbnail } from '../action-creators';
import { THUMBNAIL_EXPANDED } from 'constants';

const SubredditThreads = ({
  params: { subreddit },
  threads,
  subredditThreadCardExpandedThumbnails,
  dispatch,
}) => {
  return (
    <div>
      {
        threads
          .sort(compare)
          .map((thread, i) => (
            <ThreadCard
              shouldExpandThumbnail={() => (
                subredditThreadCardExpandedThumbnails.get(thread.get('id'), THUMBNAIL_EXPANDED) &&
                ! thread.get('is_self')
              )}
              toggleExpandThumbnail={() => (
                dispatch(toggleSubredditThreadCardExpandThumbnail(
                  subreddit, thread.get('id')
                ))
              )}
              thread={thread}
              key={i}
              subreddit={subreddit} />
          ))
      }
    </div>
  );
};

const compare = comparator((a, b) => a.get('score') > b.get('score'));

SubredditThreads.propTypes = {
  threads: PropTypes.instanceOf(List).isRequired,
  params: PropTypes.shape({
    subreddit: PropTypes.string.isRequired,
  }).isRequired,
  subredditThreadCardExpandedThumbnails: PropTypes.instanceOf(Map).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(
  (state, { params: { subreddit } }) => ({
    threads: getFieldsOfSubredditThreads(state, subreddit, [
      'title', 'id', 'score', 'author', 'thumbnail', 'selftext', 'url',
      'is_self', 'num_comments', 'created_utc',
    ]),
    subredditThreadCardExpandedThumbnails: getSubredditThreadCardExpandedThumbnails(state, subreddit),
  }),
)(SubredditThreads);
