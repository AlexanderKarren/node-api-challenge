const express = require('express');

const Projects = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get().then(response => res.status(200).json(response))
    .catch(error => res.status(500).json({ errorMessage: "Problem accessing database"}))
})

router.get('/:id', validateUserId, (req, res) => {
    Projects.get(req.params.id).then(response => res.status(200).json(response))
    .catch(error => res.status(500).json({ errorMessage: "Problem accessing database"}))
})

router.get('/:id/actions', validateUserId, (req, res) => {
    Projects.getProjectActions(req.params.id).then(response => res.status(200).json(response))
    .catch(error => res.status(500).json({ errorMessage: "Problem accessing database"}))
})

router.post('/', validateProperties, (req, res) => {
    Projects.insert(req.body).then(response => res.status(201).json(response))
    .catch(error => res.status(500).json({ errorMessage: "Problem accessing database"}))
})

router.delete('/:id', validateUserId, (req, res) => {
    Projects.remove(req.params.id).then(response => res.status(204).json(response))
    .catch(error => res.status(500).json({ errorMessage: "Problem accessing database"}))
})

// router.put('/:id', validateUserId, (req, res) => {
//     console.log(req.body);
//     Projects.update(req.body).then(response => res.status(201).json(response))
//     .catch(error => res.status(500).json({ errorMessage: "Problem accessing database"}))
// })

function validateUserId(req, res, next) {
    Projects.get(req.params.id).then(response => {
        if (response) next();
        else res.status(404).json({ errorMessage: `Project with id ${req.params.id} not found`})
    })
}

function validateProperties(req, res, next) {
    if (req.body.hasOwnProperty("name") && req.body.hasOwnProperty("description")) next();
    else res.status(400).json({ errorMessage: `Properties 'name' and 'description' required`})
}

module.exports = router;