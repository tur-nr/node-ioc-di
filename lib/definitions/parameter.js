module.exports = Parameter;
function Parameter(key, value, cons) {
  if ('string' !== typeof key) {
    throw new TypeError('key must be a string value');
  }

  if (!key) {
    throw new TypeError('key must not be empty');
  }

  Object.defineProperties(this, {
    value: {
      enumerable: true,
      get: function() {
        return value;
      },
      set: function(val) {
        if (cons) {
          throw new TypeError('setting value to constant parameter');
        }

        if (val !== null) {
          switch (typeof val) {
            case 'string':
            case 'number':
            case 'boolean':
              break;

            default:
            throw new TypeError('value must be scalar, (null, string, number, boolean).');
          }
        }

        value = val;
      }
    },
    key: {
      enumerable: true,
      value: key
    },
    constant: {
      enumerable: true,
      value: (cons == null) ? true : !!cons
    }
  });

  this.value = value || null;
}
