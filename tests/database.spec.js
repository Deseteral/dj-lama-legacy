require('source-map-support').install();
import chai from 'chai';
import spies from 'chai-spies';
chai.use(spies);
const should = chai.should();

import Database from '../src/database';

describe('Database', () => {
  let database;

  beforeEach(() => {
    database = new Database();
  });

  it('should be empty on start', () => {
    database.size().should.equal(0);
  });

  it('should add song', () => {
    const song = {
      'id': 'xFrGuyw1V8s',
      'artist': 'abba',
      'title': 'dancing queen',
      'played': 6
    };

    database.add(song);

    database.size().should.be.equal(1);
    database._db.get('library[0]').value().title
      .should.equal('dancing queen');
  });

  describe('search', () => {

    it('should find song by title', () => {
      getSongs().forEach((song) => database.add(song));

      const song = database.findByTitle('money for nothing');

      song.should.be.eql({
        'id': 'wTP2RUD_cL0',
        'artist': 'dire straits',
        'title': 'money for nothing',
        'start': '0:35',
        'played': 1
      });
    });

    it('should return null if it cannot find song with given title', () => {
      getSongs().forEach((song) => database.add(song));

      const song = database.findByTitle('not existing song title');

      should.equal(song, null);
    });

    it('should find song by id', () => {
      getSongs().forEach((song) => database.add(song));

      const song = database.findById('MV_3Dpw-BRY');

      song.should.be.eql({
        'id': 'MV_3Dpw-BRY',
        'artist': 'kavinsky',
        'title': 'nightcall',
        'played': 3
      });
    });

    it('should return null if it cannot find song with given id', () => {
      getSongs().forEach((song) => database.add(song));

      const song = database.findByTitle('not existing song id');

      should.equal(song, null);
    });

  });

  function getSongs() {
    return [{
      'id': 'xFrGuyw1V8s',
      'artist': 'abba',
      'title': 'dancing queen',
      'played': 6
    }, {
      'id': '5A-4VGfx5lU',
      'artist': 'animals',
      'title': 'house of the rising sun',
      'played': 2
    }, {
      'id': 'I_izvAbhExY',
      'artist': 'bee gees',
      'title': 'stayin alive',
      'played': 9
    }, {
      'id': 'wTP2RUD_cL0',
      'artist': 'dire straits',
      'title': 'money for nothing',
      'start': '0:35',
      'played': 1
    }, {
      'id': 'MV_3Dpw-BRY',
      'artist': 'kavinsky',
      'title': 'nightcall',
      'played': 3
    }, {
      'id': 'JRWox-i6aAk',
      'artist': 'lana del rey',
      'title': 'blue jeans',
      'played': 10
    }, {
      'id': '7I0vkKy504U',
      'artist': 'scott mckenzie',
      'title': 'san francisco',
      'played': 33
    }, {
      'id': 'IfRY3SsozuM',
      'artist': 'metallica',
      'title': 'fade to black',
      'played': 1
    }, {
      'id': 'caTGU4jS5LM',
      'artist': 'whitney houston',
      'title': 'i wanna dance with somebody',
      'played': 2
    }];
  }
});
