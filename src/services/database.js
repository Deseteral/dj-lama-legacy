import Datastore from 'nedb-promise';

export default class Database {
  constructor() {
    const options = {
      inMemoryOnly: true,
      autoload: true
    };

    this.collections = {
      library: new Datastore(options),
      tags: new Datastore(options)
    };
  }
}
