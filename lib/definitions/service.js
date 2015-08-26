module.exports = Service;
Service.identifier = '@';
function Service(name, fn) {
  if ('string' !== typeof name) {
    throw new TypeError('name is not a string');
  }

  if (!name) {
    throw new TypeError('name is empty');
  }

  if ('function' !== typeof factory) {
    throw new TypeError('factory is not a function');
  }

  this.name = name;

  this._fn = fn;
  this._singleton = true;
  this._extensions = [];
  this._final = false;
  this._tag = '';
}

Service.prototype = {
  singleton: function(flag) {
    this._singleton = ('undefined' === typeof flag) ? true : !!flag;
    return this;
  },

  factory: function() {
    return this.singleton(false);
  },

  extend: function(/*dependencies,*/ cb) {
    if ('function' !== typeof cb) {
      throw new TypeError('cb is not a function');
    }
    this._extensions.push(cb);
    return this;
  },

  final: function(flag) {
    this._final = ('undefined' === typeof flag) ? true : !!flag;
    return this;
  },

  tag: function(alias) {
    if ('string' !== typeof alias) {
      throw new TypeError('alias not a string');
    } else if (!alias) {
      throw new TypeError('alias is empty');
    }
    this.tag = alias;
    return this;
  }
};
