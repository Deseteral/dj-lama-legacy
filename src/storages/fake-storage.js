import { logger } from '../utils/logger';

const TAG = 'FAKE STORAGE';

/*
 * Storage to use when the database is not persistent or the app is in development
 */
export default function () {
  return {
    fetchDatabase() {
      logger(TAG, 'Fetching database from fake storage');
      return Promise.resolve({
        library: [],
        tags: []
      });
    },

    saveDatabase() {
      logger(TAG, 'Saving to database fake storage');
    }
  };
}
