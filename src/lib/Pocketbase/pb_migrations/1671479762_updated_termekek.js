migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rp9po0k77asigxm")

  collection.listRule = "@request.auth.id = 'u1fy74rt1m48tx1' || @request.auth.id = 'rdzc6b3jes1k8am'"
  collection.viewRule = "@request.auth.id = 'u1fy74rt1m48tx1' || @request.auth.id = 'rdzc6b3jes1k8am'"
  collection.createRule = "@request.auth.id = 'u1fy74rt1m48tx1' || @request.auth.id = 'rdzc6b3jes1k8am'"
  collection.updateRule = "@request.auth.id = 'u1fy74rt1m48tx1' || @request.auth.id = 'rdzc6b3jes1k8am'"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rp9po0k77asigxm")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
