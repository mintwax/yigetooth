/*jshint node: true */
/*jshint mocha: true */

'use strict';
var GoogleDrive = require('../../app/models/GoogleDrive');


describe('GoogleDrive Model', function() {

    it('should exist', function() {
        expect(GoogleDrive).to.exist;
    });


    describe('getFiles', function() {

        it('should exist', function() {
            expect(GoogleDrive.getFiles).to.exist;
        });
    });

    describe('getThumbnail', function() {

        it('should run', function() {
            var id = '0B6KNj708lb4ISUtGRDgwLUxKNUE';
            var width = 50;
            var height = 50;

            GoogleDrive.getThumbnail(id, width, height, function(contents) {
                console.log("contents: " + contents);
            });
        });

    });

});
