import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

export async function testConnection() {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Database connection successful:', result.rows[0]);
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

export default pool;