import {
	getAllSpecializations,
	getSpecializationById,
	createSpecialization,
	updateSpecialization,
	deleteSpecialization,
} from '../models/specializationModel.js';

export async function handleGetAllSpecializations(req, res) {
	try {
		const specializations = await getAllSpecializations();
		res.status(200).json(specializations);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function handleGetSpecializationById(req, res) {
	const { id } = req.params;
	try {
		const specialization = await getSpecializationById(id);
		if (!specialization) {
			return res.status(404).json({ error: 'Specialization not found' });
		}
		res.status(200).json(specialization);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function handleCreateSpecialization(req, res) {
	const { name } = req.body;
	try {
		const newSpecialization = await createSpecialization(name);
		res.status(201).json(newSpecialization);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function handleUpdateSpecialization(req, res) {
	const { id } = req.params;
	const { name } = req.body;
	try {
		const updatedSpecialization = await updateSpecialization(id, name);
		if (!updatedSpecialization) {
			return res.status(404).json({ error: 'Specialization not found' });
		}
		res.status(200).json(updatedSpecialization);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function handleDeleteSpecialization(req, res) {
	const { id } = req.params;
	try {
		await deleteSpecialization(id);
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
