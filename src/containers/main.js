import React, { PropTypes } from 'react';
import { getDefaultSubredditTitles } from '../selectors/main';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const Main = ({ defaultSubredditTitles, children }) => {
  return (
    <div>
      <div className="flex bg-silver fit overflow-scroll">
        {
          defaultSubredditTitles.map((title, i) => (
            <Link className="h6 btn btn-outline p0 mx1" key={i} to={`/r/${title}`}> {title} </Link>
          ))
        }
      </div>
      <div className="p3">
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
