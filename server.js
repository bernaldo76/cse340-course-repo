import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import pool from './src/models/db.js';
import { getAllProjects } from './src/models/projects.js';

// Configure dotenv for environment variables (.env)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure absolute paths required by ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure EJS template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files (CSS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES (All using arrow notation functions as required)
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/organizations', (req, res) => {
    res.render('organizations', { title: 'Organizations' });
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
// Required route for Categories page
app.get('/categories', (req, res) => {
    const categoriesList = [
        'Environmental',
        'Educational',
        'Community Service',
        'Health and Wellness'
    ];
    res.render('categories', { 
        title: 'Service Project Categories', 
        categories: categoriesList 
    });
});
pool.query('SELECT NOW()')
    .then(result => {
        console.log('Database connection successful:', result.rows[0]);
    })
    .catch(error => {
        console.error('Database connection error:', error);
    });
// Start local server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
