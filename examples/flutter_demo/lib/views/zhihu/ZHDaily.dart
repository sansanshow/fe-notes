import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import './model/ZHDailyModel.dart';
import './model/ZHDailyStoryModel.dart';
import 'package:flutter_swiper/flutter_swiper.dart';

import './ZHDailyDetail.dart';
// 知乎日报
class ZHDaily extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new NewsList();
  }
}

class NewsList extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return new NewsListState();
  }
}

class NewsListState extends State<NewsList> with AutomaticKeepAliveClientMixin{
  ZHDailyModel _dailyModel;
  ScrollController _scrollController = new ScrollController();
  // var arr = getLatest()['stories'];
  getList() async{
    await http.read("https://news-at.zhihu.com/api/4/news/latest").then((response) {
      setState(() {
        print("========== news list loaded =============");
        this._dailyModel = new ZHDailyModel.fromJson(response);
        _scrollController.animateTo(0.0, 
          curve: Curves.easeOut, 
          duration: const Duration(milliseconds: 300)
        );
      });
    });
  }

  Widget swiperSection = new _TopSwiper();
  Widget newSwiper = new Container(
    height: 120.0,
    child: new Swiper(
      itemBuilder: (BuildContext context,int index){
        return new Image.network("http://img.jandan.net/news/2018/09/2d5ff15b73f85dbd9ff302b9d4f85d4b.jpg",fit: BoxFit.fill,);
      },
      itemCount: 3,
      pagination: new SwiperPagination(),
      control: new SwiperControl(),
    ),
  );

  Widget titleSection = new Container(
    child: new Column(
      children: <Widget>[
        new Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            new Text('今日热门', style: new TextStyle(color: Colors.grey))
          ],
        ),
        new Divider(),
      ],
    )
  );
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getList();
  }
  @override
  Widget build(BuildContext context) {
    // 
    return new Scaffold(
      body: new Container(
        child: ListView.builder(
          shrinkWrap: false,
          controller: _scrollController,
          reverse: false,
          itemCount: _dailyModel?.stories == null ? 0 : _dailyModel.stories.length + 2,
          itemBuilder: (context, index) {
            if(index == 0) {
              return swiperSection;
            } else if (index == 1) {
              return titleSection;
            } else {
              var storiesIndex = index - 2;
              var title = _dailyModel.stories[storiesIndex].title;
              var src = _dailyModel.stories[storiesIndex].getFirstImageUrl();
              return new ListItem(title, src, _dailyModel.stories[storiesIndex]);
            }
            
          },
        )
      ),
      floatingActionButton: new Builder(builder: (BuildContext context) {
        return new FloatingActionButton(
          child: const Icon(Icons.refresh),
          tooltip: "Hello",
          foregroundColor: Colors.white,
          backgroundColor: Theme.of(context).primaryColor,
          heroTag: null,
          elevation: 7.0,
          highlightElevation: 1.0,
          onPressed: () {
            getList();
          },
          mini: true,
          shape: new CircleBorder(),
          isExtended: false,
        );
      }),
    );
  }

  // TODO: implement wantKeepAlive
  @override
  bool get wantKeepAlive => true;
}
// 顶部-swiper
class _TopSwiper extends StatefulWidget {
  @override
    State<StatefulWidget> createState() {
      // TODO: implement createState
      return new _TopSwiperState();
    }
}

class _TopSwiperState extends State<_TopSwiper> {
  @override
  Widget build(BuildContext context) {
    // 
    return new Material(
      child: new Container(
        height: 120.0,
        child: new Stack(
          fit: StackFit.expand,
          children: <Widget>[
            new Image.asset('images/girl-h.jpg', fit: BoxFit.fitWidth),
            new Positioned(
              left: 0.0,
              bottom: 0.0,
              right: 0.0,
              child: new Container(
                padding: const EdgeInsets.only(left: 8.0, right: 8.0),
                color: const Color.fromRGBO(51, 51, 51, 0.5),
                height: 20.0,
                child: new Row(
                  children: <Widget>[
                    new Text('图片标题', style: new TextStyle(color: Colors.black),)
                  ],
                ),
              ),
            )
          ],
        ),
      )
        
    );
  }
}

class SwiperItem extends StatelessWidget {
  final String info;
  const SwiperItem(Key key, this.info);
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Stack(
      children: <Widget>[
        new Image.network(info),
        new Text('SwiperItem')
      ],
    );
  }
}



// 列表元素
class ListItem extends StatelessWidget {
  final String _src;
  final String _title;
  ZHDailyStoryModel _story;
  ListItem(this._title, this._src, this._story);
  Widget _buidImage(src) {
    if(src == null) {
      return new Image.asset(
        'images/girl.jpg',
        height: 140.0,
        width: 140.0,
        fit: BoxFit.fill,
      );
    }
    return new Image.network(src, height: 140.0, width: 140.0, fit: BoxFit.fill);
  }
  @override
  Widget build(BuildContext context) {
    // 
    return new GestureDetector(
      onTap: () {
        // Navigator.of(context).pushNamed('/a');
        Navigator.of(context).push(
          new MaterialPageRoute(
            settings: new RouteSettings(name: 'ZHDailyDetail'),
            builder: (BuildContext context) {
              return new ZHDailyDetail(_story.id, _story.title);
            }
          ));
        print('${_story.id}. was tapped!');
      },
      child: new Container(
        height: 80.0,
        margin: const EdgeInsets.only(top: 8.0),
        padding: const EdgeInsets.only(left:8.0, right: 8.0),
        child: new Column(
          children: <Widget>[
            new Row(
              children: <Widget>[
                new Container(
                  // padding: const EdgeInsets.only(left:8.0, top:8.0, right: 8.0),
                  height: 80.0,
                  width: 80.0,
                  // margin: const EdgeInsets.all(4.0),
                  child: _buidImage(_src),
                ),
                new Expanded(
                  child: new Container(
                    padding: const EdgeInsets.only(left:8.0, right: 8.0),
                    height: 80.0,
                    child: new Column(
                      children: <Widget>[
                        new Expanded(
                          child: new Text(_title.trim()),
                        ),
                        new Divider(height: 0.0, color: Colors.grey),
                      ],
                    ),
                  ),
                )
              ],
            ),
            // new Divider(height: 8.0, color: Colors.red),
          ]
        )
      )); 
  }
}