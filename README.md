# Reddit Client

A simple read-only reddit client built with [React](https://github.com/facebook/react) and [Redux](https://github.com/reactjs/redux).

## Development
```bash
> npm run dev
```

## Architecture
The back-end simply proxies to Reddit's public API. The front-end is written using a superset of Rangle's react-redux toolchain.

## Motivation
This was just a one-off project to explore [redux-saga](https://github.com/yelouafi/redux-saga) and [reselct](https://github.com/reactjs/reselect). Reddit was an ideal platform to copy because the API endpoints were public and were sufficiently well designed.

## Deployment
This app is viewable on heroku at [rc-rsnara@herokuapp.com](http://rc-rsnara@herokuapp.com)
