export default function(router, libraryService) {

  router.get('/database/library', (req, res) =>
    libraryService
      .findAll()
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ error }))
  );

  router.get('/database/library/ytid/:ytid', (req, res) =>
    libraryService
      .findOneWithYoutubeId(req.params.ytid)
      .then((doc) =>
        doc ? res.json(doc) : res.status(404).end()
      )
      .catch((error) => res.status(500).json({ error }))
  );

  router.post('/database/library', (req, res) =>
    libraryService
      .insert(req.body)
      .then((insertedDoc) => res
        .status(201)
        .json(insertedDoc)
      )
      .catch((error) => res.status(500).json({ error }))
  );

  router.put('/database/library/ytid/:ytid', (req, res) =>
    libraryService
      .updateWithYoutubeId(req.params.ytid, req.body)
      .then((insertedDoc) => res.json(insertedDoc))
      .catch((error) => res.status(500).json({ error }))
  );

  router.delete('/database/library/ytid/:ytid', (req, res) =>
    libraryService
      .deleteWithYoutubeId(req.params.ytid)
      .then((removed) => removed ?
        res.status(200).end() :
        res.status(404).end()
      )
      .catch((error) => res.status(500).json({ error }))
  );
}
