import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';
import { connect } from 'react-redux';
import {
  getFieldsOfSubredditThreads,
  getSubredditThreadCardExpandedThumbnails,
} from '../selectors/main';
import ThreadCard from '../components/thread-card';
import { comparator } from 'ramda';
import {
  toggleSubredditThreadCardExpandThumbnail,
  fetchSubredditThreads,
} from '../action-creators';
import { THUMBNAIL_EXPANDED } from 'constants';
import SubredditHeader from '../components/subreddit-header';

const SubredditThreads = ({
  params: { subreddit },
  threads,
  subredditThreadCardExpandedThumbnails,
  dispatch,
}) => {
  const sortedThreads = threads.sort(compare);
  return (
    <section>
      <header>
        <SubredditHeader title={subreddit} />
      </header>
      {
        sortedThreads
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
      <button
        type="button"
        className="btn btn-primary btn-small"
        onClick={() => dispatch(
          fetchSubredditThreads(
            subreddit, 25, (sortedThreads.last() || Map()).get('name')
          )
        )}>
          Load More
      </button>
    </section>
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
      'is_self', 'num_comments', 'created_utc', 'name',
    ]),
    subredditThreadCardExpandedThumbnails: getSubredditThreadCardExpandedThumbnails(state, subreddit),
  }),
)(SubredditThreads);
