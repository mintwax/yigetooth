/*jshint node: true */
'use strict';

var GoogleDrive = require('../app/models/GoogleDrive');

module.exports = {
/**
 * Lists the names and IDs of all files in google drive
 * TODO: limit it to a specific folder
 *
 */
    index: function(req, res, next) {

        GoogleDrive.getFiles(function(err, files) {

            if (err) next(err);

            files.forEach(function(file) {

                if (file.videoMediaMetadata) {
                    file.metadata = JSON.stringify(file.videoMediaMetadata, null, 2);
                }
                else if (file.imageMediaMetadata) {
                    file.metadata = JSON.stringify(file.imageMediaMetadata, null, 2);
                }

            });

            res.json(files);
        });
    },

    thumbnail: function(req, res, next) {

        var data = {
            'thumbnail': {
                'id': req.params.id,
                'width': req.params.width,
                'height': req.params.height
            }
        };

        GoogleDrive.getThumbnail(req.params.id, req.params.width, req.params.height,
                                function(err, contentType, contents) {
            if (err) next(err);
            // TODO: only send content type before the first chunk
            //res.contentType(contentType);
            res.send(contents);
        });

    }
};


