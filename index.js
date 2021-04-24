const { iconFilePaths } = require('./icon.repo');
const { TwitterService } = require('./twitter.service');

const handler = async () => {
  const imageCount = iconFilePaths.length;
  const index = Math.floor(Math.random() * imageCount);
  const twitter = new TwitterService();
  return await twitter.updateProfileIcon(iconFilePaths[index]);
}

exports.handler = handler;
