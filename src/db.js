import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database:
		process.env.NODE_ENV === 'test'
			? process.env.DB_NAME_TEST
			: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT || 5432,
});

pool.connect((err, client, release) => {
	if (err) {
		console.error('Error connecting to the database', err.stack);
	} else {
		console.log('Database is connected in ENV: ', process.env.NODE_ENV);
		release();
	}
});

export { pool };
