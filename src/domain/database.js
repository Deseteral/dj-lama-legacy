import Datastore from 'nedb-promise';

export default class Database {
  constructor(storage) {
    const options = {
      inMemoryOnly: true,
      autoload: true
    };

    this.collections = {
      library: new Datastore(options),
      tags: new Datastore(options)
    };

    this.storage = storage;
  }

  bootstrap(initialData) {
    const { library, tags } = initialData;

    return Promise.all([
      this.collections.library.insert(library),
      this.collections.tags.insert(tags)
    ]);
  }

  getCollectionData(collectionName) {
    return new Promise((resolve, reject) => {
      const collection = this.collections[collectionName];

      if (!collection) {
        reject(`Collection ${collectionName} does not exist`);
      }

      collection.find({}).then(resolve);
    });
  }

  getJoinedCollectionsData() {
    return Promise
      .resolve({})
      .then(data =>
        this.getCollectionData('library')
          .then(docs => Object.assign(data, { library: docs }))
      )
      .then(data =>
        this.getCollectionData('tags')
          .then(docs => Object.assign(data, { tags: docs }))
      );
  }

  persist() {
    this.getJoinedCollectionsData()
      .then(joinedData => this.storage.saveDatabase(joinedData));
  }
}
