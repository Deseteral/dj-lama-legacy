import 'should';
import request from 'supertest';
import start from '../src/server';

require('source-map-support').install();

describe('Library service', () => {
  let appState;

  beforeEach(() =>
    start({ quiet: true }).then((state) => {
      appState = state;
    })
  );

  afterEach(() => appState.serverInstance.close());

  it('should read all songs', () => {
    const firstSong = {
      info: {
        artist: 'first-song-artist',
        title: 'first-song-title'
      },
      ytid: '_first-songsytid',
      played: 1
    };

    const secondSong = {
      info: {
        artist: 'second-song-artist',
        title: 'second-song-title'
      },
      ytid: '_second-songsytid',
      played: 2,
      time: {
        start: '0:14'
      }
    };

    const thirdSong = {
      info: {
        artist: 'third-song-artist',
        title: 'third-song-title'
      },
      ytid: '_songsytid',
      played: 3,
      time: {
        end: '3:23'
      }
    };

    const postRequests = [firstSong, secondSong, thirdSong]
      .map(song =>
        new Promise((resolve, reject) =>
          request(appState.server)
            .post('/api/database/library')
            .set('Content-Type', 'application/json; charset=utf-8')
            .send(song)
            .end((err, res) => (err ? reject(err) : resolve(res)))
        )
      );

    return Promise.all(postRequests)
      .then(() => {
        request(appState.server)
          .get('/api/database/library')
          .set('Accept', 'application/json; charset=utf-8')
          .end((err, res) => {
            res.status.should.eql(200);
            res.type.should.eql('application/json');

            const songs = res.body;

            songs.length.should.eql(3);
            songs.map(s => s.info.title)
              .should.containDeep([
                'first-song-title',
                'second-song-title',
                'third-song-title'
              ]);
          });
      });
  });

  it('should read song', (done) => {
    const song = {
      info: {
        artist: 'song-artist',
        title: 'song-title'
      },
      ytid: '_songsytid',
      played: 16,
      time: {
        start: '0:14',
        end: '3:23'
      }
    };

    request(appState.server)
      .post('/api/database/library')
      .set('Content-Type', 'application/json; charset=utf-8')
      .send(song)
      .end((postErr, postRes) => {
        const postSong = postRes.body;

        postSong._id.length.should.be.above(1);
        postSong.info.should.eql({
          artist: 'song-artist',
          title: 'song-title'
        });
        postSong.ytid.should.eql('_songsytid');
        postSong.played.should.eql(16);
        postSong.time.should.eql({
          start: '0:14',
          end: '3:23'
        });

        request(appState.server)
          .get('/api/database/library/ytid/_songsytid')
          .set('Accept', 'application/json; charset=utf-8')
          .end((getErr, getRes) => {
            getRes.status.should.eql(200);
            getRes.type.should.eql('application/json');

            const getSong = getRes.body;

            getSong._id.length.should.be.above(1);
            getSong.info.should.eql({
              artist: 'song-artist',
              title: 'song-title'
            });
            getSong.ytid.should.eql('_songsytid');
            getSong.played.should.eql(16);
            getSong.time.should.eql({
              start: '0:14',
              end: '3:23'
            });

            done();
          });
      });
  });

  it('should not find not existing song', (done) => {
    const song = {
      info: {
        artist: 'song-artist',
        title: 'song-title'
      },
      ytid: '_songsytid',
      played: 16,
      time: {
        start: '0:14',
        end: '3:23'
      }
    };

    request(appState.server)
      .post('/api/database/library')
      .set('Content-Type', 'application/json; charset=utf-8')
      .send(song)
      .end(() =>
        request(appState.server)
          .get('/api/database/library/ytid/not-existing-id')
          .end((err, res) => {
            res.status.should.eql(404);
            done();
          })
      );
  });

  it('should create new song', (done) => {
    const song = {
      info: {
        artist: 'song-artist',
        title: 'song-title'
      },
      ytid: '_songsytid',
      played: 16,
      time: {
        start: '0:14',
        end: '3:23'
      }
    };

    request(appState.server)
      .post('/api/database/library')
      .set('Content-Type', 'application/json; charset=utf-8')
      .send(song)
      .end((err, res) => {
        res.status.should.eql(201);
        res.type.should.eql('application/json');

        const newSong = res.body;

        newSong._id.length.should.be.above(1);
        newSong.info.should.eql({
          artist: 'song-artist',
          title: 'song-title'
        });
        newSong.ytid.should.eql('_songsytid');
        newSong.played.should.eql(16);
        newSong.time.should.eql({
          start: '0:14',
          end: '3:23'
        });

        done();
      });
  });

  it('should update song', (done) => {
    const song = {
      info: {
        artist: 'song-artist',
        title: 'song-title'
      },
      ytid: '_songsytid',
      played: 16
    };

    const updatedSong = {
      info: {
        artist: 'updated-song-artist',
        title: 'updated-song-title'
      },
      ytid: '_updated-songsytid',
      played: 32,
      time: {
        start: '0:14',
        end: '3:23'
      }
    };

    request(appState.server)
      .post('/api/database/library')
      .set('Content-Type', 'application/json; charset=utf-8')
      .send(song)
      .end(() =>
        request(appState.server)
          .put('/api/database/library/ytid/_songsytid')
          .set('Content-Type', 'application/json; charset=utf-8')
          .send(updatedSong)
          .end((err, res) => {
            res.status.should.eql(200);
            res.type.should.eql('application/json');

            const newSong = res.body;

            newSong.info.should.eql({
              title: 'updated-song-title',
              artist: 'updated-song-artist'
            });
            newSong.ytid.should.eql('_updated-songsytid');
            newSong.played.should.eql(32);
            newSong.time.should.eql({
              start: '0:14',
              end: '3:23'
            });

            done();
          })
      );
  });

  it('should delete song', (done) => {
    const song = {
      info: {
        artist: 'song-artist',
        title: 'song-title'
      },
      ytid: '_songsytid',
      played: 16,
      time: {
        start: '0:14',
        end: '3:23'
      }
    };

    request(appState.server)
      .post('/api/database/library')
      .set('Content-Type', 'application/json; charset=utf-8')
      .send(song)
      .end(() =>
        request(appState.server)
          .delete('/api/database/library/ytid/_songsytid')
          .end((deleteErr, deleteRes) => {
            deleteRes.status.should.eql(204);
            deleteRes.body.should.eql('');

            request(appState.server)
              .get('/api/database/library')
              .set('Accept', 'application/json; charset=utf-8')
              .end((getErr, getRes) => {
                getRes.body.should.eql([]);
                done();
              });
          })
      );
  });
});
