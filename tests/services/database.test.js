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
});
