import React, { PropTypes } from 'react';
import ThreadCard from './thread-card';
import * as I from 'immutable';

const ThreadCardList = ({ shouldShowImagePreview, toggleImagePreview, threads }) => {
  return (
    <section>
      {
        threads
          .map((thread, i) => {
            const data = thread.get('data', I.Map());
            return (
              <ThreadCard
                shouldExpandThumbnail={shouldShowImagePreview(data.get('id'))}
                toggleExpandThumbnail={toggleImagePreview(data.get('id'))}
                thread={thread}
                key={i}/>
            );
          })
      }
    </section>
  );
};

ThreadCardList.propTypes = {
  shouldShowImagePreview: PropTypes.func.isRequired,
  toggleImagePreview: PropTypes.func.isRequired,
  threads: PropTypes.instanceOf(I.List).isRequired,
};

export default ThreadCardList;
