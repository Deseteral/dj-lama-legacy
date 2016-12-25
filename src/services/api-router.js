import express from 'express';
import bodyParser from 'body-parser';

export default function(database) {
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

  router.get('/database/library/:ytid', (req, res) =>
    database.collections
      .library
      .find({ ytid: req.params.ytid })
      .then((doc) =>
        doc ? res.send(doc) : res.status(404).end()
      )
      .catch((error) => res.status(500).send({ error }))
  );

  router.put('/database/library/:ytid', (req, res) =>
    database.collections
      .library.update(
        { ytid: req.params.ytid },
        req.body,
        { upsert: true, returnUpdatedDocs: true }
      )
      .then((details) => details[1])
      .then((insertedDoc) => res.send(insertedDoc))
      .catch((error) => res.status(500).send({ error }))
  );

  router.delete('/database/library/:ytid', (req, res) =>
    database.collections
      .library
      .remove({ ytid: req.params.ytid })
      .then((numRemoved) => numRemoved !== 0 ?
        res.status(200).end() :
        res.status(404).end()
      )
      .catch((error) => res.status(500).send({ error }))
  );

  return router;
}
