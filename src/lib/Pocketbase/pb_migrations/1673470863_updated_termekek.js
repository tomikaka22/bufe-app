migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rp9po0k77asigxm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qokjcfic",
    "name": "feltet",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rp9po0k77asigxm")

  // remove
  collection.schema.removeField("qokjcfic")

  return dao.saveCollection(collection)
})
