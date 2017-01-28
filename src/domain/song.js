export default function (initialSong = {}) {
  const song = {
    info: initialSong.info || { artist: null, title: null },
    ytid: initialSong.ytid || null,
    played: initialSong.played || 0,
    time: initialSong.time || {},
    notWorking: initialSong.notWorking || false
  };

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
      return initialSong._id
        ? Object.assign(song, { _id: initialSong._id })
        : song;
    }
  };
}
