module.exports = Service;
function Service(name, factory) {
  if ('string' !== typeof name) {
    throw new TypeError('name is not a string');
  }

  if (!name) {
    throw new TypeError('name is empty');
  }

  if ('function' !== typeof factory) {
    throw new TypeError('factory is not a function');
  }

  Object.defineProperties(this, {
    name: {
      enumerable: true,
      value: name
    },
    factory: {
      enumerable: true,
      value: callback
    }
  });
}
