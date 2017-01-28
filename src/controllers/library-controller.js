import express from 'express';
import { logger } from '../utils/logger';

const TAG = 'LIBRARY CONTROLLER';

export default function (libraryService) {
  const router = new express.Router();

  router.get('/', (req, res) =>
    libraryService
      .findAll()
      .then(data => res.json(data))
      .catch(error => res.status(500).json({ error }))
  );

  router.get('/ytid/:ytid', (req, res) =>
    libraryService
      .findOneWithYoutubeId(req.params.ytid)
      .then(doc => (doc ? res.json(doc) : res.status(404).end()))
      .catch(error => res.status(500).json({ error }))
  );

  router.post('/', (req, res) =>
    libraryService
      .insert(req.body)
      .then((insertedDoc) => {
        logger(TAG, `New song: ${JSON.stringify(insertedDoc)}`);
        return insertedDoc;
      })
      .then(insertedDoc => res
        .status(201)
        .json(insertedDoc)
      )
      .catch(error => res.status(500).json({ error }))
  );

  router.put('/ytid/:ytid', (req, res) =>
    libraryService
      .updateWithYoutubeId(req.params.ytid, req.body)
      .then((insertedDoc) => {
        logger(TAG, `Updated song: ${JSON.stringify(insertedDoc)}`);
        return insertedDoc;
      })
      .then(insertedDoc => res.json(insertedDoc))
      .catch(error => res.status(500).json({ error }))
  );

  router.delete('/ytid/:ytid', (req, res) =>
    libraryService
      .deleteWithYoutubeId(req.params.ytid)
      .then((removed) => {
        if (removed) {
          logger(TAG, `Removed song with ytid: <${req.params.ytid}>`);
        }
        return removed;
      })
      .then(removed => (removed
        ? res.status(204).end()
        : res.status(404).end()
      ))
      .catch(error => res.status(500).json({ error }))
  );

  return router;
}
