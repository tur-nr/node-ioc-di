module.exports = Tag;
Tag.identifier = '#';
function Tag(alias, callback) {
  if ('string' !== typeof alias) {
    throw new TypeError('alias must be a string.');
  }

  if (!alias) {
    throw new TypeError('alias must not be empty');
  }

  if ('function' !== typeof callback) {
    throw new TypeError('callback must be a function');
  }

  Object.defineProperties(this, {
    alias: {
      enumerable: true,
      value: alias
    },
    callback: {
      enumerable: true,
      value: callback
    },
    services: {
      enumerable: true,
      value: []
  });
}

Tag.prototype = {
  addService: function(service) {
    this.services.push(service);
  }
};
