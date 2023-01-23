migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dmfw91fuacie13t");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "dmfw91fuacie13t",
    "created": "2022-12-23 16:22:01.770Z",
    "updated": "2022-12-23 16:22:01.770Z",
    "name": "rendelesek",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "571yoqrc",
        "name": "termek",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "u1itpddi",
        "name": "darab",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null
        }
      },
      {
        "system": false,
        "id": "253kawom",
        "name": "rendello",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true
        }
      },
      {
        "system": false,
        "id": "x1sz0sxy",
        "name": "status",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
