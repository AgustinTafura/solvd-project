import { pool } from '../db.js';

export async function getAllDoctors() {
	const res = await pool.query('SELECT * FROM doctors');
	return res.rows;
}

export async function getDoctorById(id) {
	const res = await pool.query('SELECT * FROM doctors WHERE id = $1', [id]);
	return res.rows[0];
}

export async function createDoctor(name, specialization_id) {
	const res = await pool.query(
		'INSERT INTO doctors (name, specialization_id) VALUES ($1, $2) RETURNING *',
		[name, specialization_id],
	);
	return res.rows[0];
}

export async function updateDoctor(id, updates) {
	const fields = [];
	const values = [];
	let index = 1;

	if (updates.name) {
		fields.push(`name = $${index++}`);
		values.push(updates.name);
	}
	if (updates.specialization_id) {
		fields.push(`specialization_id = $${index++}`);
		values.push(updates.specialization_id);
	}

	if (fields.length === 0) {
		throw new Error('No valid fields to update');
	}

	values.push(id);
	const query = `UPDATE doctors SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;

	const res = await pool.query(query, values);
	return res.rows[0];
}

export async function deleteDoctor(id) {
	await pool.query('DELETE FROM doctors WHERE id = $1', [id]);
}
