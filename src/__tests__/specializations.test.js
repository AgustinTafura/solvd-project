import request from 'supertest';
import app from '../index.js';
import { pool } from '../db.js';
import getToken from '../utils/getToken.js';

describe('Specializations Endpoints', () => {
	let specializationId;
	let token;

	beforeAll(async () => {
		token = await getToken();
		// await pool.query('DELETE FROM specializations');
	});

	afterAll(async () => {
		await pool.end();
	});

	// POST - Create
	it('should create a new specialization', async () => {
		const res = await request(app)
			.post('/api/v1/specializations')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Dentist',
			});

		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('id');
		specializationId = res.body.id; // Save the ID for use in other tests.
	});

	// POST - Create with error
	it('should return 400 when create a new specialization with duplicated name', async () => {
		const res = await request(app)
			.post('/api/v1/specializations')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Dentist',
			});
		console.log(res.body, res.statusCode);
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty('error');
		expect(res.body.error).toContain('specializations_name_key');
	});

	// GET - Get All
	it('should fetch all specializations', async () => {
		const res = await request(app)
			.get('/api/v1/specializations')
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toBeGreaterThan(0);
	});

	// GET - Get by ID
	it('should fetch a single specialization by ID', async () => {
		const res = await request(app)
			.get(`/api/v1/specializations/${specializationId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('id', specializationId);
	});

	// PUT - Update by ID
	it('should update a specialization', async () => {
		const res = await request(app)
			.put(`/api/v1/specializations/${specializationId}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Dentist Specialist',
			});

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('name', 'Dentist Specialist');
	});

	// DELETE - Delete by ID
	it('should delete a specialization', async () => {
		const res = await request(app)
			.delete(`/api/v1/specializations/${specializationId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(204);
	});
});
