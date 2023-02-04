migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0d7ajb0fxqhkclp")

  // remove
  collection.schema.removeField("txdqmdi3")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0d7ajb0fxqhkclp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "txdqmdi3",
    "name": "field",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
