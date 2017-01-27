import Dropbox from 'dropbox';
import { logger } from '../utils/logger';

const TAG = 'DROPBOX STORAGE';

export default class DropboxStorage {
  constructor(accessToken) {
    this.dropbox = new Dropbox({ accessToken });
    this.databasePath = '/database.json';
  }

  fetchDatabase() {
    return new Promise((resolve, reject) => this.dropbox
      .filesDownload({ path: this.databasePath })
      .then(response =>
        resolve(JSON.parse(response.fileBinary))
      )
      .catch(reject)
    );
  }

  saveDatabase(data) {
    this.uploadFileWithOverwrite(
      JSON.stringify(data, null, 2), // TODO: Remove pretty print on production data, minify instead
      this.databasePath
    )
    .then(() => logger(TAG, 'Persisted database to Dropbox storage'))
    .catch(err => logger(TAG, err, 'error'));
  }

  uploadFileWithOverwrite(contents, path) {
    return new Promise((resolve, reject) =>
      this.dropbox.filesUpload({
        contents,
        path,
        mode: {
          '.tag': 'overwrite'
        }
      })
      .then(resolve)
      .catch(reject)
    );
  }
}
