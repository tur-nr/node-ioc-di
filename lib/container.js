module.exports = Container;
function Container(definition) {
  Object.defineProperties(this, {
    params: { value: definition.parameters },
    registry: { value: {} }
  });
}

Container.prototype = {
  param: function(key) {
    return this.params[key];
  }
};
