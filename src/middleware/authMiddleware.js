import { verifyJWT } from '../jwt.js';
import dotenv from 'dotenv';
dotenv.config();

export function authenticateToken(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ error: 'Missing or invalid token' });
	}

	const token = authHeader.split(' ')[1];

	try {
		const decoded = verifyJWT(token, process.env.JWT_SECRET);
		req.user = decoded.payload;
		next();
	} catch (err) {
		res.status(401).json({ error: 'Invalid token' });
	}
}
