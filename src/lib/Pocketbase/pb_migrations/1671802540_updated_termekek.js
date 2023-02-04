migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rp9po0k77asigxm")

  // remove
  collection.schema.removeField("na773zrs")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rp9po0k77asigxm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "na773zrs",
    "name": "maxamount",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
