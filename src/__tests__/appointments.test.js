import request from 'supertest';
import app from '../index.js';
import { pool } from '../db.js';
import getToken from '../utils/getToken.js';

describe('Appointments Endpoints', () => {
	let appointmentId;
	let token;

	beforeAll(async () => {
		token = await getToken();
		// await pool.query('DELETE FROM appointments');
	});

	afterAll(async () => {
		await pool.end();
	});

	// POST - Create
	it('should create a new appointment', async () => {
		const res = await request(app)
			.post('/api/v1/appointments')
			.set('Authorization', `Bearer ${token}`)
			.send({
				patient_id: 1,
				doctor_id: 1,
				start_date: '2024-08-04T12:00:00.000Z',
				end_date: '2024-08-04T12:15:00.000Z',
			});

		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('id');
		appointmentId = res.body.id;
	});

	// GET - Get All
	it('should fetch all appointments', async () => {
		const res = await request(app)
			.get('/api/v1/appointments')
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toBeGreaterThan(0);
	});

	// GET - Get by ID
	it('should fetch a single appointment by ID', async () => {
		const res = await request(app)
			.get(`/api/v1/appointments/${appointmentId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('id', appointmentId);
	});

	// PUT - Update by ID
	it('should update an appointment', async () => {
		const res = await request(app)
			.put(`/api/v1/appointments/${appointmentId}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				patient_id: 1,
				doctor_id: 1,
				start_date: '2024-08-04T16:00:00.000Z',
				end_date: '2024-08-04T16:15:00.000Z',
			});

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty(
			'start_date',
			'2024-08-04T19:00:00.000Z',
		);
	});

	// DELETE - Delete by ID
	it('should delete an appointment', async () => {
		const res = await request(app)
			.delete(`/api/v1/appointments/${appointmentId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res.statusCode).toEqual(204);
	});

	// Prueba de creación con datos faltantes
	it('should return a 400 error when creating an appointment with missing fields', async () => {
		const res = await request(app)
			.post('/api/v1/appointments')
			.set('Authorization', `Bearer ${token}`)
			.send({
				doctor_id: 1,
				start_date: '2024-08-04T12:00:00.000Z', // falta patient_id y end_date
			});
		console.log(11, res.body, res.statusCode);

		expect(res.statusCode).toEqual(400);
		expect(res.body).toHaveProperty('error');
	});

	// Prueba de conflicto de citas
	it('should return a 409 error when creating an appointment with a conflicting time slot', async () => {
		// Crea una cita válida primero
		await request(app)
			.post('/api/v1/appointments')
			.set('Authorization', `Bearer ${token}`)
			.send({
				patient_id: 1,
				doctor_id: 1,
				start_date: '2024-08-04T12:00:00.000Z',
				end_date: '2024-08-04T12:15:00.000Z',
			});

		// Intenta crear otra cita que solape con la anterior
		const res = await request(app)
			.post('/api/v1/appointments')
			.set('Authorization', `Bearer ${token}`)
			.send({
				patient_id: 1,
				doctor_id: 1,
				start_date: '2024-08-04T12:10:00.000Z', // se solapa con la cita anterior
				end_date: '2024-08-04T12:20:00.000Z',
			});
		console.log(44, res.body, res.statusCode);
		expect(res.statusCode).toEqual(409); // o el código que uses para conflictos
		expect(res.body).toHaveProperty('error');
	});
});
