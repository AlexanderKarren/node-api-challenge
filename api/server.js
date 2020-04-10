const express = require('express');
const cors = require('cors');

const actionRouter = require('./actionRouter');
const projectRouter = require('./projectRouter');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
    res.send(`
        <h1>"I'm in"</h1>
    `);
})

module.exports = server;