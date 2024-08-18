import { pool } from '../db.js';

export async function findUserByEmail(email) {
	const { rows } = await pool.query(
		'SELECT id, email, name FROM users WHERE email = $1',
		[email],
	);
	return rows[0];
}

export async function createUser(email, name, password) {
	const { rows } = await pool.query(
		'INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *',
		[email, name, password],
	);
	return rows[0];
}
