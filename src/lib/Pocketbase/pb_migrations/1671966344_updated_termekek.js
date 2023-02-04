migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rp9po0k77asigxm")

  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rp9po0k77asigxm")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
