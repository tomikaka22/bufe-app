migrate((db) => {
  const collection = new Collection({
    "id": "0d7ajb0fxqhkclp",
    "created": "2022-12-23 16:30:54.603Z",
    "updated": "2022-12-23 16:30:54.603Z",
    "name": "rendelesek",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
        "system": false,
        "id": "brkmksv9",
        "name": "darab",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": null
        }
      },
      {
        "system": false,
        "id": "116562lp",
        "name": "rendelo",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false
        }
      }
    ],
    "listRule": "@request.auth.id = 'u1fy74rt1m48tx1' || @request.auth.id = 'rdzc6b3jes1k8am'",
    "viewRule": "@request.auth.id = 'u1fy74rt1m48tx1' || @request.auth.id = 'rdzc6b3jes1k8am'",
    "createRule": "",
    "updateRule": "@request.auth.id = 'u1fy74rt1m48tx1' || @request.auth.id = 'rdzc6b3jes1k8am'",
    "deleteRule": "@request.auth.id = 'u1fy74rt1m48tx1' || @request.auth.id = 'rdzc6b3jes1k8am'",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("0d7ajb0fxqhkclp");

  return dao.deleteCollection(collection);
})
