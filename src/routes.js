const express = require('express')

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.send('Hello World')
});

routes.post('/devs', (request, response) => {
    return response.json(request.body)
});

module.exports = routes;