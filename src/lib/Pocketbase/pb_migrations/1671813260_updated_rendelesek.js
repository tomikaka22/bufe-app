migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0d7ajb0fxqhkclp")

  // remove
  collection.schema.removeField("1auzdmrh")

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "63ro0ieg",
    "name": "termekek",
    "type": "json",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0d7ajb0fxqhkclp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1auzdmrh",
    "name": "termekek",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("txdqmdi3")

  // remove
  collection.schema.removeField("63ro0ieg")

  return dao.saveCollection(collection)
})
