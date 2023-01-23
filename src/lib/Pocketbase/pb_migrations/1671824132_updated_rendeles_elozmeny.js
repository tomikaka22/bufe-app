migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rwo56airwjyon6y")

  // remove
  collection.schema.removeField("nt6llsox")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rwo56airwjyon6y")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nt6llsox",
    "name": "name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
