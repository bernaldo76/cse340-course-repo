
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import pool from './src/models/db.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllCategories } from './src/models/categories.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/organizations', async (req, res) => {
    try {
        const organizations = await getAllOrganizations();
        res.render('organizations', {
            title: 'Organizations',
            organizations: organizations
        });
    } catch (error) {
        console.error('Error loading organizations:', error);
        res.status(500).send('Error loading organizations');
    }
});

app.get('/projects', async (req, res) => {
    try {
        const projects = await getAllProjects();
        console.log('Service projects:', projects);
        res.render('projects', {
            title: 'Service Projects',
            projects: projects
        });
    } catch (error) {
        console.error('Error loading projects:', error);
        res.status(500).send('Error loading projects');
    }
});

app.get('/categories', async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.render('categories', {
            title: 'Service Project Categories',
            categories: categories
        });
    } catch (error) {
        console.error('Error loading categories:', error);
        res.status(500).send('Error loading categories');
    }
});

pool.query('SELECT NOW()')
    .then(result => {
        console.log('Database connection successful:', result.rows[0]);
    })
    .catch(error => {
        console.error('Database connection error:', error);
    });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
