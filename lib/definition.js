var extend = require('extend');
var deepFreeze = require('deep-freeze');
var Container = require('./container');

module.exports = Definition;
function Definition() {
  this.services = {};
  this.factories = {};
  this.extensions = {};
  this.parameters = {};
}

Definition.prototype = {
  parameter: function(key, value) {
    assertKey(key);
    assertValue(value);

    this.parameters[key] = value;
  },

  factory: function(key, factory) {
    assertKey(key);
    assertFactory(factory);

    delete this.services[key];

    this.factories[key] = factory;
  },

  service: function(key, factory) {
    assertKey(key);
    assertFactory(factory);

    delete this.factories[key];

    this.services[key] = factory;
  },

  extend: function(key, extension) {
    assertKey(key);
    assertExtension(extension);

    if (!Array.isArray(this.extensions[key])) {
      this.extensions[key] = [];
    }

    this.extensions[key].push(extension);
  },

  clone: function() {
    var clone = new Definition();

    clone.services   = extend(true, {}, this.services);
    clone.factories  = extend(true, {}, this.factories);
    clone.parameters = extend(true, {}, this.parameters);
    clone.extensions = extend(true, {}, this.extensions);

    return clone;
  },

  container: function() {
    var clone = this.clone();
    deepFreeze(clone);

    return new Container(clone);
  }
};

function assertKey(key) {
  if ('string' !== typeof key) {
    throw new TypeError('key must be a string.');
  }
  else if (!key) {
    throw new Error('key must not be empty.');
  }
}

function assertValue(value) {
  var type = typeof value;
  switch (type) {
    case 'string':
    case 'number':
    case 'boolean':
      break;

    default:
      throw new TypeError('value must be a scalar value, ' + type + ' given.');
  }
}

function assertFactory(factory) {
  if ('function' !== typeof factory) {
    throw new TypeError('factory must be a function.');
  }
}

function assertExtension(extension) {
  if ('function' !== typeof extension) {
    throw new TypeError('extension must be a function.');
  }
}
