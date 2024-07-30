import { pool } from '../db.js';

export async function getAllSpecializations() {
	const res = await pool.query('SELECT * FROM specializations');
	return res.rows;
}

export async function getSpecializationById(id) {
	const res = await pool.query(
		'SELECT * FROM specializations WHERE id = $1',
		[id],
	);
	return res.rows[0];
}

export async function createSpecialization(name) {
	const res = await pool.query(
		'INSERT INTO specializations (name) VALUES ($1) RETURNING *',
		[name],
	);
	return res.rows[0];
}

export async function updateSpecialization(id, name) {
	const res = await pool.query(
		'UPDATE specializations SET name = $1 WHERE id = $2 RETURNING *',
		[name, id],
	);
	return res.rows[0];
}

export async function deleteSpecialization(id) {
	await pool.query('DELETE FROM specializations WHERE id = $1', [id]);
}
