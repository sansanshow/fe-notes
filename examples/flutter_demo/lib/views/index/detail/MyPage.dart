import 'package:flutter/material.dart';

class MyPage extends StatelessWidget {
  MyPage({Key key, this.title}) : super(key: key);
  final String title;

  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(title)
      ),

      body: new Container(
        constraints: new BoxConstraints.expand(
          height: Theme.of(context).textTheme.display1.fontSize * 1.1 + 200.0,
        ),
        padding: const EdgeInsets.all(8.0),
        color: Colors.teal.shade700,
        alignment: Alignment.center,
        child: new Text('Hello World', style: Theme.of(context).textTheme.display1.copyWith(color: Colors.white)),
        foregroundDecoration: new BoxDecoration(
          image: new DecorationImage(
            image: new NetworkImage('http://p4.gexing.com/G1/M00/55/C6/rBACFFOSaqbiynt-AAK1kVa7PIw957.jpg'),
            centerSlice: new Rect.fromLTRB(270.0, 180.0, 1360.0, 730.0),
          ),
        ),
        transform: new Matrix4.rotationZ(0.1),
      )
    );
  }
}

