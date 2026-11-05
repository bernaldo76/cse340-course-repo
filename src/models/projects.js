import pool from './db.js';

export async function getAllProjects() {
    const sql = `
        SELECT 
            p.project_id,
            p.organization_id,
            p.title,
            p.description,
            p.location,
            p.date,
            o.name AS organization_name
        FROM public.service_project p
        INNER JOIN public.organization o
            ON p.organization_id = o.organization_id
        ORDER BY p.date;
    `;

    const result = await pool.query(sql);
    return result.rows;
}