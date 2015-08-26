module.exports = function ioc() {
  return new require('./lib/factory')();
};
