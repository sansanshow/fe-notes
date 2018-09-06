import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import './model/ZHDailyDetailModel.dart';
import './ZHComments.dart';


// import 'package:flutter_webview_plugin/flutter_webview_plugin.dart';


class ZHDailyDetail extends StatelessWidget {
  final int id;
  final String title;
  ZHDailyDetail(this.id, this.title);

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Scaffold(
      body: new Material(
        child: new _Main(id, title),
      )
    );
  }
}
class _Main extends StatefulWidget {
  final int _id;
  final String _title;

  _Main(this._id, this._title);

  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return new _MainState();
  }
}

class _MainState extends State<_Main> {
  ZHDailyDetailModel data;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getDetail();
  }
  @override
  Widget build(BuildContext context) {
    // TODO: implement build

    Widget titleSection = new Container(
      padding: const EdgeInsets.all(10.0),
      child: new Column(children: <Widget>[
        new Container(child: new Text(data?.title != null ? data.title : '', style: new TextStyle(fontSize: 24.0, fontWeight: FontWeight.w600))),
        new Container(child: new Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            new Text(data?.image_source != null ? data.image_source : '', style: new TextStyle(color: Colors.green[600]))
          ],))
      ],),
    );
    Column buildButtonColumn(IconData icon, String label) {
      Color color = Theme.of(context).primaryColor;

      return new Column(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          new Icon(icon, color: color),
          new Container(
            padding: const EdgeInsets.only(top: 8.0),
            child: new Text(label,
              style: new TextStyle(
                fontSize: 12.0,
                fontWeight: FontWeight.w400,
                color: color
              ),
            ),
          )
        ],
      );
    }

    Widget buttonSection = new Container(
      child: new Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: <Widget>[
          buildButtonColumn(Icons.call, 'CALL'), // Column
          buildButtonColumn(Icons.near_me, 'ROUTE'), // Column
          buildButtonColumn(Icons.share, 'SHARE'), // Column
        ],
      ),
    );

    List<Widget> arr = List(10);

    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget._title),
      ),
      body: new Stack(
        children: [
          new ListView(
            padding: const EdgeInsets.only(left: 10.0, right: 10.0, bottom: 48.0),
            children: <Widget>[
              titleSection,
              new Text(data?.body != null ? data.body : ''),
              buttonSection,
              new ZHComments(widget._id),
            ],
          ),
          new Positioned(
            height: 48.0,
            left: 0.0,
            right: 0.0,
            bottom: 0.0,
            child: new Container(
              padding: const EdgeInsets.only(left:12.0, top: 8.0, right: 12.0, bottom: 8.0),
              decoration: new BoxDecoration(color: Colors.blue[600]),
              child: new Row(
                children: <Widget>[
                  new Expanded(
                    child: new Container(
                      child: new InputChip(avatar: new Icon(Icons.sms), label: new Text('写下你的评论……'),
                        onPressed: () {
                          print('InputChip - onPressed');
                        }
                      ),
                    ),
                  ),
                  new Icon(Icons.textsms),
                  new Icon(Icons.star_border),
                  new Icon(Icons.share),
                ],
              )
            )
          )
        ]
      ),
    );
  }
  getDetail() async{
    await http.read("http://news-at.zhihu.com/api/4/news/${widget._id}").then((response) {
      setState(() {
        data = new ZHDailyDetailModel.fromJson(response);
        // print(data);
      });
    });
  } 
}