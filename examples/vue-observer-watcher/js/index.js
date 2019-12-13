function SelfVue (options) {
  // data, el, exp
  this.data = options.data;
  var self = this;
  this.vm = this;
  Object.keys(this.data).forEach(function(key) {
    self.proxyKeys(key)
  })
  observe(this.data);
  new Compile(options.el, this.vm);
  // el.innerHTML = this.data[exp];  // 初始化模板数据的值
  // new Watcher(this, exp, function (value) {
  //     el.innerHTML = value;
  // });
  return this;
}

SelfVue.prototype = {
  proxyKeys: function(key) {
    var self = this;
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        return self.data[key];
      },
      set: function(newVal) {
        self.data[key] = newVal;
      }
    })
  }
}