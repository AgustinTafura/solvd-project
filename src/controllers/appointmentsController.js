import {
	createAppointment,
	getAllAppointments,
	getAppointmentById,
	updateAppointment,
	deleteAppointment,
} from '../models/appointmentsModel.js';

export async function createAppointmentHandler(req, res) {
	const { patient_id, doctor_id, start_date, end_date } = req.body;
	try {
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
	try {
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
