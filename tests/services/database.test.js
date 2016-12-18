require('source-map-support').install();
import 'should';

import Database from '../../src/services/database';

describe('Database', () => {
  let database;

  beforeEach(() => {
    database = new Database();
  });

  describe('library collection', () => {
    it('should start empty', () =>
      database.collections
        .library
        .count({})
        .then((count) =>
          count.should.eql(0)
        )
    );
  });

  describe('tags collection', () => {
    it('should start empty', () =>
      database.collections
        .tags
        .count({})
        .then((count) =>
          count.should.eql(0)
        )
    );
  });

  it('should create joined data object', () =>
    Promise.resolve(
      database.collections.library.insert({
        _id: '12345',
        'title': 'some title',
        'artist': 'the artist'
      })
    )
    .then(() =>
      database.collections.tags.insert({
        _id: 'asdfgh',
        name: 'some tag name',
        songs: ['song-1', 'song-2']
      })
    )
    .then(() => database.getJoinedObject())
    .then((data) =>
      data.should.eql({
        library: [{
          _id: '12345',
          'title': 'some title',
          'artist': 'the artist'
        }],
        tags: [{
          _id: 'asdfgh',
          name: 'some tag name',
          songs: ['song-1', 'song-2']
        }]
      })
    )
  );
});
