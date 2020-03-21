const express = require('express');
const Hubs = require('../data/helpers/projectModel');

const router = express.Router();


// GET Request
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


// POST Request
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


// PUT Request
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    Hubs.update(id, body)
        .then((updated) => {
            if (updated) {
                if (body.name && body.description) {
                    res.status(200).json(body);
                } else {
                    res.status(400).json({ errorMessage: 'Please provide a name and description for the post.'});
                };
            } else {
                res.status(404).json({message: 'Project does not exist'});
            };
        })
        .catch(err => {
            console.log('There was an issue updating project to server.');
            res.status(500).json({error: 'There was an issue updating project to server.'});
        });
});


// DELETE Request
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Hubs.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(200).json(deleted).end();
            } else {
                res.status(404).json({ errorMessage: 'The project with the specified ID does not exist.'})
            };
        })
        .catch(err => {
            console.log('The post could not be removed.');
            res.status(500).json({ error: 'The post could not be removed.'});
        });
});

module.exports = router;