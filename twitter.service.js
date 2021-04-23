require('dotenv').config();
const { v4 } = require('uuid');
const consumerKey = process.env.TWITTER_CONSUMER_KEY;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
const token = process.env.TWITTER_ACCESS_TOKEN;
const tokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;
const fetch = require('node-fetch');
const { iconFilePaths } = require('./icon.repo');
const FormData = require('form-data');
const { createReadStream } = require("fs");
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
const qs = require('querystring');

class TwitterService {

  constructor(){
    const oauthTimestamp = Math.floor(Date.now() / 1000);
    const oauth = OAuth({
      consumer: { key: consumerKey, secret: consumerSecret },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return crypto
            .createHmac('sha1', key)
            .update(base_string)
            .digest('base64')
        }
    });
    const oauth_data = {
      oauth_consumer_key: consumerKey,
      oauth_token: token,
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: oauthTimestamp,
      oauth_nonce: v4()
    };
    const baseString = [
      "POST",
      encodeURIComponent("https://api.twitter.com/1.1/account/update_profile_image.json"),
      encodeURIComponent(qs.stringify(oauth_data))
    ].join("&");
    this.authHeader = oauth.toHeader(oauth.authorize({
      url: "https://api.twitter.com/1.1/account/update_profile_image.json",
      method: "POST"
    }, token)).Authorization;
  }

  async updateProfileIcon(){
    const body = new FormData();
    const imageStream = createReadStream(iconFilePaths[0]);
    body.append("image", imageStream);
    console.log(this.authHeader);
    return await fetch('https://api.twitter.com/1.1/account/update_profile_image.json',{
      method: 'POST',
      headers: {
        "content-type": "multipart/form-data",
        "authorization": this.authHeader
      },
      body
    }).then(async res => {
      if(res.ok){
        return res.json();
      } else {
        console.log(await res.text());
      }
    }).catch(console.log);
  }

}

module.exports = { TwitterService };