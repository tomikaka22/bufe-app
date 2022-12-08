migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2022-11-13 18:04:06.222Z",
      "updated": "2022-11-14 20:02:16.495Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "btddtfk6",
          "name": "name",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "listRule": "id = @request.auth.id",
      "viewRule": "id = @request.auth.id",
      "createRule": "",
      "updateRule": "id = @request.auth.id",
      "deleteRule": "id = @request.auth.id",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": false,
        "allowUsernameAuth": false,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": [
          "kkszki.hu"
        ],
        "requireEmail": false
      }
    },
    {
      "id": "rp9po0k77asigxm",
      "created": "2022-11-22 16:45:01.902Z",
      "updated": "2022-11-22 17:54:46.836Z",
      "name": "termekek",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "iw5dsbgh",
          "name": "termekek",
          "type": "text",
          "required": true,
          "unique": true,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "dkesimg8",
          "name": "ar",
          "type": "number",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null
          }
        }
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "rwo56airwjyon6y",
      "created": "2022-11-22 17:02:42.651Z",
      "updated": "2022-12-03 20:07:10.150Z",
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
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
