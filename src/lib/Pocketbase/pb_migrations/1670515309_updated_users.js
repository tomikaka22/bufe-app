migrate((db) => {
	const dao = new Dao(db);
	const collection = dao.findCollectionByNameOrId('_pb_users_auth_');

	// add
	collection.schema.addField(new SchemaField({
		'system': false,
		'id': 'ywzcki6h',
		'name': 'avatar',
		'type': 'file',
		'required': false,
		'unique': false,
		'options': {
			'maxSelect': 1,
			'maxSize': 5242880,
			'mimeTypes': [
				'image/jpg',
				'image/jpeg',
				'image/png',
				'image/svg+xml',
				'image/gif'
			],
			'thumbs': [
				'200x200'
			]
		}
	}));

	return dao.saveCollection(collection);
}, (db) => {
	const dao = new Dao(db);
	const collection = dao.findCollectionByNameOrId('_pb_users_auth_');

	// remove
	collection.schema.removeField('ywzcki6h');

	return dao.saveCollection(collection);
});
