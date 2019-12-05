

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

sleep(0);

function doNext(size){
  next(null, {
    code: '0000',
    data: [
      {id: 1, title: '滚动新闻滚动新闻。', link: ''},
      {id: 2, title: '滚动新闻滚动新闻滚动新闻滚动新闻。', link: ''},
      {id: 3, title: '滚动新闻滚动新闻滚动新闻滚动新闻滚动新闻滚动新闻滚动新闻', link: ''}
    ]
  })
}