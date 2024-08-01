import { pool } from './src/db.js';

const specializations = [
	{ name: 'Cardiology' },
	{ name: 'Dermatology' },
	{ name: 'Neurology' },
	{ name: 'Gastroenterology' },
	{ name: 'Pediatrics' },
	{ name: 'Oncology' },
	{ name: 'Orthopedics' },
	{ name: 'Psychiatry' },
	{ name: 'Urology' },
	{ name: 'Endocrinology' },
];

const symptoms = [
	{ name: 'Headache' },
	{ name: 'Chest Pain' },
	{ name: 'Skin Rash' },
	{ name: 'Abdominal Pain' },
	{ name: 'Fever' },
	{ name: 'Back Pain' },
	{ name: 'Anxiety' },
	{ name: 'Frequent Urination' },
	{ name: 'Fatigue' },
	{ name: 'Joint Pain' },
];

const specializationSymptoms = [
	{ specialization_name: 'Cardiology', symptom_name: 'Chest Pain' },
	{ specialization_name: 'Cardiology', symptom_name: 'Fatigue' },
	{ specialization_name: 'Dermatology', symptom_name: 'Skin Rash' },
	{ specialization_name: 'Neurology', symptom_name: 'Headache' },
	{ specialization_name: 'Neurology', symptom_name: 'Fatigue' },
	{ specialization_name: 'Gastroenterology', symptom_name: 'Abdominal Pain' },
	{ specialization_name: 'Pediatrics', symptom_name: 'Fever' },
	{ specialization_name: 'Pediatrics', symptom_name: 'Abdominal Pain' },
	{ specialization_name: 'Oncology', symptom_name: 'Fatigue' },
	{ specialization_name: 'Orthopedics', symptom_name: 'Back Pain' },
	{ specialization_name: 'Orthopedics', symptom_name: 'Joint Pain' },
	{ specialization_name: 'Psychiatry', symptom_name: 'Anxiety' },
	{ specialization_name: 'Psychiatry', symptom_name: 'Fatigue' },
	{ specialization_name: 'Urology', symptom_name: 'Frequent Urination' },
	{ specialization_name: 'Endocrinology', symptom_name: 'Fatigue' },
];

const availabilities = [
	{
		doctor_id: 1,
		day_of_week: 0,
		start_time: '09:00:00',
		end_time: '12:00:00',
	},
	{
		doctor_id: 1,
		day_of_week: 2,
		start_time: '13:00:00',
		end_time: '17:00:00',
	},
	{
		doctor_id: 2,
		day_of_week: 1,
		start_time: '08:00:00',
		end_time: '11:00:00',
	},
	{
		doctor_id: 2,
		day_of_week: 3,
		start_time: '14:00:00',
		end_time: '18:00:00',
	},
	{
		doctor_id: 3,
		day_of_week: 4,
		start_time: '10:00:00',
		end_time: '13:00:00',
	},
	{
		doctor_id: 3,
		day_of_week: 5,
		start_time: '09:00:00',
		end_time: '12:00:00',
	},
	{
		doctor_id: 4,
		day_of_week: 0,
		start_time: '12:00:00',
		end_time: '15:00:00',
	},
	{
		doctor_id: 4,
		day_of_week: 2,
		start_time: '11:00:00',
		end_time: '14:00:00',
	},
	{
		doctor_id: 5,
		day_of_week: 1,
		start_time: '08:00:00',
		end_time: '10:00:00',
	},
	{
		doctor_id: 5,
		day_of_week: 3,
		start_time: '13:00:00',
		end_time: '16:00:00',
	},
];

const doctors = [
	{ name: 'Dr. Smith', specialization_id: 1 },
	{ name: 'Dr. Brown', specialization_id: 2 },
	{ name: 'Dr. Johnson', specialization_id: 3 },
	{ name: 'Dr. Williams', specialization_id: 4 },
	{ name: 'Dr. Jones', specialization_id: 5 },
	{ name: 'Dr. Miller', specialization_id: 6 },
	{ name: 'Dr. Davis', specialization_id: 7 },
	{ name: 'Dr. Garcia', specialization_id: 8 },
	{ name: 'Dr. Martinez', specialization_id: 9 },
	{ name: 'Dr. Rodriguez', specialization_id: 10 },
];

const patients = [
	{ name: 'John Doe', email: 'john.doe@example.com', phone: '555-1234' },
	{ name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-5678' },
	{
		name: 'Alice Johnson',
		email: 'alice.johnson@example.com',
		phone: '555-8765',
	},
	{ name: 'Bob Brown', email: 'bob.brown@example.com', phone: '555-4321' },
	{
		name: 'Charlie Davis',
		email: 'charlie.davis@example.com',
		phone: '555-6789',
	},
	{
		name: 'Diana Evans',
		email: 'diana.evans@example.com',
		phone: '555-9876',
	},
	{
		name: 'Edward Foster',
		email: 'edward.foster@example.com',
		phone: '555-3456',
	},
	{
		name: 'Fiona Green',
		email: 'fiona.green@example.com',
		phone: '555-6543',
	},
	{
		name: 'George Harris',
		email: 'george.harris@example.com',
		phone: '555-7890',
	},
	{
		name: 'Hannah Clark',
		email: 'hannah.clark@example.com',
		phone: '555-8901',
	},
];

const appointments = [
	{
		patient_id: 1,
		doctor_id: 1,
		start_date: '2024-07-28T09:00:00Z',
		end_date: '2024-07-28T09:30:00Z',
	},
	{
		patient_id: 2,
		doctor_id: 1,
		start_date: '2024-07-30T13:00:00Z',
		end_date: '2024-07-30T13:30:00Z',
	},
	{
		patient_id: 3,
		doctor_id: 2,
		start_date: '2024-07-29T08:00:00Z',
		end_date: '2024-07-29T08:30:00Z',
	},
	{
		patient_id: 4,
		doctor_id: 2,
		start_date: '2024-07-31T14:00:00Z',
		end_date: '2024-07-31T14:30:00Z',
	},
	{
		patient_id: 5,
		doctor_id: 3,
		start_date: '2024-08-02T10:00:00Z',
		end_date: '2024-08-02T10:30:00Z',
	},
	{
		patient_id: 6,
		doctor_id: 3,
		start_date: '2024-08-03T09:00:00Z',
		end_date: '2024-08-03T09:30:00Z',
	},
	{
		patient_id: 7,
		doctor_id: 4,
		start_date: '2024-07-28T12:00:00Z',
		end_date: '2024-07-28T12:30:00Z',
	},
	{
		patient_id: 8,
		doctor_id: 4,
		start_date: '2024-07-30T11:00:00Z',
		end_date: '2024-07-30T11:30:00Z',
	},
	{
		patient_id: 9,
		doctor_id: 5,
		start_date: '2024-07-29T08:00:00Z',
		end_date: '2024-07-29T08:30:00Z',
	},
	{
		patient_id: 10,
		doctor_id: 5,
		start_date: '2024-07-31T13:00:00Z',
		end_date: '2024-07-31T13:30:00Z',
	},
	// (40 more appointment objects...)
	{
		patient_id: 1,
		doctor_id: 1,
		start_date: '2024-08-15T09:00:00Z',
		end_date: '2024-08-15T09:30:00Z',
	},
	{
		patient_id: 2,
		doctor_id: 1,
		start_date: '2024-08-17T13:00:00Z',
		end_date: '2024-08-17T13:30:00Z',
	},
	{
		patient_id: 3,
		doctor_id: 2,
		start_date: '2024-08-18T08:00:00Z',
		end_date: '2024-08-18T08:30:00Z',
	},
	{
		patient_id: 4,
		doctor_id: 2,
		start_date: '2024-08-19T14:00:00Z',
		end_date: '2024-08-19T14:30:00Z',
	},
	{
		patient_id: 5,
		doctor_id: 3,
		start_date: '2024-08-21T10:00:00Z',
		end_date: '2024-08-21T10:30:00Z',
	},
	{
		patient_id: 6,
		doctor_id: 3,
		start_date: '2024-08-22T09:00:00Z',
		end_date: '2024-08-22T09:30:00Z',
	},
	{
		patient_id: 7,
		doctor_id: 4,
		start_date: '2024-08-23T12:00:00Z',
		end_date: '2024-08-23T12:30:00Z',
	},
	{
		patient_id: 8,
		doctor_id: 4,
		start_date: '2024-08-25T11:00:00Z',
		end_date: '2024-08-25T11:30:00Z',
	},
	{
		patient_id: 9,
		doctor_id: 5,
		start_date: '2024-08-26T08:00:00Z',
		end_date: '2024-08-26T08:30:00Z',
	},
	{
		patient_id: 10,
		doctor_id: 5,
		start_date: '2024-08-28T13:00:00Z',
		end_date: '2024-08-28T13:30:00Z',
	},
];

async function seedSpecializations() {
	for (const specialization of specializations) {
		await pool.query(
			'INSERT INTO specializations (name) VALUES ($1) ON CONFLICT (name) DO NOTHING',
			[specialization.name],
		);
	}
	console.log('Specializations seeded');
}

async function seedSymptoms() {
	for (const symptom of symptoms) {
		await pool.query(
			'INSERT INTO symptoms (name) VALUES ($1) ON CONFLICT (name) DO NOTHING',
			[symptom.name],
		);
	}
	console.log('Symptoms seeded');
}

async function seedSpecializationSymptoms() {
	for (const {
		specialization_name,
		symptom_name,
	} of specializationSymptoms) {
		const specializationRes = await pool.query(
			'SELECT id FROM specializations WHERE name = $1',
			[specialization_name],
		);
		const symptomRes = await pool.query(
			'SELECT id FROM symptoms WHERE name = $1',
			[symptom_name],
		);

		if (specializationRes.rows.length > 0 && symptomRes.rows.length > 0) {
			const specialization_id = specializationRes.rows[0].id;
			const symptom_id = symptomRes.rows[0].id;

			await pool.query(
				'INSERT INTO specialization_symptoms (specialization_id, symptom_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
				[specialization_id, symptom_id],
			);
		}
	}
	console.log('Specialization Symptoms seeded');
}

async function seedAvailability() {
	for (const availability of availabilities) {
		await pool.query(
			'INSERT INTO availability (doctor_id, day_of_week, start_time, end_time) VALUES ($1, $2, $3, $4)',
			[
				availability.doctor_id,
				availability.day_of_week,
				availability.start_time,
				availability.end_time,
			],
		);
	}
	console.log('Availability seeded');
}

async function seedDoctors() {
	for (const doctor of doctors) {
		await pool.query(
			'INSERT INTO doctors (name, specialization_id) VALUES ($1, $2)',
			[doctor.name, doctor.specialization_id],
		);
	}
	console.log('Doctors seeded');
}

async function seedPatients() {
	for (const patient of patients) {
		const { name, email, phone } = patient;
		await pool.query(
			'INSERT INTO patients (name, email, phone) VALUES ($1, $2, $3)',
			[name, email, phone],
		);
	}
	console.log('Patients seeded');
}

async function seedAppointments() {
	for (const appointment of appointments) {
		await pool.query(
			'INSERT INTO appointments (patient_id, doctor_id, start_date, end_date) VALUES ($1, $2, $3, $4)',
			[
				appointment.patient_id,
				appointment.doctor_id,
				appointment.start_date,
				appointment.end_date,
			],
		);
	}
	console.log('Appointments seeded');
}

async function seedDatabase() {
	try {
		await seedSpecializations();
		await seedSymptoms();
		await seedSpecializationSymptoms();
		await seedPatients();
		await seedDoctors();
		await seedAvailability();
		await seedAppointments();
		console.log('Database seeded successfully');
	} catch (err) {
		console.error('Error seeding database', err);
	} finally {
		await pool.end();
	}
}

seedDatabase();
