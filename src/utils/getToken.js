import request from 'supertest';
import app from '../index.js';
import { pool } from '../db.js';

let token;

const getToken = async () => {
	if (!token) {
		// await pool.query('DELETE FROM users');
		await request(app).post('/api/v1/register').send({
			name: 'user 1',
			email: 'testingemail@mail.com',
			password: '123123test',
		});

		const loginResponse = await request(app).post('/api/v1/login').send({
			email: 'testingemail@mail.com',
			password: '123123test',
		});
		token = loginResponse.body.token;
	}
	return token;
};

export default getToken;
