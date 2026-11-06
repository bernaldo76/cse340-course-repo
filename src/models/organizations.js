
import pool from './db.js';

export async function getAllOrganizations() {
    const sql = `
        SELECT *
        FROM public.organization
        ORDER BY organization_id;
    `;

    const result = await pool.query(sql);
    return result.rows;
}
