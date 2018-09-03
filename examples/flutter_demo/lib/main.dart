import 'package:flutter/material.dart';
import './views/home.dart';
import './views/index/detail/MyPage.dart';
import './views/index/detail/myHomePage.dart';
void main() => runApp(new MyApp());
class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Flutter Demo',
      // theme: new ThemeData.fallback(),
      home: new Home(),
      routes: <String, WidgetBuilder> {
        '/a': (BuildContext context) => new MyPage(title: 'page A'),
        '/b': (BuildContext context) => new MyHomePage(title: 'page B'),
        '/c': (BuildContext context) => new MyPage(title: 'page C'),
      },
    );
  }
}