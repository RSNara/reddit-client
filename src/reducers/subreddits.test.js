import subreddits from './subreddits';
import fireAction from '../utils/fire-action';
import { SUBREDDITS } from '../constants';
import { Map } from 'immutable';
import test from 'ava';

test.beforeEach(t => {
  t.context.state = subreddits(undefined, {});
});

test('initial state should be a map', t => {
  t.true(Map.isMap(t.context.state));
});

test('SAVE_DEFAULTS should set the default subreddits', t => {
  const testSubreddits = ['foo'];
  t.context.state = fireAction(subreddits, t.context.state, SUBREDDITS.SAVE_DEFAULT, {
    subreddits: testSubreddits,
  });
  t.deepEqual(t.context.state.get('default').toJS(), testSubreddits);
});

test('SAVE_THREADS should set the thread(s) correctly without filters', t => {
  t.context.state = fireAction(subreddits, t.context.state, SUBREDDITS.SAVE_THREADS, {
    threads: [{
      data: {
        id: 'abc',
      },
    }, {
      data: {
        id: 'def',
      },
    }],
    subreddit: 'foo',
  });
  const foo = t.context.state.getIn(['threads', 'foo']);

  t.true(
    foo.has('abc'),
    'does not have the given thread'
  );
  t.is(
    foo.getIn(['abc', 'filters']).size,
    0,
    'does not have the the correct number of filters'
  );
  t.true(
    foo.has('def'),
    'does not have both the given threads'
  );
  t.is(
    foo.getIn(['def', 'filters']).size,
    0,
    'both threads should have an empty array of filters'
  );
});

test('SAVE_THREADS should set the thread(s) correctly with filters', t => {
  t.context.state = fireAction(subreddits, t.context.state, SUBREDDITS.SAVE_THREADS, {
    threads: [{
      data: {
        id: 'baz',
      },
    }],
    filter: 'foo',
    subreddit: 'bar',
  });

  const bar = t.context.state.getIn(['threads', 'bar']);
  t.true(
    bar.has('baz'),
    'does not have the given thread'
  );
  t.deepEqual(
    bar.getIn(['baz', 'filters']).toArray(),
    ['foo'],
    'should have the correct filter'
  );
});

test('SAVE_THREAD_COMMENTS should set the comments correctly', t => {
  t.context.state = fireAction(subreddits, t.context.state, SUBREDDITS.SAVE_THREAD_COMMENTS, {
    comments: [{
      data: {
        id: 'baz',
      },
    }],
    thread: 'foo',
    subreddit: 'bar',
  });

  t.true(t.context.state.getIn(['comments', 'bar', 'foo', 'baz']).has('data'));
});

test('SAVE_THREAD_COMMENTS_TO_CACHE should set the comment cache correctly', t => {
  t.context.state = fireAction(subreddits, t.context.state, SUBREDDITS.SAVE_THREAD_COMMENTS_TO_CACHE, {
    comments: [{
      data: {
        id: 'baz',
      },
    }],
    thread: 'foo',
    subreddit: 'bar',
  });

  t.true(t.context.state.getIn(['subredditCommentCache', 'bar', 'foo', 'baz']).has('data'));
});

test('TOGGLE_THREAD_COMMENT_EXPAND_CHILDREN should properly toggle', t => {
  t.context.state = fireAction(subreddits, t.context.state, SUBREDDITS.TOGGLE_THREAD_COMMENT_EXPAND_CHILDREN, {
    comment: 'hello',
    thread: 'foo',
    subreddit: 'bar',
  });
  t.false(
    t.context.state.getIn(['expandChildren', 'bar', 'foo', 'hello']),
    'did not toggle off as expected since it was true by default'
  );

  t.context.state = fireAction(subreddits, t.context.state, SUBREDDITS.TOGGLE_THREAD_COMMENT_EXPAND_CHILDREN, {
    comment: 'hello',
    thread: 'foo',
    subreddit: 'bar',
  });
  t.true(
    t.context.state.getIn(['expandChildren', 'bar', 'foo', 'hello']),
    'did not toggle back back on'
  );
});

test('DELETE_THREAD_COMMENT should remove the given comment', t => {
  t.context.state = fireAction(subreddits, t.context.state, SUBREDDITS.SAVE_THREAD_COMMENTS, {
    comments: [{
      data: {
        id: 'baz',
      },
    }],
    thread: 'bar',
    subreddit: 'foo',
  });
  t.true(
    t.context.state.getIn(['comments', 'foo', 'bar', 'baz']).has('data'),
    'does not have the given comment to begin with'
  );

  t.context.state = fireAction(subreddits, t.context.state, SUBREDDITS.DELETE_THREAD_COMMENT, {
    subreddit: 'foo',
    thread: 'bar',
    comment: 'baz',
  });
  t.false(
    t.context.state.getIn(['comments', 'foo', 'bar']).has('baz'),
    'did not delete the specified comment'
  );
});

test('TOGGLE_THREAD_CARD_EXPAND_THUMBNAIL should properly toggle', t => {
  t.context.state = fireAction(subreddits, t.context.state, SUBREDDITS.TOGGLE_THREAD_CARD_EXPAND_THUMBNAIL, {
    comment: 'hello',
    thread: 'foo',
    subreddit: 'bar',
  });
  t.true(
    t.context.state.getIn(['expandThumbnail', 'bar', 'foo']),
    'was not toggled on as it was false by default'
  );

  t.context.state = fireAction(subreddits, t.context.state, SUBREDDITS.TOGGLE_THREAD_CARD_EXPAND_THUMBNAIL, {
    comment: 'hello',
    thread: 'foo',
    subreddit: 'bar',
  });
  t.false(
    t.context.state.getIn(['expandThumbnail', 'bar', 'foo']),
    'was not toggled back off'
  );
});

test('LAST_FETCHED_THREAD_NAME should set the last fetched thread name correctly', t => {
  t.context.state = fireAction(subreddits, t.context.state, SUBREDDITS.LAST_FETCHED_THREAD_NAME, {
    subreddit: 'abc',
    threadName: 'def',
    filter: 'boo',
  });

  t.is(t.context.state.getIn(['lastFetchedThreadName', 'abc', 'boo']), 'def');
});
