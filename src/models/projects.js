
import pool from './db.js';

export const getAllProjects = async () => {
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
};
export const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            date
        FROM public.service_project
        WHERE organization_id = $1
        ORDER BY date;
    `;

    const queryParams = [organizationId];
    const result = await pool.query(query, queryParams);

    return result.rows;
};