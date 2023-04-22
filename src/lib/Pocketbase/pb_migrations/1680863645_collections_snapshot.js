migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2022-11-13 18:04:06.222Z",
      "updated": "2023-04-07 10:31:30.818Z",
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
        },
        {
          "system": false,
          "id": "ywzcki6h",
          "name": "avatar",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [
              "image/jpg",
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif",
              "image/webp"
            ],
            "thumbs": [
              "256x256"
            ]
          }
        }
      ],
      "indexes": [
        "CREATE INDEX `__pb_users_auth__created_idx` ON `users` (`created`)"
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
      "updated": "2023-04-07 10:31:30.819Z",
      "name": "termekek",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "iw5dsbgh",
          "name": "termek",
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
        },
        {
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
        },
        {
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
        },
        {
          "system": false,
          "id": "8mgntvmq",
          "name": "kategoria",
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
          "id": "qokjcfic",
          "name": "feltetek",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "h6sedyvx",
          "name": "vasarlasok",
          "type": "number",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null
          }
        }
      ],
      "indexes": [
        "CREATE INDEX `_rp9po0k77asigxm_created_idx` ON \"termekek\" (`created`)",
        "CREATE UNIQUE INDEX \"idx_unique_iw5dsbgh\" on \"termekek\" (\"termek\")"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "@request.auth.id = 'u1fy74rt1m48tx1' || @request.auth.id = 'rdzc6b3jes1k8am'",
      "updateRule": "",
      "deleteRule": "@request.auth.id = 'u1fy74rt1m48tx1' || @request.auth.id = 'rdzc6b3jes1k8am'",
      "options": {}
    },
    {
      "id": "0d7ajb0fxqhkclp",
      "created": "2022-12-23 16:30:54.603Z",
      "updated": "2023-04-07 10:31:30.820Z",
      "name": "rendelesek",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "116562lp",
          "name": "rendelo",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "63ro0ieg",
          "name": "termekek",
          "type": "json",
          "required": true,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "jlaerii7",
          "name": "total",
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
          "id": "kdp7v5ud",
          "name": "status",
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
          "id": "zgi1bs0o",
          "name": "name",
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
          "id": "kbvax2wf",
          "name": "fizetes",
          "type": "select",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "Készpénz",
              "Bankkártya"
            ]
          }
        },
        {
          "system": false,
          "id": "xy7vfwzc",
          "name": "idopont",
          "type": "select",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "1. Óra előtt",
              "2. Óra előtti szünet",
              "3. Óra előtti szünet",
              "4. Óra előtti szünet",
              "5. Óra előtti szünet",
              "6. Óra előtti szünet"
            ]
          }
        }
      ],
      "indexes": [
        "CREATE INDEX `_0d7ajb0fxqhkclp_created_idx` ON `rendelesek` (`created`)"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "@request.auth.id = 'u1fy74rt1m48tx1' || @request.auth.id = 'rdzc6b3jes1k8am'",
      "deleteRule": "status != 'folyamatban'",
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
