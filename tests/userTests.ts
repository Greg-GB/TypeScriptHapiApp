import request = require('request-promise');
import HapiApp = require('../src/app');
const should = require('should');

describe('user tests', () => {
    const rp = request.defaults({ json: true });
    const app = new HapiApp({app: {port: 3000}, test: true})
    
    before(() => {
        return app.start();
    });
    
    after(() => {
        return app.stop();
    });
    
    it('should get user', () => {
        return rp.get('http://localhost:3000/user')
            .then((res) => {
                res.should.have.property('message', 'Hello, User!')
            });
    });
});