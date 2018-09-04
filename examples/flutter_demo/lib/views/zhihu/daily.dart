import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
// 知乎日报
class ZHDaily extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    const src = 'https://pic2.zhimg.com/v2-176deb10cfe4d7bf5315ecce002668e9.jpg';
    return new ListView(
      children: <Widget>[
          // new Container(
          //   // padding: const EdgeInsets.all(8.0),
          //   child: new Row(
          //     crossAxisAlignment: CrossAxisAlignment.start,
          //     children: <Widget>[
          //       new Text('今日热门',
          //           style: new TextStyle(color: Colors.grey))
          //       // new Container(
          //       //   // padding: const EdgeInsets.only(bottom: 8.0),
          //       //   child: new Text('今日热门',
          //       //     style: new TextStyle(color: Colors.grey),
          //       //   ),
          //       // ),
          //     ],
          //   )
          // ),
          // new Divider(),
          new ListItem(key, src),
          new ListItem(key, src),
        // new _TopSwiper()
      ],
    );
  }
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
    return new Scaffold(
      body: new Stack(
        fit: StackFit.expand,
        children: <Widget>[
          new Image.asset('images/girl.jpg', fit: BoxFit.fitWidth, width: 300.0,height: 200.0)
        ],
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
  final String src;
  const ListItem(Key key, this.src);
  @override
    Widget build(BuildContext context) {
      // TODO: implement build
      return new Container(
        height: 148.0,
        child: new Column(
          children: <Widget>[
            new Row(
              children: <Widget>[
                new Container(
                  height: 140.0,
                  width: 140.0,
                  // margin: const EdgeInsets.all(4.0),
                  child: new Image.asset(
                    'images/girl.jpg',
                    fit: BoxFit.fill,
                  ),
                ),
                new Expanded(
                    child: new Container(
                      height: 140.0,
                      // margin: const EdgeInsets.all(4.0),
                      child: new Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        
                        children: <Widget>[
                          new Expanded(
                            child: new Text('国家博物馆起火，巴西可能再也不会成为一个洲际性文化大国了'),
                          ),
                          new Expanded(
                            child: new Text('国家博物馆起火，巴西可能再也不会成为一个洲际性文化大国了'),
                          ),
                          // new Divider(height: 30.0, color: Colors.red,)
                      ],
                    )
                  ),
                )
              ],
            ),
            new Divider(height: 8.0, color: Colors.red),
          ]
        )
      ); 
    }
}