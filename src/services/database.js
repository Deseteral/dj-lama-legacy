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

  getJoinedObject() {
    return new Promise((resolve, reject) => {
      Promise
        .resolve({})
        .then((data) =>
          this.collections.library
            .find({})
            .then((docs) => Object.assign(data, { library: docs }))
        )
        .then((data) =>
          this.collections.tags
            .find({})
            .then((docs) => Object.assign(data, { tags: docs }))
        )
        .then(resolve)
        .catch(reject);
    });
  }
}
