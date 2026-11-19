
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

export const getUpcomingProjects = async (number_of_projects) => {
    const sql = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM public.service_project p
        INNER JOIN public.organization o
            ON p.organization_id = o.organization_id
        WHERE p.date >= CURRENT_DATE
        ORDER BY p.date ASC
        LIMIT $1;
    `;

    const result = await pool.query(sql, [number_of_projects]);
    return result.rows;
};

export const getProjectDetails = async (id) => {
    const sql = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM public.service_project p
        INNER JOIN public.organization o
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;

    const result = await pool.query(sql, [id]);
    return result.rows[0];
};

export const getProjectsByCategoryId = async (id) => {
    const sql = `
        SELECT
            p.project_id,
            p.title
        FROM public.service_project p
        INNER JOIN public.project_category pc
            ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.date;
    `;

    const result = await pool.query(sql, [id]);
    return result.rows;
};
export const createProject = async (title, description, location, date, organizationId) => {
    const query = `
        INSERT INTO public.service_project (title, description, location, date, organization_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await pool.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
};

export const updateProject = async (projectId, title, description, location, date, organizationId) => {
    const query = `
        UPDATE public.service_project
        SET title = $1, description = $2, location = $3, date = $4, organization_id = $5
        WHERE project_id = $6
        RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId, projectId];
    const result = await pool.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Project not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated project with ID:', projectId);
    }

    return result.rows[0].project_id;
};
