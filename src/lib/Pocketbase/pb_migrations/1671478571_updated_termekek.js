migrate((db) => {
	const dao = new Dao(db);
	const collection = dao.findCollectionByNameOrId('rp9po0k77asigxm');

	// add
	collection.schema.addField(new SchemaField({
		'system': false,
		'id': 'ijqvzofu',
		'name': 'darab',
		'type': 'number',
		'required': false,
		'unique': false,
		'options': {
			'min': null,
			'max': null
		}
	}));

	return dao.saveCollection(collection);
}, (db) => {
	const dao = new Dao(db);
	const collection = dao.findCollectionByNameOrId('rp9po0k77asigxm');

	// remove
	collection.schema.removeField('ijqvzofu');

	return dao.saveCollection(collection);
});
