const db = require('../data/dbConfig');

module.exports = {
	find,
	findById,
	findSteps,
	add,
	update,
	remove
};

function find() {
	return db('schemes');
}

function findById(id) {
	return db('schemes')
		.where({ id })
		.first();
}

function findSteps(id) {
	return db('steps as s')
		.join('schemes as sc', 'sc.id', 's.scheme_id')
		.select('s.id', 'sc.scheme_name', 's.step_number', 's.instructions')
		.where('s.scheme_id', id);
}

function add(scheme) {
	return db('schemes')
		.insert(scheme)
		.then(ids => {
			return findById(ids[0]);
		});
}


function update(scheme, id) {
  return db('schemes')
 
		.where({ id })
		.update(scheme);
}

function remove(id) {
	return db('schemes')
		.where('id', id)
		.del();
}
