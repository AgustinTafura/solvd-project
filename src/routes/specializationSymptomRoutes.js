import express from 'express';
import {
	handleGetAllSpecializationSymptoms,
	handleGetSpecializationSymptomById,
	handleCreateSpecializationSymptom,
	handleUpdateSpecializationSymptom,
	handleDeleteSpecializationSymptom,
} from '../controllers/specializationSymptomController.js';

const router = express.Router();

router.get('/specialization_symptoms', handleGetAllSpecializationSymptoms);
router.get('/specialization_symptoms/:id', handleGetSpecializationSymptomById);
router.post('/specialization_symptoms', handleCreateSpecializationSymptom);
router.put('/specialization_symptoms/:id', handleUpdateSpecializationSymptom);
router.delete(
	'/specialization_symptoms/:id',
	handleDeleteSpecializationSymptom,
);

export default router;
