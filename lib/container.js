module.exports = Container;
function Container(definition) {
  Object.defineProperties(this, {
    definition: { value: definition },
    registry: { value: {} },
    callstack: { value: [] }
  });
}

Container.prototype = {
  param: function(key) {
    return this.definition.parameters[key];
  },

  get: function(key, args) {
    var factory;
    var fn;
    var service;
    var index;

    if (this.callstack.indexOf(key) !== -1) {
      // we can not resolve services that are currently being resolved
      // this is a race condition implemented by the developer
      throw new Error('can not get service, ' + key + ', item is currently resolving');
    }

    factory = ('function' === typeof this.definition.factories[key]);

    // does the service exist within our definition
    if (!factory && ('function' !== typeof this.definition.services[key])) {
      throw new Error('no service exists with key: ' + key + '.');
    }

    if (factory) {
      fn = this.definition.factories[key];
      args = Array.isArray(args) ? args : [];
    } else {
      fn = this.definition.services[key];
      args = [];
    }

    // already in registry
    if (this.registry[key]) {
      return this.registry[key](args);
    }

    this.callstack.push(key);
    this.registry[key] = (function(create, container) {
      var def = container.definition;
      var extensions = def.extensions[key] || [];
      var tags = def.tags[create.__tag] || [];
      var value;

      return function(args) {
        var extended;

        if (!factory && value) {
          return value;
        }

        value = create.apply(container, args);

        for (var i = 0, l = extensions.length; i < l; ++i) {
          extended = extensions[i].apply(container, [value].concat(args));

          if (extended != null) {
            value = extended;
          }
        }

        for (i = 0, l = tags.length; i < l; ++i) {
          tags[i].apply(container, [value]);
        }

        return value;
      };
    })(fn, this);

    service = this.registry[key](args);
    index = this.callstack.indexOf(key);

    this.callstack.splice(index, 1);

    return service;
  }
};
