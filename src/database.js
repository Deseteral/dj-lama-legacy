import lowdb from 'lowdb';

export default class Database {
  constructor(databasePath) {
    if (databasePath) {
      this._db = lowdb(databasePath, { writeOnChange: true });
    } else {
      this._db = lowdb();
    }

    this._db.defaults({ library: [] }).value();
  }

  add(song) {
    this._db.get('library')
      .push(song)
      .value();
  }

  findByTitle(title) {
    return this._db.get('library')
      .find({ title })
      .value() || null;
  }

  findById(id) {
    return this._db.get('library')
      .find({ id })
      .value() || null;
  }

  size() {
    return this._db
      .get('library')
      .size()
      .value();
  }
}
