import { pool } from '../db.js';

export async function createAppointment({
	patient_id,
	doctor_id,
	start_date,
	end_date,
}) {
	const res = await pool.query(
		'INSERT INTO appointments (patient_id, doctor_id, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *',
		[patient_id, doctor_id, start_date, end_date],
	);
	return res.rows[0];
}

export async function getAllAppointments() {
	const res = await pool.query('SELECT * FROM appointments');
	return res.rows;
}

export async function getAppointmentById(id) {
	const res = await pool.query('SELECT * FROM appointments WHERE id = $1', [
		id,
	]);
	return res.rows[0];
}

export async function updateAppointment(id, updates) {
	const fields = [];
	const values = [];

	Object.keys(updates).forEach((key, index) => {
		fields.push(`${key} = $${index + 1}`);
		values.push(updates[key]);
	});

	values.push(id);

	const query = `UPDATE appointments SET ${fields.join(', ')} WHERE id = $${values.length} RETURNING *`;

	const res = await pool.query(query, values);
	return res.rows[0];
}

export async function deleteAppointment(id) {
	const res = await pool.query('DELETE FROM appointments WHERE id = $1', [
		id,
	]);
	return res.rowCount > 0;
}

async function getSpecializationFromSymptoms(symptoms) {
	const query = `
        SELECT DISTINCT specialization_id
        FROM specialization_symptoms
        WHERE symptom_id = ANY($1::int[])
    `;
	const res = await pool.query(query, [symptoms]);
	return res.rows.map((row) => row.specialization_id);
}

function roundToNextHalfHour(date) {
	const minutes = date.getMinutes();
	const roundedMinutes = minutes < 30 ? 30 : 60;
	date.setMinutes(roundedMinutes, 0, 0);
	if (roundedMinutes === 60) {
		date.setHours(date.getHours() + 1);
		date.setMinutes(0);
	}
	return date;
}

export async function findNearestAppointments(
	specialization_id,
	symptomsArray,
	limit,
) {
	let specializationIds = [];
	const appointmentsLimit = limit && limit > 0 ? limit : 1;

	if (specialization_id) {
		specializationIds.push(Number(specialization_id));
	} else if (symptomsArray && symptomsArray.length > 0) {
		specializationIds = await getSpecializationFromSymptoms(symptomsArray);
	}

	if (specializationIds.length === 0) {
		throw new Error('No specialization found');
	}

	const doctorQuery = `
        SELECT id
        FROM doctors
        WHERE specialization_id = ANY($1::int[])
    `;
	const doctorResult = await pool.query(doctorQuery, [specializationIds]);
	const doctorIds = doctorResult.rows.map((row) => row.id);

	if (doctorIds.length === 0) {
		throw new Error('No doctors with the given specialty were found');
	}

	const now = new Date();
	const roundedNow = roundToNextHalfHour(new Date(now));
	const todayDayOfWeek = now.getDay();

	const availabilityQuery = `
        SELECT a.doctor_id, a.day_of_week, a.start_time, a.end_time, d.specialization_id
        FROM availability a
        JOIN doctors d ON a.doctor_id = d.id
        WHERE a.doctor_id = ANY($1::int[])
    `;
	const availabilityResult = await pool.query(availabilityQuery, [doctorIds]);
	const availabilities = availabilityResult.rows;

	const appointmentQuery = `
        SELECT doctor_id, start_date, end_date
        FROM appointments
        WHERE doctor_id = ANY($1::int[])
    `;
	const appointmentResult = await pool.query(appointmentQuery, [doctorIds]);
	const appointments = appointmentResult.rows;

	const thirtyMinutes = 30 * 60 * 1000;
	const availableSlots = [];
	let daysSearched = 0;

	while (availableSlots.length < appointmentsLimit && daysSearched < 28) {
		// Limit the search to 4 weeks (28 days)
		const currentDayOfWeek = (todayDayOfWeek + daysSearched) % 7;
		const todaysAvailabilities = availabilities.filter(
			(availability) => availability.day_of_week === currentDayOfWeek,
		);

		for (const availability of todaysAvailabilities) {
			const { doctor_id, start_time, end_time, specialization_id } =
				availability;
			let currentTime = new Date(`${now.toDateString()} ${start_time}`);
			const endTimeDate = new Date(`${now.toDateString()} ${end_time}`);

			// Set currentTime for the first search day
			if (daysSearched === 0 && currentTime < roundedNow) {
				currentTime = roundedNow;
			}

			// Adjust currentTime for future days
			currentTime.setDate(currentTime.getDate() + daysSearched);
			const futureEndTimeDate = new Date(endTimeDate);
			futureEndTimeDate.setDate(endTimeDate.getDate() + daysSearched);

			while (currentTime <= futureEndTimeDate) {
				const currentTimeEnd = new Date(
					currentTime.getTime() + thirtyMinutes,
				);
				const overlappingAppointment = appointments.some(
					(app) =>
						app.doctor_id === doctor_id &&
						new Date(app.start_date) < currentTimeEnd &&
						new Date(app.end_date) > currentTime,
				);

				if (!overlappingAppointment) {
					availableSlots.push({
						doctor_id,
						specialization_id,
						start_date: currentTime.toISOString(),
						end_date: currentTimeEnd.toISOString(),
					});

					if (availableSlots.length >= appointmentsLimit) {
						return availableSlots.sort(
							(a, b) =>
								new Date(a.start_date) - new Date(b.start_date),
						);
					}
				}

				currentTime = new Date(currentTime.getTime() + thirtyMinutes);
			}
		}
		daysSearched++;
	}

	return availableSlots.sort(
		(a, b) => new Date(a.start_date) - new Date(b.start_date),
	);
}
