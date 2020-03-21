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


router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    Hubs.update(id, body)
        .then((updated) => {
            if (updated) {
                if (body.project_id && body.description && body.notes) {
                    res.status(200).json(body);
                } else {
                    res.status(400).json({ errorMessage: 'Please provide a project_id of an existing project, a description, and notes for the update.'});
                };
            } else {
                res.status(404).json({message: 'Action does not exist'});
            };
        })
        .catch(err => {
            console.log('There was an issue updating the action to server.');
            res.status(500).json({error: 'There was an issue updating the action to server.'});
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
                res.status(404).json({ errorMessage: 'The action with the specified ID does not exist.'})
            };
        })
        .catch(err => {
            console.log('The action could not be removed.');
            res.status(500).json({ error: 'The action could not be removed.'});
        });
});


module.exports = router;