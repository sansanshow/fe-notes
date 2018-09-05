import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
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
  String shareUrl = "http://daily.zhihu.com/story/9695076";
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    print(widget._id);
    print(widget._title);
    getDetail();
  }
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget._title),
      ),
      body: new Container(
        child: new Column(
          children: <Widget>[
            new Text("wwwww")
          ],
        ),
      ),
    );
  }
  void getDetail() {
    http.read("http://news-at.zhihu.com/api/4/news/${widget._id}").then((response) {
      print(response);
      setState(() {
        
        this.shareUrl = JSON.decode(response)["share_url"];
        print(JSON.decode(response)["share_url"]);
      });
    });
  } 
}