
import pool from './db.js';

export async function getAllCategories() {
    const sql = `
        SELECT name
        FROM public.category
        ORDER BY category_id;
    `;

    const result = await pool.query(sql);
    return result.rows.map(category => category.name);
}
