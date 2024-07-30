import express from 'express';
import {
	handleGetAllSymptoms,
	handleGetSymptomById,
	handleCreateSymptom,
	handleUpdateSymptom,
	handleDeleteSymptom,
} from '../controllers/symptomController.js';

const router = express.Router();

router.get('/symptoms', handleGetAllSymptoms);
router.get('/symptoms/:id', handleGetSymptomById);
router.post('/symptoms', handleCreateSymptom);
router.put('/symptoms/:id', handleUpdateSymptom);
router.delete('/symptoms/:id', handleDeleteSymptom);

export default router;
