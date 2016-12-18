import 'should';

import Database from '../../src/services/database';

describe('Database', () => {
  let database;

  beforeEach(() => {
    database = new Database();
  });

  describe('library collection', () => {
    it('should start empty', (done) => {
      database.collections.library
        .count({}, (err, count) => {
          count.should.eql(0);
          done();
        });
    });
  });

  describe('tags collection', () => {
    it('should start empty', (done) => {
      database.collections.tags
        .count({}, (err, count) => {
          count.should.eql(0);
          done();
        });
    });
  });
});
