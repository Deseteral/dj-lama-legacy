export default function(router, libraryService) {

  router.get('/database/library/ytid/:ytid', (req, res) =>
    libraryService
      .findOneWithYoutubeId(req.params.ytid)
      .then((doc) =>
        doc ? res.send(doc) : res.status(404).end()
      )
      .catch((error) => res.status(500).send({ error }))
  );

  router.post('/database/library', (req, res) =>
    libraryService
      .insert(req.body)
      .then((insertedDoc) => res
        .status(201)
        .type('Content-Type', 'application/json')
        .send(insertedDoc)
      )
      .catch((error) => res.status(500).send({ error }))
  );

  router.put('/database/library/ytid/:ytid', (req, res) =>
    libraryService
      .updateWithYoutubeId(req.params.ytid, req.body)
      .then((insertedDoc) => res.send(insertedDoc))
      .catch((error) => res.status(500).send({ error }))
  );

  router.delete('/database/library/ytid/:ytid', (req, res) =>
    libraryService
      .deleteWithYoutubeId(req.params.ytid)
      .then((removed) => removed ?
        res.status(200).end() :
        res.status(404).end()
      )
      .catch((error) => res.status(500).send({ error }))
  );
}
