import pkg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: "postgres",
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

const dbName = process.env.DB_NAME;
const schemaPath = path.join(process.cwd(), 'hospital_appointment_schema.sql');
const schemaSQL = fs.readFileSync(schemaPath, 'utf-8');

const createDatabaseAndSchema = async () => {
    try {
        const client = await pool.connect();

        const dbCheckResult = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);

        if (dbCheckResult.rowCount === 0) {
            await client.query(`CREATE DATABASE ${dbName}`);
            console.log(`Database ${dbName} created successfully.`);
        } else {
            const msgErr = `Database ${dbName} already exists.`
            console.log(msgErr);
            throw Error(msgErr)
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

        await dbClient.query(schemaSQL);
        console.log('Database schema applied successfully.');

        dbClient.release();
    } catch (err) {
        console.error('Error setting up the database:', err.stack);
    } finally {
        pool.end();
        process.exit()
    }
};

createDatabaseAndSchema();
