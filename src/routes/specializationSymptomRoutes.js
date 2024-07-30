import express from 'express';
import {
	handleGetAllSpecializationSymptoms,
	handleGetSpecializationSymptomById,
	handleCreateSpecializationSymptom,
	handleUpdateSpecializationSymptom,
	handleDeleteSpecializationSymptom,
} from '../controllers/specializationSymptomController.js';

const router = express.Router();

router.get('/', handleGetAllSpecializationSymptoms);
router.get('/:id', handleGetSpecializationSymptomById);
router.post('/', handleCreateSpecializationSymptom);
router.put('/:id', handleUpdateSpecializationSymptom);
router.delete('/:id', handleDeleteSpecializationSymptom);

export default router;
