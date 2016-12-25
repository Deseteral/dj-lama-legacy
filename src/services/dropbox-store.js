import Dropbox from 'dropbox';

export default function(accessToken) {
  const dropbox = new Dropbox({ accessToken });

  return {
    fetchDatabase() {
      return new Promise((resolve, reject) => dropbox
        .filesDownload({ path: '/database.json' })
        .then((response) =>
          resolve(JSON.parse(response.fileBinary))
        )
        .catch(reject)
      );
    }
  };
}
