import request from 'supertest';
import app from '../index.js';
import { pool } from '../db.js';
import getToken from '../utils/getToken.js';

describe('Availability Endpoints', () => {
	let availabilityId;
	let token;

	beforeAll(async () => {
		token = await getToken();
		// await pool.query('DELETE FROM availability');
	});

	afterAll(async () => {
		await pool.end();
	});

	// POST - Create
	it('should create a new availability', async () => {
		const res = await request(app)
			.post('/api/v1/availability')
			.set('Authorization', `Bearer ${token}`)
			.send({
				doctor_id: 1,
				day_of_week: 1,
				start_time: '09:00:00',
				end_time: '17:00:00',
			});
		console.log(888888, token, res.body, res.statusCode);
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('id');
		availabilityId = res.body.id;
	});

	// GET - Get All
	it('should fetch all availability records', async () => {
		const res = await request(app)
			.get('/api/v1/availability')
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toBeGreaterThan(0);
	});

	// GET - Get by ID
	it('should fetch a single availability by ID', async () => {
		const res = await request(app)
			.get(`/api/v1/availability/${availabilityId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('id', availabilityId);
	});

	// PUT - Update by ID
	it('should update an availability record', async () => {
		const res = await request(app)
			.put(`/api/v1/availability/${availabilityId}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				doctor_id: 1,
				day_of_week: 2,
				start_time: '10:00:00',
				end_time: '18:00:00',
			});

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('day_of_week', 2);
	});

	// DELETE - Delete by ID
	it('should delete an availability record', async () => {
		const res = await request(app)
			.delete(`/api/v1/availability/${availabilityId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(204);
	});

	// POST - Create with missing fields
	it('should return 400 when creating availability with missing fields', async () => {
		const res = await request(app)
			.post('/api/v1/availability')
			.set('Authorization', `Bearer ${token}`)
			.send({
				// Missing doctor_id, end_time
				day_of_week: 1,
				start_time: '09:00:00',
			});
		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty('error', 'Missing required parameters');
	});
});
