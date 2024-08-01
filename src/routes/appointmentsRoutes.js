import express from 'express';
import {
	createAppointmentHandler,
	getAllAppointmentsHandler,
	getAppointmentByIdHandler,
	updateAppointmentHandler,
	deleteAppointmentHandler,
	findNearestAppointmentsHandler,
} from '../controllers/appointmentsController.js';

const router = express.Router();

router.post('/', createAppointmentHandler);
router.get('/find', findNearestAppointmentsHandler);
router.get('/', getAllAppointmentsHandler);
router.get('/:id', getAppointmentByIdHandler);
router.put('/:id', updateAppointmentHandler);
router.delete('/:id', deleteAppointmentHandler);

export default router;
