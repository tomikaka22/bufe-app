migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0d7ajb0fxqhkclp")

  collection.deleteRule = "status != 'folyamatban' && @request.auth.id = 'u1fy74rt1m48tx1' || @request.auth.id = 'rdzc6b3jes1k8am'"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0d7ajb0fxqhkclp")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
