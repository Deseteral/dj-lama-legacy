import Datastore from 'nedb';

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

  // count(what, collection) {
  //   return new Promise((resolve, reject) => {
  //     collection.count(what, (err, count) => {
  //       if (err) {
  //         reject(err);
  //       }
  //
  //       resolve(count);
  //     });
  //   });
  // }
}
