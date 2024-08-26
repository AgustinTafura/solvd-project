import {
	createAppointment,
	getAllAppointments,
	getAppointmentById,
	updateAppointment,
	deleteAppointment,
	findNearestAppointments,
	isTimeSlotAvailable,
} from '../models/appointmentsModel.js';

export async function createAppointmentHandler(req, res) {
	const { patient_id, doctor_id, start_date, end_date } = req.body;
	if (!patient_id || !doctor_id || !start_date || !end_date) {
		return res.status(400).json({ error: 'Missing required parameters' });
	}
	try {
		const available = await isTimeSlotAvailable(
			doctor_id,
			start_date,
			end_date,
		);
		if (!available) {
			return res
				.status(409)
				.json({ error: 'Time slot is not available for this doctor' });
		}
		const newAppointment = await createAppointment({
			patient_id,
			doctor_id,
			start_date,
			end_date,
		});
		res.status(201).json(newAppointment);
	} catch (error) {
		res.status(500).json({ error: 'Error creating appointment' });
	}
}

export async function getAllAppointmentsHandler(req, res) {
	try {
		const appointments = await getAllAppointments();
		res.status(200).json(appointments);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching appointments' });
	}
}

export async function getAppointmentByIdHandler(req, res) {
	const { id } = req.params;
	try {
		const appointment = await getAppointmentById(id);
		if (appointment) {
			res.status(200).json(appointment);
		} else {
			res.status(404).json({ error: 'Appointment not found' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Error fetching appointment' });
	}
}

export async function updateAppointmentHandler(req, res) {
	const { id } = req.params;
	const { patient_id, doctor_id, start_date, end_date } = req.body;
	if (!patient_id || !doctor_id || !start_date || !end_date) {
		return res.status(400).json({ error: 'Missing required parameters' });
	}
	try {
		const available = await isTimeSlotAvailable(
			doctor_id,
			start_date,
			end_date,
		);
		if (!available) {
			return res
				.status(409)
				.json({ error: 'Time slot is not available for this doctor' });
		}
		const updatedAppointment = await updateAppointment(id, {
			patient_id,
			doctor_id,
			start_date,
			end_date,
		});
		if (updatedAppointment) {
			res.status(200).json(updatedAppointment);
		} else {
			res.status(404).json({ error: 'Appointment not found' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Error updating appointment' });
	}
}

export async function deleteAppointmentHandler(req, res) {
	const { id } = req.params;
	try {
		const result = await deleteAppointment(id);
		if (result) {
			res.status(204).send();
		} else {
			res.status(404).json({ error: 'Appointment not found' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Error deleting appointment' });
	}
}

export async function findNearestAppointmentsHandler(req, res) {
	const { specialization_id, symptoms, limit } = req.query;
	const symptomsArray = symptoms ? symptoms.split(',').map(Number) : [];
	if (!specialization_id && !symptoms) {
		return res
			.status(400)
			.json({ error: 'Missing required specialization_id parameter' });
	}
	try {
		const appointment = await findNearestAppointments(
			specialization_id,
			symptomsArray,
			limit,
		);

		if (appointment) {
			res.status(200).json(appointment);
		} else {
			res.status(404).json({ error: 'No available appointments found' });
		}
	} catch (error) {
		res.status(500).json({
			error: 'Error finding the nearest appointment',
		});
	}
}
