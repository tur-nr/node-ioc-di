module.exports = IocFactory;
function IocFactory() {
  this.paramters = {};
  this.services = {};
}

IocFactory.prototype = {
  param: function(key, value) {
    return this.parameters[key] = new Parameter(key, value);
  },

  service: function(name, /*dependencies,*/ fn) {
    return this.services[name] = new Service(name, fn);
  },

  factory: function(name, /*dependencies,*/, fn) {
    var service = new Service(name, fn);
    return this.services[name] = service.factory();
  }
};
