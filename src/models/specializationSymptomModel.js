import { pool } from '../db.js';

export async function getAllSpecializationSymptoms() {
	const res = await pool.query('SELECT * FROM specialization_symptoms');
	return res.rows;
}

export async function getSpecializationSymptomById(id) {
	const res = await pool.query(
		'SELECT * FROM specialization_symptoms WHERE id = $1',
		[id],
	);
	return res.rows[0];
}

export async function createSpecializationSymptom(
	specialization_id,
	symptom_id,
) {
	const res = await pool.query(
		'INSERT INTO specialization_symptoms (specialization_id, symptom_id) VALUES ($1, $2) RETURNING *',
		[specialization_id, symptom_id],
	);
	return res.rows[0];
}

export async function updateSpecializationSymptom(
	id,
	specialization_id,
	symptom_id,
) {
	const res = await pool.query(
		'UPDATE specialization_symptoms SET specialization_id = $1, symptom_id = $2 WHERE id = $3 RETURNING *',
		[specialization_id, symptom_id, id],
	);
	return res.rows[0];
}

export async function deleteSpecializationSymptom(id) {
	await pool.query('DELETE FROM specialization_symptoms WHERE id = $1', [id]);
}
