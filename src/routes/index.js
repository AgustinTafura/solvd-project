import express from 'express';
import authRoutes from './authRoutes.js';
import patientRoutes from './patientRoutes.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

/* Routes */
router.get('/', (req, res) => res.json('App running'));
router.use('/api/v1', authRoutes);
router.use('/api/v1',authenticateToken, patientRoutes);

export default router;
