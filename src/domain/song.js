export default function(initialSong = {}) {
  let song = {
    info: initialSong.info || { artist: '', title: '' },
    ytid: initialSong.ytid || '',
    played: initialSong.played || 0,
    time: initialSong.time || {},
    notWorking: initialSong.notWorking || false
  };

  if (initialSong._id) {
    song = Object.assign(song, { _id: initialSong._id });
  }

  return {
    withArtist(artist) {
      song.info.artist = artist;
      return this;
    },

    withTitle(title) {
      song.info.title = title;
      return this;
    },

    withYtid(ytid) {
      song.ytid = ytid;
      return this;
    },

    withPlayed(played) {
      song.played = played;
      return this;
    },

    withStartTime(start) {
      song.time.start = start;
      return this;
    },

    withEndTime(end) {
      song.time.end = end;
      return this;
    },

    withNotWorking(notWorking) {
      song.notWorking = notWorking;
      return this;
    },

    build() {
      return song;
    }
  };
}
