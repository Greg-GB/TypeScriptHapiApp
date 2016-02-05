'use strict';

import Hapi = require('hapi');
import routes = require('./routes');

class User {
    private server:Hapi.Server;
    private userRoutes = routes;
    
    constructor(server:Hapi.Server) {
        this.server = server;
    }
    
    public routes():void {
        return this.userRoutes(this.server);
    }
    
}

export = User;