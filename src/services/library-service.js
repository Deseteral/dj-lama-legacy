import songBuilder from '../domain/song';

export default class LibraryService {
  constructor(database) {
    this.database = database;
  }

  insert(data) {
    const song = songBuilder(data).build();

    return this.database.collections
      .library
      .insert(song)
      .then((insertedDoc) => {
        this.database.persist();
        return insertedDoc;
      });
  }

  findAll() {
    return this.database.collections
      .library
      .find({});
  }

  findOneWithYoutubeId(ytid) {
    return this.database.collections
      .library
      .findOne({ ytid });
  }

  updateWithYoutubeId(ytid, data) {
    const song = songBuilder(data).build();

    return this.database.collections
      .library.update(
        { ytid },
        song,
        { upsert: true, returnUpdatedDocs: true }
      )
      .then(details => details[1])
      .then((insertedDoc) => {
        this.database.persist();
        return insertedDoc;
      });
  }

  deleteWithYoutubeId(ytid) {
    return this.database.collections
      .library
      .remove({ ytid })
      .then(numRemoved => numRemoved !== 0)
      .then((didRemove) => {
        this.database.persist();
        return didRemove;
      });
  }
}
