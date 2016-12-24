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

  it('should be able to bootstrap itself', () => {
    const initialData = {
      library: [{
        _id: '1111',
        title: 'some title',
        artist: 'some artist'
      }, {
        _id: '2222',
        title: 'second title',
        artist: 'second artist'
      }],
      tags: [{
        _id: 'aaaa',
        name: 'some tag name',
        songs: ['song-1', 'song-2']
      }, {
        _id: 'bbbb',
        name: 'a tag name 2',
        songs: ['1111', '2222']
      }]
    };

    return Promise.resolve(
      database.bootstrap(initialData)
    )
    .then(() =>
      database.collections.library
        .count({})
        .then((count) => count.should.eql(2))
    )
    .then(() =>
      database.collections.tags
        .count({})
        .then((count) => count.should.eql(2))
    )
    .then(() =>
      database.collections.library
        .findOne({ _id: '2222' })
        .then((doc) => doc.should.eql({
          _id: '2222',
          title: 'second title',
          artist: 'second artist'
        }))
    )
    .then(() =>
      database.collections.tags
        .findOne({ _id: 'aaaa' })
        .then((doc) => doc.should.eql({
          _id: 'aaaa',
          name: 'some tag name',
          songs: ['song-1', 'song-2']
        }))
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
    .then(() => database.getJoinedCollectionsData())
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
