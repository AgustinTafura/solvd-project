import { pool } from './src/db.js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.DB_NAME;
const schemaPath = path.join(process.cwd(), 'hospital_appointment_schema.sql');
const schemaSQL = fs.readFileSync(schemaPath, 'utf-8');

const createDatabaseAndSchema = async () => {
	try {
		const client = await pool.connect();

		const dbCheckResult = await client.query(
			`SELECT 1 FROM pg_database WHERE datname = $1`,
			[dbName],
		);

		if (dbCheckResult.rowCount === 0) {
			await client.query(`CREATE DATABASE ${dbName}`);
			console.log(`Database ${dbName} created successfully.`);
		} else {
			console.log(`Database ${dbName} already exists.`);
		}

		client.release();

		const dbPool = new Pool({
			user: process.env.DB_USER,
			host: process.env.DB_HOST,
			database: dbName,
			password: process.env.DB_PASSWORD,
			port: process.env.DB_PORT || 5432,
		});

		const dbClient = await dbPool.connect();

		const createTableIfNotExists = async (query) => {
			const tableName = query.match(/CREATE TABLE (\w+)/)[1];
			const tableCheckResult = await dbClient.query(
				`
                SELECT 1 FROM information_schema.tables 
                WHERE table_schema = 'public' AND table_name = $1
            `,
				[tableName],
			);

			if (tableCheckResult.rowCount === 0) {
				await dbClient.query(query);
				console.log(`Table ${tableName} created successfully.`);
			} else {
				console.log(`Table ${tableName} already exists.`);
			}
		};

		const schemaStatements = schemaSQL.split(/;\s*$/m);
		for (const statement of schemaStatements) {
			if (statement.trim()) {
				await createTableIfNotExists(statement);
			}
		}

		dbClient.release();
	} catch (err) {
		console.error('Error setting up the database:', err.stack);
	} finally {
		pool.end();
		process.exit();
	}
};

createDatabaseAndSchema();
