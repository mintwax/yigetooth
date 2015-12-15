/*jshint node: true */
/*jshint mocha: true */

'use strict';

var proxyquire = require('proxyquire'),
    googleDriveStub = {},
    gdfiles = proxyquire('../../controllers/gdfiles', {
        '../app/models/GoogleDrive' : googleDriveStub
    });

var res = {},
    req = {};

describe('GDFiles Controller', function() {
    beforeEach(function() {
        res = {
            json: sinon.spy()
        };
        req = {
        };
        googleDriveStub.getFiles = function(callback) {
            callback(null, []);
        };
        googleDriveStub.getThumbnail = function(id, width, height, callback) {
            callback(null, req.body);
        };
    });

    it('should exist', function() {
        expect(gdfiles).to.exist;
    });

    describe('index', function() {
        it('should be defined', function() {
            expect(gdfiles.index).to.be.a('function');
        });

        it('should send json', function() {
            gdfiles.index(req, res);
            expect(res.json).calledOnce;
        });
    });

    describe('thumbnail', function() {
        beforeEach(function() {
            req.params = {
                id: 'testid',
                width: 834,
                height: 835
            };
        });

        it('should be defined', function() {
            expect(gdfiles.thumbnail).to.be.a('function');
        });

        it('should send json on successful retrieve', function() {
            gdfiles.thumbnail(req, res);
            expect(res.json).calledOnce;
        });

        it('should send json error on error', function() {
            googleDriveStub.getThumbnail = function(id, width, height, callback) {
                callback(null, {error: 'Thumbnail not found.'});
            };

            gdfiles.thumbnail(req, res);
            expect(res.json).calledWith({error: 'Thumbnail not found.'});
        });
    });

});
