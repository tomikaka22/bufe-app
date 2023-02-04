migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("rwo56airwjyon6y");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "rwo56airwjyon6y",
    "created": "2022-11-22 17:02:42.651Z",
    "updated": "2022-12-23 19:35:32.673Z",
    "name": "rendeles_elozmeny",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "v2xnmd4r",
        "name": "rendeles",
        "type": "json",
        "required": true,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "q5edtdle",
        "name": "rendelo",
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
        "id": "vul41okm",
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
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
