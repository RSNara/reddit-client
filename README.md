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

## Demo
This app is viewable on heroku at [https://rc-rsnara@herokuapp.com](https://rc-rsnara@herokuapp.com). Since it is using a free dynamo, it could take a while to load initially.
