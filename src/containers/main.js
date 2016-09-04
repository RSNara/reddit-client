import React, { PropTypes } from 'react';
import { getDefaultSubredditTitles } from '../selectors/main';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Loader from 'react-loader';

const Main = ({ defaultSubredditTitles, children, fetching }) => {
  return (
    <div>
      <div className="flex bg-silver fit overflow-scroll">
        <Link className="h6 btn btn-outline py0 px1 mx1 bg-gray" to="/">Front</Link>
        {
          defaultSubredditTitles.map((title, i) => (
            <Link className="h6 btn btn-outline p0 mx1" key={i} to={`/r/${title}`}> {title} </Link>
          ))
        }
      </div>
      <div className="p3">
        <Loader loaded={!fetching}>
          {children}
        </Loader>
      </div>
    </div>
  );
};

Main.propTypes = {
  defaultSubredditTitles: PropTypes.instanceOf(List).isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node,
  fetching: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    fetching: state.fetching,
    defaultSubredditTitles: getDefaultSubredditTitles(state),
  }),
)(Main);
