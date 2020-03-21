const express = require('express');

const server = express();

server.use(express.json());

// Landing Page Endpoint
server.get('/', (req, res) => {
    res.send(`
    <h2>Node API Sprint Challenge!</h2>
    <p>Welcome to my server API</p>
    `);
});

module.exports = server;