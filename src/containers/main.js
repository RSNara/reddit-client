import React, { PropTypes } from 'react';
import { getDefaultSubredditTitles } from '../selectors/main';
import { List } from 'immutable';
import { connect } from 'react-redux';

const Main = ({ defaultSubredditTitles }) => {
  return (
    <ul>
      {
        defaultSubredditTitles.map((title, i) => (
          <li key={i}> {title} </li>
        ))
      }
    </ul>
  );
};

Main.propTypes = {
  defaultSubredditTitles: PropTypes.instanceOf(List).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    defaultSubredditTitles: getDefaultSubredditTitles(state),
  }),
)(Main);
