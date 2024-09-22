import request from "request"

request.get({
  url: 'https://api.api-ninjas.com/v1/cryptosymbols',
  headers: {
    'X-Api-Key': ''
  },
}, function(error: Error, response: any, body: any) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
});