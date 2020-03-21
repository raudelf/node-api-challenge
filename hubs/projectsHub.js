const express = require('express');
const Hubs = require('../data/helpers/projectModel');

const router = express.Router();


// GET Requests
router.get('/:id', (req, res) => {
    const id = req.params.id;

    Hubs.get(id)
        .then(projects => {
            if (projects) {
                console.log('Fetched Data: ', projects);
                res.status(200).json(projects);
            } else {
                res.status(404).json({errorMessage: 'Project does not exist'})
            }
        })
        .catch(err => {
            console.log('Projects could not be retrieved...');
            res.status(500).json({ error: 'Projects could not be retrieved...'});
        });
});


// POST Requests
router.post('/', (req, res) => {
    const body = req.body;

    Hubs.insert(body)
        .then(obj => {
            console.log('New ProjectL ', obj);
            res.status(201).json(obj);
        })
        .catch(err => {
            if(!err.name || !err.description) {
                res.status(400).json({ errorMessage: 'Please provide a name and description for the post.'})
            } else {
                console.log('There was an error while saving the post to the server.');
                res.status(500).json({ error: 'There was an error while saving the post.'});
            };
        });
});

module.exports = router;