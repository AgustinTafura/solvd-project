import express from 'express';
import authRoutes from './authRoutes.js';
import patientRoutes from './patientRoutes.js';
import doctorRoutes from './doctorRoutes.js';
import specializationRoutes from './specializationRoutes.js';
import symptomRoutes from './symptomRoutes.js';
import specializationSymptomRoutes from './specializationSymptomRoutes.js';
import availabilityRoutes from './availabilityRoutes.js';

import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

/* Routes */
router.get('/', (req, res) => res.json('App running'));
router.use('/api/v1', authRoutes);
router.use('/api/v1/patients', authenticateToken, patientRoutes);
router.use('/api/v1/doctors', authenticateToken, doctorRoutes);
router.use('/api/v1/specializations', authenticateToken, specializationRoutes);
router.use('/api/v1/symptoms', authenticateToken, symptomRoutes);
router.use('/api/v1/specialization_symptoms', authenticateToken, specializationSymptomRoutes);
router.use('/api/v1/availability', authenticateToken, availabilityRoutes);

export default router;
