export default class LibraryRepository {
  constructor(database, storage) {
    this.database = database;
    this.storage = storage;
  }

  findOneWithYoutubeId(ytid) {
    return this.database.collections
      .library
      .find({ ytid });
  }

  updateWithYoutubeId(ytid, data) {
    return this.database.collections
      .library.update(
        { ytid },
        data,
        { upsert: true, returnUpdatedDocs: true }
      )
      .then((details) => details[1])
      .then((insertedDoc) => {
        this.database
          .getJoinedCollectionsData()
          .then((joinedData) => this.storage.save(joinedData));

        return insertedDoc;
      });
  }

  deleteWithYoutubeId(ytid) {
    return this.database.collections
      .library
      .remove({ ytid })
      .then((numRemoved) => numRemoved !== 0)
      .then((didRemove) => {
        this.database
          .getJoinedCollectionsData()
          .then((joinedData) => this.storage.save(joinedData));

        return didRemove;
      });
  }
}
