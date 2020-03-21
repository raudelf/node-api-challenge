const express = require('express');
const Hubs = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    Hubs.get(req.query)
        .then(projects => {
            console.log('Fetched Data: ', projects);
            res.status(200).json(hubs);
        })
        .catch(err => {
            console.log('Projects could not be retrieved...');
            res.status(500).json({ error: 'Projects could not be retrieved...'});
        });
});