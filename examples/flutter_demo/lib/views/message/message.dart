import 'package:flutter/material.dart';
class Message extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    print('消息');
    return new Scaffold(
      body: new Center(
        child: new Text("消息"),
      ),
    );
  }
}