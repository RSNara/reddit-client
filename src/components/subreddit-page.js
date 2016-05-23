import React, { PropTypes } from 'react';
import * as I from 'immutable';
import SubredditHeader from '../components/subreddit-header';
import SubredditFilterLink from '../components/subreddit-filter-link';
import ThreadCardList from '../components/thread-card-list';

const SubredditPage = ({
  subreddit,
  filter,
  threads,
  shouldShowImagePreview,
  toggleImagePreview,
  fetchThreadsOnNextPage,
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
      <ThreadCardList
        threads={threads}
        shouldShowImagePreview={shouldShowImagePreview}
        toggleImagePreview={toggleImagePreview} />
      <button
        type="button"
        className="btn btn-primary btn-small"
        onClick={fetchThreadsOnNextPage}>
          Load More
      </button>
    </section>
  );
};

SubredditPage.propTypes = {
  threads: PropTypes.instanceOf(I.List).isRequired,
  subreddit: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  shouldShowImagePreview: PropTypes.func.isRequired,
  toggleImagePreview: PropTypes.func.isRequired,
  fetchThreadsOnNextPage: PropTypes.func.isRequired,
};

export default SubredditPage;
