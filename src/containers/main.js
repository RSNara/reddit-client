import React, { PropTypes } from 'react';
import { getDefaultSubredditTitles } from '../selectors/main';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const Main = ({ defaultSubredditTitles, children }) => {
  return (
    <div>
      <ul>
        {
          defaultSubredditTitles.map((title, i) => (
            <Link key={i} to={`/r/${title}`}> {title} </Link>
          ))
        }
      </ul>
      <div>
        { children }
      </div>
    </div>
  );
};

Main.propTypes = {
  defaultSubredditTitles: PropTypes.instanceOf(List).isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default connect(
  (state) => ({
    defaultSubredditTitles: getDefaultSubredditTitles(state),
  }),
)(Main);
