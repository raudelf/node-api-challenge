const express = require('express');

// Hub Imports
const projectHub = require('./hubs/projectsHub');

const server = express();

server.use(express.json());

// Routers
server.use('/api/projects', projectHub);

// Landing Page Endpoint
server.get('/', (req, res) => {
    res.send(`
    <h2>Node API Sprint Challenge!</h2>
    <p>Welcome to my server API</p>
    `);
});

module.exports = server;