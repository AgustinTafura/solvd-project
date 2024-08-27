import request from 'supertest';
import app from '../index.js';
import { pool } from '../db.js';
import getToken from '../utils/getToken.js';

describe('Doctors Endpoints', () => {
	let doctorId;
	let token;

	beforeAll(async () => {
		token = await getToken();
		// await pool.query('DELETE FROM doctors');
	});

	afterAll(async () => {
		await pool.end();
	});

	// POST - Create
	it('should create a new doctor', async () => {
		const res = await request(app)
			.post('/api/v1/doctors')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Dr. Smith',
				specialization_id: 1,
			});

		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('id');
		doctorId = res.body.id; // Save the ID for use in other tests.
	});

	// GET - Get All
	it('should fetch all doctors', async () => {
		const res = await request(app)
			.get('/api/v1/doctors')
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toBeGreaterThan(0);
	});

	// GET - Get by ID
	it('should fetch a single doctor by ID', async () => {
		const res = await request(app)
			.get(`/api/v1/doctors/${doctorId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('id', doctorId);
	});

	// PUT - Update by ID
	it('should update a doctor', async () => {
		const res = await request(app)
			.put(`/api/v1/doctors/${doctorId}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Dr. John Smith',
				specialization_id: 2,
			});

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('name', 'Dr. John Smith');
	});

	// DELETE - Delete by ID
	it('should delete a doctor', async () => {
		const res = await request(app)
			.delete(`/api/v1/doctors/${doctorId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(204);
	});

	// POST - Create
	it('should return 400 when creating availability with missing fields', async () => {
		const res = await request(app)
			.post('/api/v1/doctors')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Dr. Smith',
				// Missing specialization_id: 1,
			});
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty('error', 'Missing required parameters');
	});
});
