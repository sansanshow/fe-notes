let obj = {
  a: function() {
    let dos = () => {
      console.log(this);
    }
    dos();
  }
}


let obj2 = {
  a: function() {
    console.log(this);
  },
  b: function() {
    obj2.a()
  }
}
let func = obj2.b;
func();