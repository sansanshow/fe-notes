function Compile(el, vm) {
  this.vm = vm;
  this.el = document.querySelector(el);
  this.fragment = null;
  this.init();
}
Compile.prototype = {
  init: function() {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el);
      this.compileElement(this.fragment);
      this.el.appendChild(this.fragment);
    } else {
      console.log('Dom元素不存在');
    }
  },
  nodeToFragment: function(el) {
    var fragment = document.createDocumentFragment();
    var child = el.firstChild;
    while(child) {
      // 移入到 代码 片段中
      fragment.appendChild(child);
      child = el.firstChild;
    }

    return fragment;
  },
  // compile
  compileElement: function(el) {
    var childNodes = el.childNodes;
    var self = this;
    [].slice.call(childNodes).forEach(function(node) {
      var reg = /\{\{\s*(.*?)\s*\}\}/;
      var text = node.textContent;
      if (self.isElementNode(node)) {  
        self.compile(node);
      } else if (self.isTextNode(node) && reg.test(text)) {
        self.compileText(node, reg.exec(text)[1]);
      }
      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node);
      }
    });
  },
  compile: function(node) {
    var nodeAttrs = node.attributes;
    var self = this;
    Array.prototype.forEach.call(nodeAttrs, function(attr) {
      var attrName = attr.name;
      if (self.isDirective(attrName)) {
        var exp = attr.value;
        var dir = attrName.substring(2);
        if (self.isEventDirective(dir)) { // 事件指令
          self.compileEvent(node, self.vm, exp, dir);
        } else {
          self.compileModel(node, self.vm, exp, dir);
        }
        node.removeAttribute(attrName);
      }
    })
  },
  compileEvent: function(node, vm, exp, dir) {
    var eventName = dir.split(':')[1];
    var cb = vm.methods && vm.methods[exp];
    if (eventName && cb) {
      node.addEventListener(eventName, cb.bind(vm), false);
    }
  },
  
  compileModel: function(node, vm, exp, dir) {
    var self = this;
    var val = self.vm[exp];
    this.modelUpdater(node, val);
    new Watcher(vm, exp, function(value) {
      self.modelUpdater(node, value);
    });

    node.addEventListener('input', function(e) {
      var newVal = e.target.value;
      console.log('newVal:', newVal, 'val:', val);
      if (val == newVal) {
        return;
      }
      vm[exp] = newVal;
      val = newVal;
    })

  },
  //
  compileText: function(node, exp) {
    var self = this;
    var initText = self.vm[exp];
    this.updateText(node, initText);  // 将初始化的数据初始化到视图中
    new Watcher(self.vm, exp, function(value) { // 生成订阅器并绑定更新函数
      self.updateText(node, value);
    })
  },
  //
  updateText: function(node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value;
  },
  modelUpdater(node, val) {
    node.value = typeof value === 'undefined' ? '' : value;
  },
  // 是否文本节点
  isTextNode: function(node) {
    return node.nodeType == 3;
  },
  isElementNode: function(node) {
    return node.nodeType === 1;
  },
  isDirective: function(attr) {
    return attr.indexOf('v-') !== -1;
  },
  isEventDirective: function(dir) {
    return dir.indexOf('on:') !== -1;
  },
}