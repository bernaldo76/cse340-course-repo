import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

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

app.get('/projects', (req, res) => {
    res.render('projects', { title: 'Service Projects' });
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

// Start local server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
