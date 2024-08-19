import express from 'express';
import dotenv from 'dotenv';
import indexRouter from './routes/index.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

//Routes
app.use('/', indexRouter);

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});
}

export default app;
