const express = require('express');

const Actions = require('../data/helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get().then(response => res.status(200).json(response))
    .catch(error => res.status(500).json({ errorMessage: "Problem accessing database"}))
})

router.get('/:id', validateActionsId, (req, res) => {
    Actions.get(req.params.id).then(response => res.status(200).json(response))
    .catch(error => res.status(500).json({ errorMessage: "Problem accessing database"}))
})

router.delete('/:id', validateActionsId, (req, res) => {
    Actions.remove(req.params.id).then(response => res.status(204).json(response))
    .catch(error => res.status(500).json({ errorMessage: "Problem accessing database"}))
})

router.put('/:id', validateActionsId, (req, res) => {
    Actions.update(req.params.id, req.body).then(response => res.status(201).json(response))
    .catch(error => res.status(500).json({ errorMessage: "Problem accessing database"}))
})

function validateActionsId(req, res, next) {
    Actions.get(req.params.id).then(response => {
        if (response) next();
        else res.status(404).json({ errorMessage: `Action with id ${req.params.id} not found`})
    })
}

module.exports = router;