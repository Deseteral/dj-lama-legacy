# DJ Lama
Bot that transforms Discord voice channel into user-driven radio station.

<img src="https://raw.githubusercontent.com/Deseteral/dj-lama-legacy/master/res/logo.svg" width="30%" height="30%">

*Special thanks to my friend Natalia for making this amazing logo!*

**Disclaimer:** This code was written in the *"move fast and break things"*
fashion, and thus it works well, but the code itself is not the best quality,
and will be rewritten (possibly using official Discord API). Also it's not
really suitable for general use, so if you're looking for music bot for Discord
this is probably not the best choice :wink:.

## Features
* **Queuing music** from YouTube.
* User controlled **radio announcer**, with auto music fade out and fade in.
* **Song database**, where users can save their most beloved hits.
* **Web frontend** with queue and list of songs in database.

## Building
First you have to install node modules and download bower components:
```
npm install
cd src/static && bower install
```

and then you can build and run the bot:
```
gulp                # build
node dist/index.js  # run
```
or using one command:
```
npm start
```

## License
This project is licensed under [MIT license](LICENSE).
