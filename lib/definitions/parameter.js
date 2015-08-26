module.exports = Parameter;
function Parameter(key, value) {
  if ('string' !== typeof key) {
    throw new TypeError('key must be a string value');
  }

  if (!key) {
    throw new TypeError('key must not be empty');
  }

  switch (typeof value) {
    case 'string':
    case 'number':
    case 'boolean':
      break;

    default:
    throw new TypeError('value must be scalar, (string, number, boolean).');
  }

  Object.defineProperties(this, {
    value: {
      enumerable: true,
      value: value
    },
    key: {
      enumerable: true,
      value: key
    }
  });
}
