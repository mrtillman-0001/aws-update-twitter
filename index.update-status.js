require('dotenv').config();
const fetch = require('node-fetch');
const consumerKey = process.env.TWITTER_CONSUMER_KEY;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
const token = process.env.TWITTER_ACCESS_TOKEN;
const tokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;
const oauthSignature = require('oauth-signature');
const now = require('./now');
const { nonce } = require('./nonce');

var httpMethod = 'POST',
url = 'https://api.twitter.com/1.1/statuses/update.json',
parameters = {
    oauth_consumer_key : consumerKey,
    oauth_nonce : nonce,
    oauth_signature_method : 'HMAC-SHA1',
    status: "testing",
    oauth_timestamp : now(),
    oauth_token : token,
    oauth_version : '1.0',
    // file : 'vacation.jpg',
    // size : 'original'
},
// generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret);

// console.log(`curl --request POST \
// --url 'https://api.twitter.com/1.1/statuses/update.json?status=testing' \
// -H 'Authorization: OAuth oauth_consumer_key="${parameters.oauth_consumer_key}", oauth_nonce="${parameters.oauth_nonce}", oauth_signature="${encodedSignature}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${parameters.oauth_timestamp}", oauth_token="${parameters.oauth_token}", oauth_version="1.0"'`);


fetch('https://api.twitter.com/1.1/statuses/update.json?status=testing',{
  method: 'POST',
  headers: {
    Authorization: `OAuth oauth_consumer_key="${parameters.oauth_consumer_key}", oauth_nonce="${parameters.oauth_nonce}", oauth_signature="${encodedSignature}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${parameters.oauth_timestamp}", oauth_token="${parameters.oauth_token}", oauth_version="1.0"`,
  },
})
.then(async res => {
  if(res.ok){
    return res.json();
  } else {
    console.log(await res.text());
  }
})
.then(console.log)
.catch(console.log);