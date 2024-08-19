import request from 'supertest';
import app from '../index.js';
import { pool } from '../db.js';
import getToken from '../utils/getToken.js';

describe('SpecializationSymptoms Endpoints', () => {
	let specializationSymptomId;
	let token;

	beforeAll(async () => {
		token = await getToken();
		// await pool.query('DELETE FROM specialization_symptoms');
	});

	afterAll(async () => {
		await pool.end();
	});

	// POST - Create
	it('should create a new specialization_symptom', async () => {
		const res = await request(app)
			.post('/api/v1/specialization_symptoms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				specialization_id: 1,
				symptom_id: 1,
			});

		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('id');
		specializationSymptomId = res.body.id; // Save the ID for use in other tests.
	});

	// GET - Get All
	it('should fetch all specialization_symptoms', async () => {
		const res = await request(app)
			.get('/api/v1/specialization_symptoms')
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toBeGreaterThan(0);
	});

	// GET - Get by ID
	it('should fetch a single specialization_symptom by ID', async () => {
		const res = await request(app)
			.get(`/api/v1/specialization_symptoms/${specializationSymptomId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('id', specializationSymptomId);
	});

	// PUT - Update by ID
	it('should update a specialization_symptom', async () => {
		const res = await request(app)
			.put(`/api/v1/specialization_symptoms/${specializationSymptomId}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				specialization_id: 2,
				symptom_id: 2,
			});

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('specialization_id', 2);
		expect(res.body).toHaveProperty('symptom_id', 2);
	});

	// DELETE - Delete by ID
	it('should delete a specialization_symptom', async () => {
		const res = await request(app)
			.delete(
				`/api/v1/specialization_symptoms/${specializationSymptomId}`,
			)
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(204);
	});
});
