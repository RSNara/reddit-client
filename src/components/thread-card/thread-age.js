import React, { PropTypes } from 'react';
import { differenceInHoursFromNow } from '../../utils';

const ThreadAge = ({ createdAt }) => {
  return (
    <span className="gray">
      {differenceInHoursFromNow(createdAt)}
      &nbsp;hours ago
    </span>
  );
};

ThreadAge.propTypes = {
  createdAt: PropTypes.number.isRequired,
};

export default ThreadAge;
