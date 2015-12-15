/*jslint node: true */
'use strict';

var google = require('googleapis');
var googleAuth = require('../auth/google_auth');
var files;  // cache the files from backend
var request = require('request');
require('request').debug = true;

module.exports = {

    getFiles: function(callback) {

        /*
         * cache the files in memory for now
         * TODO - put into DB and memcached
         */
        /*if (files) {
            console.log('Using cache');
            callback(null, files);
            return;
        }
*/
        /*
         * authenticate with google api
         */
        googleAuth.authorize(_getFiles(callback));

    },


    /* var access_token = token.credentials.access_token
    file._thumbnailLink = "https://drive.google.com/thumbnail?id=" + file.id
                                    + "&access_token=" + access_token
                                    + "&sz=w80-h80-p-k-nu";


    https://drive.google.com/thumbnail?id=0B6KNj708lb4IY3pxSF9zMnludlE&access_token=sometoken&sz=w80-h80-p-k-nu

    */

    getThumbnail: function(id, width, height, callback) {

        googleAuth.authorize(_getThumbnail(id, width, height, callback));

    }
};

var _getThumbnail = function(id, width, height, callback) {

    return function(auth) {

        var options = {
            url : 'https://drive.google.com/thumbnail',
            qs : { 'id' : id,
                    'sz' : 'w' + width + '-h' + height + 'p-k-nu',
                    'access_token' : auth.refresh_token},
            followRedirect : true
        };

        console.log(options);

        // do the GET request
        request.get(options, function(error, res, contents) {

            if (error) {
                console.log(error);
                callback(error);
            }
                //Check for right status code
            if(res.statusCode !== 200){
                return console.log('Invalid Status Code Returned:', res.statusCode);
            }

            console.log('headers: ', res.headers);
            callback(null, res.headers['content-type'], contents);
        });
    };
};





var _getFiles = function(callback) {

    return function(auth) {

        var service = google.drive('v2');
        service.files.list({
            auth: auth,
            q: '(mimeType contains "video" or mimeType contains "image") ',
            maxResults: 1000,
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

            console.log(files.length + 'files found.');
            callback(null, files);
            return;
        });
    };
};