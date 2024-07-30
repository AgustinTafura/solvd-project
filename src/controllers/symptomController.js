import {
	getAllSymptoms,
	getSymptomById,
	createSymptom,
	updateSymptom,
	deleteSymptom,
} from '../models/symptomModel.js';

export async function handleGetAllSymptoms(req, res) {
	try {
		const symptoms = await getAllSymptoms();
		res.status(200).json(symptoms);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function handleGetSymptomById(req, res) {
	const { id } = req.params;
	try {
		const symptom = await getSymptomById(id);
		if (!symptom) {
			return res.status(404).json({ error: 'Symptom not found' });
		}
		res.status(200).json(symptom);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function handleCreateSymptom(req, res) {
	const { name } = req.body;
	try {
		const newSymptom = await createSymptom(name);
		res.status(201).json(newSymptom);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function handleUpdateSymptom(req, res) {
	const { id } = req.params;
	const { name } = req.body;
	try {
		const updatedSymptom = await updateSymptom(id, name);
		if (!updatedSymptom) {
			return res.status(404).json({ error: 'Symptom not found' });
		}
		res.status(200).json(updatedSymptom);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function handleDeleteSymptom(req, res) {
	const { id } = req.params;
	try {
		await deleteSymptom(id);
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
