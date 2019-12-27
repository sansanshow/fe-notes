import 'package:flutter/material.dart';
import './index/index.dart';
import './message/message.dart';
import './mine/mine.dart';
class Main extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new _HomeState();
  }
}

class _HomeState extends State<Main> with SingleTickerProviderStateMixin {
  TabController _tabController;
  
  int _currentIndex = 0;

  @override
  void initState() {
    super.initState();
    _tabController = new TabController(vsync: this, length: 3);
  }
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      backgroundColor: Colors.grey,
      body: new TabBarView(
        children: <Widget>[
          new Index(),
          new Message(),
          new Mine()
        ],
        controller: _tabController,
        // onPageChanged: onPageChanged
      ),
      bottomNavigationBar: new Material(
        color: Colors.orangeAccent,
        child: new TabBar(
          controller: _tabController,
          tabs: <Widget>[
            new Tab(text: '主页', icon: new Icon(Icons.home)),
            new Tab(text: '消息', icon: new Icon(Icons.message)),
            new Tab(text: '我的', icon: new Icon(Icons.person))
          ],
        )
      ),
    );
  }
}