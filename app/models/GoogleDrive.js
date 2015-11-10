/*jslint node: true */
'use strict';

var google = require('googleapis');
var auth = require('../middleware/auth.js');
var files;  // cache the files from backend

module.exports.getFiles = function(callback) {

    if (files) {
        console.log('Using cache');
        callback(null, files);
        return;
    }

    var service = google.drive('v2');
    service.files.list({
        auth: auth.token,
        q: 'mimeType contains "video" or mimeType contains "image"'
        // maxResults: 10,
    }, function(err, response) {

        if (err) {
            console.log('The API returned an error: ' + err);
            callback(err);
            return;
        }

        files = response.items;
        if (files.length === 0) {
            console.log('No files found.');
            callback(null, []);
            return;
        }

        callback(null, files);
        return;
    });
};

