import express from 'express';
import {
	getAllDoctorsHandler,
	getDoctorByIdHandler,
	createDoctorHandler,
	updateDoctorHandler,
	deleteDoctorHandler,
} from '../controllers/doctorController.js';

const router = express.Router();

router.get('/doctors', getAllDoctorsHandler);
router.get('/doctors/:doctor_id', getDoctorByIdHandler);
router.post('/doctors', createDoctorHandler);
router.put('/doctors/:doctor_id', updateDoctorHandler);
router.delete('/doctors/:doctor_id', deleteDoctorHandler);

export default router;
