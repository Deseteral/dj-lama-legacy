# DJ Lama
A user-driven, YouTube powered radio station.

[![Build Status](https://travis-ci.org/Deseteral/dj-lama.svg?branch=master)](https://travis-ci.org/Deseteral/dj-lama)

<img src="https://cdn.rawgit.com/Deseteral/dj-lama/master/src/public/resources/logo.svg" width="30%" height="30%">

*Special thanks to my friend Natalia for making this amazing logo!*

## Features
* **Queuing music** from YouTube.
* User controlled **radio announcer**, with auto music fade out and fade in.
* **Song database**, where users can save their most beloved hits.
* **Web frontend** with queue and list of songs in database.

## Requirements
* `node v7.2.0+`

## Building
First you have to install node modules and build the application:
```
npm install
npm run build
```

To build the app for production set `NODE_ENV` to `production` before running `build` script.

Run the app with:
```
npm start
```

The port on which DJ Lama's server stars can be set using `PORT` environment variable.

## Testing
Just run `npm t`.

## License
This project is licensed under [MIT license](LICENSE).
