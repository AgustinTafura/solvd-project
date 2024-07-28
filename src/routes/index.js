import express from 'express';
import authRoutes from './authRoutes.js';

const router = express.Router();

/* Routes */
router.get('/', (req, res) => res.json('App running'));
router.use('/api/v1', authRoutes);

export default router;
