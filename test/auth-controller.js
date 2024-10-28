const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../models/user');
const AuthController = require('../controllers/auth');

describe('Auth Controller - login', () => {
    it('should throw an error if accessing the database fails', (done) => {
        sinon.stub(User, 'findOne');
        User.findOne().throws();

        const req = {
            body: {
                email: 'test1@test.es',
                password: 'test1'
            }
        }

        AuthController.login(req, {}, () => {}).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            done();
        });
        User.findOne.restore();
    })
})