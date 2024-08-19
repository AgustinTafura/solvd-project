import request from 'supertest';
import app from '../index.js';
import { pool } from '../db.js';
import getToken from '../utils/getToken.js';

describe('Symptoms Endpoints', () => {
	let symptomId;
	let token;

	beforeAll(async () => {
		token = await getToken();
		// await pool.query('DELETE FROM symptoms');
	});

	afterAll(async () => {
		await pool.end();
	});

	// POST - Create
	it('should create a new symptom', async () => {
		const res = await request(app)
			.post('/api/v1/symptoms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Migraine sever',
			});

		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('id');
		symptomId = res.body.id; // Save the ID for use in other tests.
	});

	// GET - Get All
	it('should fetch all symptoms', async () => {
		const res = await request(app)
			.get('/api/v1/symptoms')
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toBeGreaterThan(0);
	});

	// GET - Get by ID
	it('should fetch a single symptom by ID', async () => {
		const res = await request(app)
			.get(`/api/v1/symptoms/${symptomId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('id', symptomId);
	});

	// PUT - Update by ID
	it('should update a symptom', async () => {
		const res = await request(app)
			.put(`/api/v1/symptoms/${symptomId}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Migraine',
			});

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('name', 'Migraine');
	});

	// DELETE - Delete by ID
	it('should delete a symptom', async () => {
		const res = await request(app)
			.delete(`/api/v1/symptoms/${symptomId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(204);
	});
});
