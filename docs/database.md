# DJ Lama database
DJ Lama's database is stored as JSON documents.

## Collections
Documents are stored in collections:
* Library (collection of songs)
* Tags (collection of tags)

## Song data model
```json
{
  "id": "some-song-id",
  "info": {
    "artist": "chvrches",
    "title": "mother we share"
  },
  "ytid": "_mTRvJ9fugM",
  "played": 16,
  "time": {
    "start": "0:14",
    "end": "3:23"
  }
}
```

If there's no `start` or `end` time, those values will be `undefined`. If they're both undefined
`time` will be an empty object.

## Tag data model
```json
{
  "id": "some-tag-id",
  "name": "french pop",
  "songs": ["id1", "id32", "id4", "id526"]
}
```
