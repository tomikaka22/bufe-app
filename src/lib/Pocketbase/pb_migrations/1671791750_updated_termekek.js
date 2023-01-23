migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rp9po0k77asigxm")

  collection.listRule = ""
  collection.viewRule = ""

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wnos2qkf",
    "name": "leiras",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vs1u81vq",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rp9po0k77asigxm")

  collection.listRule = null
  collection.viewRule = null

  // remove
  collection.schema.removeField("wnos2qkf")

  // remove
  collection.schema.removeField("vs1u81vq")

  return dao.saveCollection(collection)
})
