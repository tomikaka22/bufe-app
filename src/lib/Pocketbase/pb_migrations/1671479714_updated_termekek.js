migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rp9po0k77asigxm")

  collection.createRule = "@request.auth.id = 'u1fy74rt1m48tx1' || @request.auth.id = 'asd'"
  collection.updateRule = "@request.auth.id = 'u1fy74rt1m48tx1' || @request.auth.id = 'asd'"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rp9po0k77asigxm")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
