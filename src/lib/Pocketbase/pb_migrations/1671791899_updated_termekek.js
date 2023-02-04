migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rp9po0k77asigxm")

  // remove
  collection.schema.removeField("vs1u81vq")

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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ijqvzofu",
    "name": "darab",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rp9po0k77asigxm")

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

  // remove
  collection.schema.removeField("na773zrs")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ijqvzofu",
    "name": "darab",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
