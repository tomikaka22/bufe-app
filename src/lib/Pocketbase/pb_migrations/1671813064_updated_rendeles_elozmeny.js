migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rwo56airwjyon6y")

  // remove
  collection.schema.removeField("qhjgo0lb")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rwo56airwjyon6y")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qhjgo0lb",
    "name": "sorszam",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
