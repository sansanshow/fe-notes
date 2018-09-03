import 'package:flutter/material.dart';
import 'dart:async';

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  bool _result = false;

  Future<Null> _openNewPage() async {
    bool value = await showDialog(
      context: context,
      barrierDismissible: true,
      child: new Center(
        child: new GestureDetector(
          child: new Text("确定"),
          onTap: () { Navigator.of(context).pop(true); },
        ),
      )
    );

    setState(() {
      _result = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
            title: new Text(widget.title),
        ),
        body: new Center(
            child: new Text(
                '用户当前选择为 $_result',
            ),
        ),
        floatingActionButton: new FloatingActionButton(
            onPressed: _openNewPage,
            child: new Icon(Icons.open_in_new),
        ),
    );
  }
}