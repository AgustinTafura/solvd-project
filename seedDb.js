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

async function seedDatabase() {
	try {
		await seedSpecializations();
		await seedSymptoms();
		await seedSpecializationSymptoms();
		await seedDoctors();
		await seedAvailability();
		console.log('Database seeded successfully');
	} catch (err) {
		console.error('Error seeding database', err);
	} finally {
		await pool.end();
	}
}

seedDatabase();
