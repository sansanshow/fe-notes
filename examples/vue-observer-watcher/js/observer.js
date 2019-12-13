function defineReactive (data, key, val) {
  observe(val);
  var dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return val;
    },
    set: function(newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
      console.log(`property "${key}" has been watched, current value is ${newVal.toString()}`);
      dep.notify()
    }
  })
}

Dep.target = null;


function observe (data) {
  if (!data || typeof data !== 'object') {
    return;
  }
  console.log(Date.now());
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  })
}


// 订阅者
function Dep() {
  this.subs = []
}

Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub);
  },
  notify: function() {
    this.subs.forEach(function(sub) {
      sub.update()
    })
  }
}

