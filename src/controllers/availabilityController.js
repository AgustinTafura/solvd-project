import {
	createAvailability,
	getAllAvailability,
	getAvailabilityById,
	updateAvailability,
	deleteAvailability,
} from '../models/availabilityModel.js';

export async function createAvailabilityHandler(req, res) {
	const { doctor_id, day_of_week, start_time, end_time } = req.body;
	try {
		const newAvailability = await createAvailability(
			doctor_id,
			day_of_week,
			start_time,
			end_time,
		);
		res.status(201).json(newAvailability);
	} catch (error) {
		res.status(500).json({ error: 'Error creating availability record' });
	}
}

export async function getAllAvailabilityHandler(req, res) {
	try {
		const availabilities = await getAllAvailability();
		res.status(200).json(availabilities);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching availability records' });
	}
}

export async function getAvailabilityByIdHandler(req, res) {
	const { id } = req.params;
	try {
		const availability = await getAvailabilityById(id);
		if (availability) {
			res.status(200).json(availability);
		} else {
			res.status(404).json({ error: 'Availability record not found' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Error fetching availability record' });
	}
}

export async function updateAvailabilityHandler(req, res) {
	const { id } = req.params;
	const { doctor_id, day_of_week, start_time, end_time } = req.body;

	const updates = {};
	if (doctor_id !== undefined) updates.doctor_id = doctor_id;
	if (day_of_week !== undefined) updates.day_of_week = day_of_week;
	if (start_time !== undefined) updates.start_time = start_time;
	if (end_time !== undefined) updates.end_time = end_time;

	try {
		const updatedAvailability = await updateAvailability(id, updates);
		if (updatedAvailability) {
			res.status(200).json(updatedAvailability);
		} else {
			res.status(404).json({ error: 'Availability record not found' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Error updating availability record' });
	}
}

export async function deleteAvailabilityHandler(req, res) {
	const { id } = req.params;
	try {
		await deleteAvailability(id);
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: 'Error deleting availability record' });
	}
}
