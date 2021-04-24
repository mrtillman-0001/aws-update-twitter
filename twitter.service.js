require('dotenv').config();
const consumerKey = process.env.TWITTER_CONSUMER_KEY;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
const token = process.env.TWITTER_ACCESS_TOKEN;
const tokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;
const fetch = require('node-fetch');
const { iconFilePaths } = require('./icon.repo');
const FormData = require('form-data');
const { createReadStream } = require("fs");
const { v4 } = require('uuid');
const oauthSignature = require('oauth-signature');

const httpMethod = 'POST',
url = 'https://api.twitter.com/1.1/account/update_profile_image.json',
parameters = {
    oauth_consumer_key : consumerKey,
    oauth_nonce : v4(),
    oauth_signature_method : 'HMAC-SHA1',
    oauth_timestamp : Math.floor(Date.now() / 1000),
    oauth_token : token,
    oauth_version : '1.0'
},
encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret);

class TwitterService {

  async updateProfileIcon(filePath){
    const body = new FormData();
    body.append("image", createReadStream(filePath))
    return await fetch('https://api.twitter.com/1.1/account/update_profile_image.json',{
      method: 'POST',
      headers: {
        Authorization: `OAuth oauth_consumer_key="${parameters.oauth_consumer_key}", oauth_nonce="${parameters.oauth_nonce}", oauth_signature="${encodedSignature}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${parameters.oauth_timestamp}", oauth_token="${parameters.oauth_token}", oauth_version="1.0"`,
      },
      body
    })
    .then(async res => {
      if(res.ok){
        return res.json();
      } else {
        const message = await res.text();
        throw new Error(message);
      }
    })
  }

}

module.exports = { TwitterService };