migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rp9po0k77asigxm")

  collection.deleteRule = "@request.auth.id = 'u1fy74rt1m48tx1' || @request.auth.id = 'rdzc6b3jes1k8am'"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rp9po0k77asigxm")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
