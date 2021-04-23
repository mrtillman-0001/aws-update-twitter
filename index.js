const { TwitterService } = require('./twitter.service');

const handler = async () => {
  const twitter = new TwitterService();
  await twitter.updateProfileIcon();
}

handler();

exports.handler = handler;
