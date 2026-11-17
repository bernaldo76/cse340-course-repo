
import pool from './db.js';

export const getAllCategories = async () => {
    const sql = `
        SELECT category_id, name
        FROM public.category
        ORDER BY category_id;
    `;

    const result = await pool.query(sql);
    return result.rows;
};

export const getCategoryById = async (id) => {
    const sql = `
        SELECT category_id, name
        FROM public.category
        WHERE category_id = $1;
    `;

    const result = await pool.query(sql, [id]);
    return result.rows[0];
};

export const getCategoriesByProjectId = async (id) => {
    const sql = `
        SELECT c.category_id, c.name
        FROM public.category c
        INNER JOIN public.project_category pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.category_id;
    `;

    const result = await pool.query(sql, [id]);
    return result.rows;
};

const assignCategoryToProject = async (projectId, categoryId) => {
    const query = `
        INSERT INTO public.project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await pool.query(query, [categoryId, projectId]);
};

export const updateCategoryAssignments = async (projectId, categoryIds) => {
    const deleteQuery = `
        DELETE FROM public.project_category
        WHERE project_id = $1;
    `;

    await pool.query(deleteQuery, [projectId]);

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId);
    }
};
