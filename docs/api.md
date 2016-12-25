# API

## Database

Method | URL | Request | Response | Description
-|-|-|-|
`GET` | `/api/database` | empty | `object` | Returns object containing all the data from every collection in the database.
`GET` | `/api/database/:collectionName` | empty | `array` | Returns array of documents in specified collection.
`GET` | `/api/database/library/:ytid` | empty | `object` | Returns song with `ytid`. Status `404` if none found.
`PUT` | `/api/database/library/:ytid` | `object` - song | `object` | Inserts or updates song with `ytid`. Returns newly inserted/updated document.
`DELETE` | `/api/database/library/:ytid` | empty | empty | Removes song with `ytid`. Status `404` if song doesn't exist.
