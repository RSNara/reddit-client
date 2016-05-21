import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';
import { connect } from 'react-redux';
import {
  getOrderedSubredditThreads,
  getSubredditThreadCardExpandedThumbnails,
} from '../selectors/main';
import ThreadCard from '../components/thread-card';
import {
  toggleSubredditThreadCardExpandThumbnail,
  fetchSubredditThreads,
} from '../action-creators';
import { THUMBNAIL_EXPANDED } from 'constants';
import SubredditHeader from '../components/subreddit-header';

const SubredditThreads = ({
  params: { subreddit },
  orderedThreads,
  subredditThreadCardExpandedThumbnails,
  dispatch,
}) => {
  return (
    <section>
      <header>
        <SubredditHeader title={subreddit} />
      </header>
      {
        orderedThreads
          .map((thread, i) => {
            const data = thread.get('data', Map());
            return (
              <ThreadCard
                shouldExpandThumbnail={() => (
                  !! subredditThreadCardExpandedThumbnails.get(data.get('id'), THUMBNAIL_EXPANDED) &&
                  ! data.get('is_self')
                )}
                toggleExpandThumbnail={() => (
                  dispatch(toggleSubredditThreadCardExpandThumbnail(
                    subreddit, data.get('id')
                  ))
                )}
                thread={thread}
                key={i}
                subreddit={subreddit} />
            );
          })
      }
      <button
        type="button"
        className="btn btn-primary btn-small"
        onClick={() => dispatch(
          fetchSubredditThreads(
            subreddit, 25, (orderedThreads.last() || Map()).getIn(['data', 'name'])
          )
        )}>
          Load More
      </button>
    </section>
  );
};

SubredditThreads.propTypes = {
  orderedThreads: PropTypes.instanceOf(List).isRequired,
  params: PropTypes.shape({
    subreddit: PropTypes.string.isRequired,
  }).isRequired,
  subredditThreadCardExpandedThumbnails: PropTypes.instanceOf(Map).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(
  (state, { params: { subreddit } }) => ({
    orderedThreads: getOrderedSubredditThreads(state, subreddit),
    subredditThreadCardExpandedThumbnails: getSubredditThreadCardExpandedThumbnails(state, subreddit),
  }),
)(SubredditThreads);
