module.exports = Tag;
function Tag(alias, callback) {
  if ('string' !== typeof alias) {
    throw new TypeError('alias must be a string.');
  }

  if (!alias) {
    throw new TypeError('alias must not be empty');
  }

  if ('function' !== callback) {
    throw new TypeError('callback must be a function');
  }

  this.alias = alias;
  this.callback = callback;
}
