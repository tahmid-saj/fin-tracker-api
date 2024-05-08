const request = require('request');

request.get({
  url: 'https://api.api-ninjas.com/v1/cryptosymbols',
  headers: {
    'X-Api-Key': ''
  },
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
});