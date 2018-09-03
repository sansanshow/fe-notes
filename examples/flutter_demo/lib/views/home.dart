import 'package:flutter/material.dart';
import './index/index.dart';
import './message/message.dart';
import './mine/mine.dart';
class Home extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new _HomeState();
  }
}

class _HomeState extends State<Home> {
  var _pageController = new PageController(initialPage: 0);
  int _currentIndex = 0;
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      // appBar: new AppBar(
      //   title: new Text('Home')
      // ),
      backgroundColor: Colors.grey,
      body: new PageView(
        children: <Widget>[
          new Index(),
          new Message(),
          new Mine()
        ],
        controller: _pageController,
        onPageChanged: onPageChanged
      ),
      bottomNavigationBar: new BottomNavigationBar(
        items: [
          new BottomNavigationBarItem(
            icon: new Icon(Icons.home),
            title: new Text("主页"),
            backgroundColor: Colors.grey
          ),
          new BottomNavigationBarItem(
              icon: new Icon(Icons.message), title: new Text("消息"),backgroundColor: Colors.grey),
          new BottomNavigationBarItem(icon: new Icon(Icons.person), title: new Text("我的"))
        ],
        onTap: onTap,
        currentIndex: _currentIndex,
      ),
    );
  }
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  void onTap(int index) {
    _pageController.animateToPage(index, duration: const Duration(milliseconds: 300), curve: Curves.fastOutSlowIn);
    
  }

  void onPageChanged(int index) {
    setState(() {
      this._currentIndex = index;
    });
  }
}