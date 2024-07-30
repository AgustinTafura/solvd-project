import express from 'express';
import {
	getAllPatientsHandler,
	getPatientByIdHandler,
	createPatientHandler,
	updatePatientHandler,
	deletePatientHandler,
} from '../controllers/patientController.js';

const router = express.Router();

router.get('/', getAllPatientsHandler);
router.get('/:patient_id', getPatientByIdHandler);
router.post('/', createPatientHandler);
router.put('/:patient_id', updatePatientHandler);
router.delete('/:patient_id', deletePatientHandler);

export default router;
