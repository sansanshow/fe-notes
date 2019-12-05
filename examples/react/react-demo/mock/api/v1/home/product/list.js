
var curTime = +new Date(),
start = curTime - 1000 * 90,
end = curTime + 1000 * 60;

var data = req.data;
var query = req.query;
var pageSize = data.pageSize;
var pageNo = data.pageNo;

function sleep(numberMillis) { 
    var now = new Date(); 
    var exitTime = now.getTime() + numberMillis; 
    while (true) { 
        now = new Date(); 
        if (now.getTime() > exitTime) {
            doNext(pageSize);
            return; 
        }
    } 
}

sleep(800);

function doNext(size){
  var arr= [
    {
      code: 'fffff',
      name: '一些模块1',
      desc: '模块简单介绍',
      url: '/fffff',
      iconClass: 'icon-icon_zhijianshuju_rukou',
      iconColor: '#fcc700',
      status: '1',
    },
    {
      code: 'uuuuu',
      name: '一些模块2',
      desc: '模块简单介绍',
      url: '/uuuuu',
      iconClass: 'icon-icon_zhijianhuoke_rukou',
      iconColor: '#0094dd',
      status: '1',
    },
    {
      code: 'ccccc',
      name: '一些模块3',
      desc: '模块简单介绍',
      url: '/ccccc',
      iconClass: 'icon-icon_zhijiantiaocha_rukou',
      iconColor: '#12bfdb',
      status: '2',
    },
    {
      code: 'kkkkk',
      name: '一些模块4',
      desc: '模块简单介绍',
      url: '/kkkkk',
      iconClass: 'icon-icon_zhijianxueyuan_rukou',
      iconColor: '#0ac838',
      status: '2',
    }
  ];
  
  next(null, {
    code: '0000',
    message: '错误信息错误信息',
    data: arr
  })
}
