const express = require('express');

const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get().then(response => res.status(200).json(response))
    .catch(error => res.status(500).json({ errorMessage: "Problem accessing database"}))
})

router.get('/:id', validateProjectId, (req, res) => {
    Projects.get(req.params.id).then(response => res.status(200).json(response))
    .catch(error => res.status(500).json({ errorMessage: "Problem accessing database"}))
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id).then(response => res.status(200).json(response))
    .catch(error => res.status(500).json({ errorMessage: "Problem accessing database"}))
})

router.post('/', validateProperties, (req, res) => {
    Projects.insert(req.body).then(response => res.status(201).json(response))
    .catch(error => res.status(500).json({ errorMessage: "Problem accessing database"}))
})

router.post('/:id', validateProjectId, validateActionProps, (req, res) => {
    Actions.insert({
        project_id: parseInt(req.params.id),
        ...req.body
    }).then(response => res.status(201).json(response))
    .catch(error => res.status(500).json({ errorMessage: "Problem accessing database"}))
})

router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id).then(response => res.status(204).json(response))
    .catch(error => res.status(500).json({ errorMessage: "Problem accessing database"}))
})

router.put('/:id', validateProjectId, (req, res) => {
    console.log(req.body);
    Projects.update(req.params.id, req.body).then(response => res.status(201).json(response))
    .catch(error => res.status(500).json({ errorMessage: "Problem accessing database"}))
})

function validateProjectId(req, res, next) {
    Projects.get(req.params.id).then(response => {
        if (response) next();
        else res.status(404).json({ errorMessage: `Project with id ${req.params.id} not found`})
    })
}

function validateProperties(req, res, next) {
    if (req.body.hasOwnProperty("name") && req.body.hasOwnProperty("description")) next();
    else res.status(400).json({ errorMessage: `Properties 'name' and 'description' required`})
}

function validateActionProps(req, res, next) {
    if (req.body.hasOwnProperty("notes") && req.body.hasOwnProperty("description")) {
        if (req.body.description.length <= 128) next();
    }
    else res.status(400).json({ errorMessage: `Properties 'notes' and 'description' required`})
}

module.exports = router;