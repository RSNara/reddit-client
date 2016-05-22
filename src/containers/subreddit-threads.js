import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';
import { connect } from 'react-redux';
import {
  getFilteredOrderedSubredditThreads,
  getSubredditThreadCardExpandedThumbnails,
} from '../selectors/main';
import ThreadCard from '../components/thread-card';
import {
  toggleSubredditThreadCardExpandThumbnail,
  fetchSubredditThreads,
} from '../action-creators';
import { THUMBNAIL_EXPANDED } from 'constants';
import SubredditHeader from '../components/subreddit-header';
import SubredditFilterLink from '../components/subreddit-filter-link';

const SubredditThreads = ({
  params: { subreddit, filter },
  orderedThreads,
  subredditThreadCardExpandedThumbnails,
  dispatch,
}) => {
  return (
    <section>
      <header>
        <SubredditHeader title={subreddit} />
        <div className="flex">
          <SubredditFilterLink subreddit={subreddit} filter={'hot'} active={filter === 'hot'}/>
          <SubredditFilterLink subreddit={subreddit} filter={'top'} active={filter === 'top'}/>
          <SubredditFilterLink subreddit={subreddit} filter={'controversial'} active={filter === 'controversial'}/>
          <SubredditFilterLink subreddit={subreddit} filter={'new'} active={filter === 'new'}/>
        </div>
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
            subreddit, 25, (orderedThreads.last() || Map()).getIn(['data', 'name']), filter
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
    filter: PropTypes.string.isRequired,
  }).isRequired,
  subredditThreadCardExpandedThumbnails: PropTypes.instanceOf(Map).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(
  (state, { params: { subreddit, filter } }) => ({
    orderedThreads: getFilteredOrderedSubredditThreads(state, subreddit, filter),
    subredditThreadCardExpandedThumbnails: getSubredditThreadCardExpandedThumbnails(state, subreddit),
  }),
)(SubredditThreads);
