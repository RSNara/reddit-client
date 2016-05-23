[![Stories in Ready](https://badge.waffle.io/rsnara/reddit-client.png?label=ready&title=Ready)](https://waffle.io/rsnara/reddit-client)
# Reddit Client [![Build Status](https://travis-ci.org/rsnara/reddit-client.svg?branch=master)](https://travis-ci.org/rsnara/reddit-client) [![Coverage Status](https://coveralls.io/repos/github/rsnara/reddit-client/badge.svg?branch=master)](https://coveralls.io/github/rsnara/reddit-client?branch=master)
 [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A simple read-only reddit client built with [React](https://github.com/facebook/react) and [Redux](https://github.com/reactjs/redux).

## Development
> ```bash
> npm run # to see all available scripts
> ```

```bash
npm run dev
```

## Architecture
The back-end simply proxies to Reddit's public API. The front-end is written using a superset of Rangle's react-redux toolchain.

## Motivation
This is just a short project to explore [redux-saga](https://github.com/yelouafi/redux-saga) and [reselect](https://github.com/reactjs/reselect). Reddit was an ideal platform to copy because the API endpoints were public and were sufficiently well designed.

## Demo
This app is viewable on heroku at [https://rc-rsnara.herokuapp.com](https://rc-rsnara.herokuapp.com). Since it is using a free dynamo, it could take a while to load initially.
