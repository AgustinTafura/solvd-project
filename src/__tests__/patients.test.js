import request from 'supertest';
import app from '../index.js';
import { pool } from '../db.js';
import getToken from '../utils/getToken.js';

describe('Patients Endpoints', () => {
	let patientId;
	let token;

	beforeAll(async () => {
		token = await getToken();
		// await pool.query('DELETE FROM patients');
	});

	afterAll(async () => {
		await pool.end();
	});

	// POST - Create
	it('should create a new patient', async () => {
		const res = await request(app)
			.post('/api/v1/patients')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'John Doe',
				email: 'johndoe@mail.com',
				phone: '1234567890',
			});

		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('id');
		patientId = res.body.id; // Save the ID for use in other tests.
	});

	// GET - Get All
	it('should fetch all patients', async () => {
		const res = await request(app)
			.get('/api/v1/patients')
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toBeGreaterThan(0);
	});

	// GET - Get by ID
	it('should fetch a single patient by ID', async () => {
		const res = await request(app)
			.get(`/api/v1/patients/${patientId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('id', patientId);
	});

	// PUT - Update by ID
	it('should update a patient', async () => {
		const res = await request(app)
			.put(`/api/v1/patients/${patientId}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Jane Doe',
				email: 'janedoe@mail.com',
				phone: '0987654321',
			});

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('name', 'Jane Doe');
	});

	// DELETE - Delete by ID
	it('should delete a patient', async () => {
		const res = await request(app)
			.delete(`/api/v1/patients/${patientId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(204);
	});
});
