import express from 'express';
import {
	handleGetAllSymptoms,
	handleGetSymptomById,
	handleCreateSymptom,
	handleUpdateSymptom,
	handleDeleteSymptom,
} from '../controllers/symptomController.js';

const router = express.Router();

router.get('/', handleGetAllSymptoms);
router.get('/:id', handleGetSymptomById);
router.post('/', handleCreateSymptom);
router.put('/:id', handleUpdateSymptom);
router.delete('/:id', handleDeleteSymptom);

export default router;
