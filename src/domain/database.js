import Datastore from 'nedb-promise';
import songBuilder from './song';

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
    const library = initialData.library.map(song => songBuilder(song).build());
    const tags = initialData.tags;

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
