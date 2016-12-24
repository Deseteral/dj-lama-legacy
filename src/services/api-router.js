import express from 'express';

export default function(database) {
  const router = new express.Router();

  router.use((req, res, next) => {
    res.type('application/json');
    next();
  });

  router.get('/database', (req, res) =>
    database
      .getJoinedCollectionsData()
      .then((data) => res.send(data))
  );

  router.get('/database/:collectionName', (req, res) =>
    database
      .getCollectionData(req.params.collectionName)
      .then((data) => res.send(data))
      .catch((error) => res.send({ error }))
  );

  return router;
}
