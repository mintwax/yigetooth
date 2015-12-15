
var url = require('url');

var urlStr = 'https://drive.google.com/thumbnail?id=someid&access_token=sometoken&sz=w80-h80-p-k-nu';

obj = url.parse(urlStr, true);

console.log(obj);




/*{ protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'drive.google.com',
  port: null,
  hostname: 'drive.google.com',
  hash: null,
  search: '?id=someid&access_token=sometoken&sz=w80-h80-p-k-nu',
  query: { id: 'someid', access_token: 'sometoken', sz: 'w80-h80-p-k-nu' },
  pathname: '/thumbnail',
  path: '/thumbnail?id=someid&access_token=sometoken&sz=w80-h80-p-k-nu',
  href: 'https://drive.google.com/thumbnail?id=someid&access_token=sometoken&sz=w80-h80-p-k-nu' }
*/

obj = {
    pathname: '/thumbnail',
    query: {
        id: 'someid',
        access_token: 'sometoken',
        sz: '23098ljasdf'
    }
}

url = url.format(obj);