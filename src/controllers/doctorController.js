import {
	getAllDoctors,
	getDoctorById,
	createDoctor,
	updateDoctor,
	deleteDoctor,
} from '../models/doctorModel.js';

export const getAllDoctorsHandler = async (req, res) => {
	try {
		const doctors = await getAllDoctors();
		res.json(doctors);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const getDoctorByIdHandler = async (req, res) => {
	const { doctor_id } = req.params;
	try {
		const doctor = await getDoctorById(doctor_id);
		if (doctor) {
			res.json(doctor);
		} else {
			res.status(404).json({ error: 'Doctor not found' });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const createDoctorHandler = async (req, res) => {
	const { name, specialization_id } = req.body;
	try {
		const newDoctor = await createDoctor(name, specialization_id);
		res.status(201).json(newDoctor);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const updateDoctorHandler = async (req, res) => {
	const { doctor_id } = req.params;
	const updates = req.body;
	try {
		const updatedDoctor = await updateDoctor(doctor_id, updates);
		res.json(updatedDoctor);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export const deleteDoctorHandler = async (req, res) => {
	const { doctor_id } = req.params;
	try {
		await deleteDoctor(doctor_id);
		res.status(204).send();
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
