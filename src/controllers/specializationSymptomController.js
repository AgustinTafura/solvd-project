import {
	getAllSpecializationSymptoms,
	getSpecializationSymptomById,
	createSpecializationSymptom,
	updateSpecializationSymptom,
	deleteSpecializationSymptom,
} from '../models/specializationSymptomModel.js';

export async function handleGetAllSpecializationSymptoms(req, res) {
	try {
		const specializationSymptoms = await getAllSpecializationSymptoms();
		res.status(200).json(specializationSymptoms);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function handleGetSpecializationSymptomById(req, res) {
	const { id } = req.params;
	try {
		const specializationSymptom = await getSpecializationSymptomById(id);
		if (!specializationSymptom) {
			return res
				.status(404)
				.json({ error: 'SpecializationSymptom not found' });
		}
		res.status(200).json(specializationSymptom);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function handleCreateSpecializationSymptom(req, res) {
	const { specialization_id, symptom_id } = req.body;
	try {
		const newSpecializationSymptom = await createSpecializationSymptom(
			specialization_id,
			symptom_id,
		);
		res.status(201).json(newSpecializationSymptom);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function handleUpdateSpecializationSymptom(req, res) {
	const { id } = req.params;
	const { specialization_id, symptom_id } = req.body;
	try {
		const updatedSpecializationSymptom = await updateSpecializationSymptom(
			id,
			specialization_id,
			symptom_id,
		);
		if (!updatedSpecializationSymptom) {
			return res
				.status(404)
				.json({ error: 'SpecializationSymptom not found' });
		}
		res.status(200).json(updatedSpecializationSymptom);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function handleDeleteSpecializationSymptom(req, res) {
	const { id } = req.params;
	try {
		await deleteSpecializationSymptom(id);
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
