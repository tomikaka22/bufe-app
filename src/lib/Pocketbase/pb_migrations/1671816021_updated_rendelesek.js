migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0d7ajb0fxqhkclp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jlaerii7",
    "name": "total",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0d7ajb0fxqhkclp")

  // remove
  collection.schema.removeField("jlaerii7")

  return dao.saveCollection(collection)
})
