import {
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
} from '../models/patientModel.js';

export async function getAllPatientsHandler(req, res) {
    try {
        const patients = await getAllPatients();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getPatientByIdHandler(req, res) {
    try {
        const patient = await getPatientById(req.params.patient_id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function createPatientHandler(req, res) {
    try {
        const { name, email, phone } = req.body;
        const newPatient = await createPatient(name, email, phone);
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function updatePatientHandler(req, res) {
    const { patient_id } = req.params;
    const updates = req.body;

    try {
        const updatedPatient = await updatePatient(patient_id, updates);
        res.json(updatedPatient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deletePatientHandler(req, res) {
    try {
        await deletePatient(req.params.patient_id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
