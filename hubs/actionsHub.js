const express = require('express');
const Hubs = require('../data/helpers/actionModel');

const router = express.Router();


// GET Request
router.get('/:id', (req, res) => {
    const id = req.params.id;

    Hubs.get(id)
        .then(actions => {
            if (actions) {
                console.log('Fetched Action: ', actions);
                res.status(200).json(actions);
            } else {
                res.status(404).json({errorMessage: 'Action does not exist'})
            }
        })
        .catch(err => {
            console.log('Projects could not be retrieved...');
            res.status(500).json({ error: 'Projects could not be retrieved...'});
        });
});


// POST Request
router.post('/', (req, res) => {
    const body = req.body;

    Hubs.insert(body)
        .then(obj => {
            console.log('New Action ', obj);
            res.status(201).json(obj);
        })
        .catch(err => {
            if(!err.project_id || !err.description || !err.notes) {
                res.status(400).json({ errorMessage: 'Please provide a project_id of an existing project, a description, and notes for the post.'})
            } else {
                console.log('There was an error while saving the post to the server.');
                res.status(500).json({ error: 'There was an error while saving the post.'});
            };
        });
});

module.exports = router;