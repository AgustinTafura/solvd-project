import { verifyJWT } from '../jwt.js';
import dotenv from 'dotenv';
dotenv.config();

export function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) return res.sendStatus(401);
	try {
		const decoded = verifyJWT(token, process.env.JWT_SECRET);
		req.user = decoded.payload;
		next();
	} catch (err) {
		res.sendStatus(403);
	}
}
