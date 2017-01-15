export default function(router, repository) {

  router.get('/database/library/:ytid', (req, res) =>
    repository
      .findOneWithYoutubeId(req.params.ytid)
      .then((doc) =>
        doc ? res.send(doc) : res.status(404).end()
      )
      .catch((error) => res.status(500).send({ error }))
  );

  router.put('/database/library/:ytid', (req, res) =>
    repository
      .updateWithYoutubeId(req.params.ytid, req.body)
      .then((insertedDoc) => res.send(insertedDoc))
      .catch((error) => res.status(500).send({ error }))
  );

  router.delete('/database/library/:ytid', (req, res) =>
    repository
      .deleteWithYoutubeId(req.params.ytid)
      .then((removed) => removed ?
        res.status(200).end() :
        res.status(404).end()
      )
      .catch((error) => res.status(500).send({ error }))
  );
}
