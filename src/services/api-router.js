import express from 'express';
import bodyParser from 'body-parser';

import libraryService from './library-service';

export default function(appState) {
  const { database, repositories } = appState;
  const router = new express.Router();

  router.use((req, res, next) => {
    res.type('application/json');
    next();
  });

  router.use(bodyParser.json());

  router.get('/database', (req, res) =>
    database
      .getJoinedCollectionsData()
      .then((data) => res.send(data))
      .catch((error) => res.status(500).send({ error }))
  );

  router.get('/database/:collectionName', (req, res) =>
    database
      .getCollectionData(req.params.collectionName)
      .then((data) => res.send(data))
      .catch((error) => res.status(500).send({ error }))
  );

  libraryService(router, repositories.library);

  return router;
}
