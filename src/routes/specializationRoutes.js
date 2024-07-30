import express from 'express';
import {
	handleGetAllSpecializations,
	handleGetSpecializationById,
	handleCreateSpecialization,
	handleUpdateSpecialization,
	handleDeleteSpecialization,
} from '../controllers/specializationController.js';

const router = express.Router();

router.get('/specializations', handleGetAllSpecializations);
router.get('/specializations/:id', handleGetSpecializationById);
router.post('/specializations', handleCreateSpecialization);
router.put('/specializations/:id', handleUpdateSpecialization);
router.delete('/specializations/:id', handleDeleteSpecialization);

export default router;
