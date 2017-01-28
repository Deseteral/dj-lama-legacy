import 'should';
import songBuilder from '../src/domain/song';

require('source-map-support').install();

describe('Song builder', () => {
  it('should build basic song', () => {
    songBuilder()
      .withTitle('test title')
      .withArtist('test artist')
      .withYtid('test-ytid')
      .build()
      .should.eql({
        info: {
          title: 'test title',
          artist: 'test artist'
        },
        ytid: 'test-ytid',
        played: 0,
        time: { },
        notWorking: false
      });
  });

  it('should build full song', () => {
    songBuilder()
      .withTitle('test title')
      .withArtist('test artist')
      .withYtid('test-ytid')
      .withPlayed(13)
      .withStartTime('0:15')
      .withEndTime('1:46')
      .withNotWorking(true)
      .build()
      .should.eql({
        info: {
          title: 'test title',
          artist: 'test artist'
        },
        ytid: 'test-ytid',
        played: 13,
        time: {
          start: '0:15',
          end: '1:46'
        },
        notWorking: true
      });
  });

  it('should build on already existing song', () => {
    const existingSong = {
      _id: 'abcdefg-123',
      info: {
        title: 'some title',
        artist: 'some artist'
      },
      ytid: '_someytid',
      played: 4,
      time: { },
      notWorking: false
    };

    songBuilder(existingSong)
      .withEndTime('2:31')
      .withNotWorking(true)
      .build()
      .should.eql({
        _id: 'abcdefg-123',
        info: {
          title: 'some title',
          artist: 'some artist'
        },
        ytid: '_someytid',
        played: 4,
        time: {
          end: '2:31'
        },
        notWorking: true
      });
  });
});
