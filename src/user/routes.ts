'use strict';

import Hapi = require('hapi');

const routes = (server:Hapi.Server) => {
    server.route({
        method: 'GET',
        path: '/user',
        handler: (request, reply) => {
            reply({message: 'Hello, User!'});
        }
    });
}

export = routes;