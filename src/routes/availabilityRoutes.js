import express from 'express';
import {
	createAvailabilityHandler,
	getAllAvailabilityHandler,
	getAvailabilityByIdHandler,
	updateAvailabilityHandler,
	deleteAvailabilityHandler,
} from '../controllers/availabilityController.js';

const router = express.Router();

router.post('/', createAvailabilityHandler);
router.get('/', getAllAvailabilityHandler);
router.get('/:id', getAvailabilityByIdHandler);
router.put('/:id', updateAvailabilityHandler);
router.delete('/:id', deleteAvailabilityHandler);

export default router;
