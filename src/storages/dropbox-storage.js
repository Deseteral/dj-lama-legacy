import Dropbox from 'dropbox';
import logger from '../utils/logger';

const TAG = 'DROPBOX STORAGE';

export default function (accessToken) {
  const dropbox = new Dropbox({ accessToken });
  const path = '/database.json';

  return {
    fetch() {
      return new Promise((resolve, reject) => dropbox
        .filesDownload({ path })
        .then(response =>
          resolve(JSON.parse(response.fileBinary))
        )
        .catch(reject)
      );
    },

    save(data) {
      dropbox.filesUpload({
        contents: JSON.stringify(data, null, 2),
        path,
        mode: {
          '.tag': 'overwrite'
        }
      })
      .catch(err => logger(TAG, err, 'error'));
    }
  };
}
