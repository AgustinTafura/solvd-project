import { pool } from '../db.js';

export async function createAvailability(
	doctor_id,
	day_of_week,
	start_time,
	end_time,
) {
	const res = await pool.query(
		'INSERT INTO availability (doctor_id, day_of_week, start_time, end_time) VALUES ($1, $2, $3, $4) RETURNING *',
		[doctor_id, day_of_week, start_time, end_time],
	);
	return res.rows[0];
}

export async function getAllAvailability() {
	const res = await pool.query(
		'SELECT id,doctor_id,day_of_week,start_time,end_time FROM availability',
	);
	return res.rows;
}

export async function getAvailabilityById(id) {
	const res = await pool.query(
		'SELECT id,doctor_id,day_of_week,start_time,end_time FROM availability WHERE id = $1',
		[id],
	);
	return res.rows[0];
}

export async function updateAvailability(id, updates) {
	const fields = [];
	const values = [];

	Object.keys(updates).forEach((key, index) => {
		fields.push(`${key} = $${index + 1}`);
		values.push(updates[key]);
	});

	values.push(id);

	const query = `UPDATE availability SET ${fields.join(', ')} WHERE id = $${values.length} RETURNING *`;

	const res = await pool.query(query, values);
	return res.rows[0];
}

export async function deleteAvailability(id) {
	await pool.query('DELETE FROM availability WHERE id = $1', [id]);
}
