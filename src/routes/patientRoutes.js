import express from 'express';
import {
	getAllPatientsHandler,
	getPatientByIdHandler,
	createPatientHandler,
	updatePatientHandler,
	deletePatientHandler,
} from '../controllers/patientController.js';

const router = express.Router();

router.get('/patients', getAllPatientsHandler);
router.get('/patients/:patient_id', getPatientByIdHandler);
router.post('/patients', createPatientHandler);
router.put('/patients/:patient_id', updatePatientHandler);
router.delete('/patients/:patient_id', deletePatientHandler);

export default router;
