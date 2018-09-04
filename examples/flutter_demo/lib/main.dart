import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

import './views/home.dart';
// import './views/main.dart';
import './views/index/detail/MyPage.dart';
import './views/index/detail/myHomePage.dart';
import './views/index/detail/index.dart';
import './views/zhihu/zhuanlan.dart';
void main() {
  debugPaintSizeEnabled=true;
  runApp(new MyApp());
} 
class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Flutter Demo',
      // theme: new ThemeData.fallback(),
      theme: new ThemeData(
        primarySwatch: Colors.blue
      ),
      // home: new DetailIndex(),
      // home: new Home(),
      home: new Zhuanlan(),
      // home: new Main(),
      routes: <String, WidgetBuilder> {
        '/a': (BuildContext context) => new DetailIndex(),
        '/b': (BuildContext context) => new MyHomePage(title: 'page B'),
        '/c': (BuildContext context) => new MyPage(title: 'page C'),
      },
    );
  }
}