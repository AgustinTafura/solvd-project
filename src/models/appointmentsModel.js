import { pool } from '../db.js';

export async function createAppointment({
	patient_id,
	doctor_id,
	start_date,
	end_date,
}) {
	console.log(123, patient_id, doctor_id, start_date, end_date);
	const res = await pool.query(
		'INSERT INTO appointments (patient_id, doctor_id, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *',
		[patient_id, doctor_id, start_date, end_date],
	);
	return res.rows[0];
}

export async function getAllAppointments() {
	const res = await pool.query('SELECT * FROM appointments');
	return res.rows;
}

export async function getAppointmentById(id) {
	const res = await pool.query('SELECT * FROM appointments WHERE id = $1', [
		id,
	]);
	return res.rows[0];
}

export async function updateAppointment(id, updates) {
	const fields = [];
	const values = [];

	Object.keys(updates).forEach((key, index) => {
		fields.push(`${key} = $${index + 1}`);
		values.push(updates[key]);
	});

	values.push(id);

	const query = `UPDATE appointments SET ${fields.join(', ')} WHERE id = $${values.length} RETURNING *`;

	const res = await pool.query(query, values);
	return res.rows[0];
}

export async function deleteAppointment(id) {
	const res = await pool.query('DELETE FROM appointments WHERE id = $1', [
		id,
	]);
	return res.rowCount > 0;
}
