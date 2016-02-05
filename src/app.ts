/// <reference path="../typings/tsd.d.ts" />

'use strict';

// Dependencies
import Hapi = require('hapi');
import Good = require('good'); // No typings
import Promise = require('bluebird');
import User = require('./user');
import Config = require('../config');

class HapiApp {
    private server:Hapi.Server;
    private user:User;
    private config:Config;
    
    constructor(config?:Config) {
        this.config = config || Config;
        this.server = new Hapi.Server();
        this.server.connection(this.config.app);
        
        // Register plugins
        this.registerPlugins();
        
        // Instantiate User
        this.user = new User(this.server);
        
        // Load Routes
        this.loadRoutes();
    }
    
    // Start Hapi App
    public start() {
        return new Promise((resolve, reject) => {
            this.server.start((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log('Hapi Server started');
                resolve(null);
            });
        }); 
    }
    
    // Stop Hapi App
    public stop(timeout?:number) {
        timeout = timeout || 500;
        return new Promise((resolve, reject) => {
            this.server.stop({timeout:timeout}, () => {
                console.log('Hapi Server stopped')
                return resolve(null);
            });
        });
    }
    
    private loadRoutes() {
        this.user.routes();
    }
    
    public getUser() {
        return this.user;
    }
    
    private registerPlugins() {
        if(!this.config.test) {
            this.server.register({
                register: Good,
                options: {
                    reporters: [{
                        reporter: require('good-console'),
                        events: {
                            response: '*',
                            log: '*'
                        }
                    }]
                }
            }, (err) => {
                if (err) {
                    throw err;
                }
            });
        }
    }
}

export = HapiApp;