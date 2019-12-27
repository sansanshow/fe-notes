import 'package:flutter/material.dart';
import './main.dart';
class Index extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    print('主页');
    return new Scaffold(
      body: new Center(
        child: new IndexMain(),
      ),
    );
  }
}