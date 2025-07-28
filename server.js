const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'docs', 'about.html')));
app.get('/education', (req, res) => res.sendFile(path.join(__dirname, 'docs', 'education.html')));
app.get('/experience', (req, res) => res.sendFile(path.join(__dirname, 'docs', 'experience.html')));
app.get('/projects', (req, res) => res.sendFile(path.join(__dirname, 'docs', 'projects.html')));
app.get('/skills', (req, res) => res.sendFile(path.join(__dirname, 'docs', 'skills.html')));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
