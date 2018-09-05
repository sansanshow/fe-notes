import 'package:flutter/material.dart';
import './ZHDaily.dart';

class ZHIndex extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new _ZHIndexState();
  }
}

class _ZHIndexState extends State<ZHIndex> with SingleTickerProviderStateMixin {
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
          new ZHDaily(),
          new Text('新鲜事'),
          new Text('我的'),
        ],
        controller: _pageController,
        onPageChanged: onPageChanged
      ),
      bottomNavigationBar: new BottomNavigationBar(
        fixedColor: Colors.blue[600],
        iconSize: 16.0,
        items: [
          new BottomNavigationBarItem(
            icon: new Icon(Icons.home),
            title: new Text("知乎日报", style: new TextStyle(fontSize: 12.0),),
            backgroundColor: Colors.grey
          ),
          new BottomNavigationBarItem(
            icon: new Icon(Icons.message),
            title: new Text("新鲜事", style: new TextStyle(fontSize: 12.0),),
            backgroundColor: Colors.grey
          ),
          new BottomNavigationBarItem(
            icon: new Icon(Icons.person),
            title: new Text("我的",
            style: new TextStyle(fontSize: 12.0)), 
            backgroundColor: Colors.grey
          ),
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