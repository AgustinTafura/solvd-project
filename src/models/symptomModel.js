import { pool } from '../db.js';

export async function getAllSymptoms() {
	const res = await pool.query('SELECT * FROM symptoms');
	return res.rows;
}

export async function getSymptomById(id) {
	const res = await pool.query('SELECT * FROM symptoms WHERE id = $1', [id]);
	return res.rows[0];
}

export async function createSymptom(name) {
	const res = await pool.query(
		'INSERT INTO symptoms (name) VALUES ($1) RETURNING *',
		[name],
	);
	return res.rows[0];
}

export async function updateSymptom(id, name) {
	const res = await pool.query(
		'UPDATE symptoms SET name = $1 WHERE id = $2 RETURNING *',
		[name, id],
	);
	return res.rows[0];
}

export async function deleteSymptom(id) {
	await pool.query('DELETE FROM symptoms WHERE id = $1', [id]);
}
