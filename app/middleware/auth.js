var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
var TOKEN = process.env.TOKEN
var CLIENT_SECRET = process.env.CLIENT_SECRET

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  if (TOKEN) {
      oauth2Client.credentials = JSON.parse(TOKEN);
      return oauth2Client;
  } else {
      console.log('Error: Set TOKEN environment varilable');
      return;
  }
}

// already authenticated
if (module.exports.token) {
  return;
}

if (CLIENT_SECRET) {
  module.exports.token = authorize(JSON.parse(CLIENT_SECRET));
} else {
  console.log('Error: Set CLIENT_SECRET environment varilable');
  return;
}