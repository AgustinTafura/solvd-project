import express from 'express';
import {
	handleGetAllSpecializations,
	handleGetSpecializationById,
	handleCreateSpecialization,
	handleUpdateSpecialization,
	handleDeleteSpecialization,
} from '../controllers/specializationController.js';

const router = express.Router();

router.get('/', handleGetAllSpecializations);
router.get('/:id', handleGetSpecializationById);
router.post('/', handleCreateSpecialization);
router.put('/:id', handleUpdateSpecialization);
router.delete('/:id', handleDeleteSpecialization);

export default router;
