import bcrypt from 'bcrypt';
import { createJWT } from '../jwt.js';
import { findUserByEmail, createUser } from '../models/userModel.js';

const secret = process.env.JWT_SECRET;
export async function register(req, res) {
	const { email, name, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const user = await createUser(email, name, hashedPassword);
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

export async function login(req, res) {
	const { email, password } = req.body;

	try {
		const user = await findUserByEmail(email);

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ error: 'Invalid email or password' });
		}

		const payload = { id: user.id, name: user.name, email: user.email };
		const token = createJWT({ alg: 'HS256', typ: 'JWT' }, payload, secret);

		res.json({ token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
