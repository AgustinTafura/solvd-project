import { pool } from '../db.js';

export async function getAllPatients() {
	const res = await pool.query('SELECT id, name, email, phone FROM patients');
	return res.rows;
}

export async function getPatientById(id) {
	const res = await pool.query(
		'SELECT id, name, email, phone FROM patients WHERE id = $1',
		[id],
	);
	return res.rows[0];
}

export async function createPatient(name, email, phone) {
	const res = await pool.query(
		'INSERT INTO patients (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
		[name, email, phone],
	);
	return res.rows[0];
}

export async function updatePatient(id, updates) {
	const fields = [];
	const values = [];
	let index = 1;

	if (updates.name) {
		fields.push(`name = $${index++}`);
		values.push(updates.name);
	}
	if (updates.email) {
		fields.push(`email = $${index++}`);
		values.push(updates.email);
	}
	if (updates.phone) {
		fields.push(`phone = $${index++}`);
		values.push(updates.phone);
	}

	if (fields.length === 0) {
		throw new Error('No valid fields to update');
	}

	values.push(id);
	const query = `UPDATE patients SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;

	const res = await pool.query(query, values);
	return res.rows[0];
}

export async function deletePatient(id) {
	await pool.query('DELETE FROM patients WHERE id = $1', [id]);
}
