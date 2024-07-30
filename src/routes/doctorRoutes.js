import express from 'express';
import {
	getAllDoctorsHandler,
	getDoctorByIdHandler,
	createDoctorHandler,
	updateDoctorHandler,
	deleteDoctorHandler,
} from '../controllers/doctorController.js';

const router = express.Router();

router.get('/', getAllDoctorsHandler);
router.get('/:doctor_id', getDoctorByIdHandler);
router.post('/', createDoctorHandler);
router.put('/:doctor_id', updateDoctorHandler);
router.delete('/:doctor_id', deleteDoctorHandler);

export default router;
