let _now = null;

module.exports = () => {
  if(_now) return _now;
  _now = Math.floor(Date.now() / 1000)
  return _now.toString();
}
