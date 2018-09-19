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
  List<String> _titleMap = ["知乎日报", "煎蛋", "我的"];
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(_titleMap[_currentIndex]),
        actions: <Widget>[
          new IconButton(
            icon: new Icon(Icons.refresh, color: Colors.white, size: 30.0,),)
        ],
      ),
      drawer: new Drawer(     //侧边栏按钮Drawer
        child: new ListView(
          children: <Widget>[
            new UserAccountsDrawerHeader(   //Material内置控件
              accountName: new Text('Kovii', style: new TextStyle(color: Colors.white),), //用户名
              accountEmail: new Text('sansan_show@126.com', style: new TextStyle(color: Colors.white)),  //用户邮箱
              currentAccountPicture: new GestureDetector( //用户头像
                onTap: () => print('current user'),
                child: new CircleAvatar(    //圆形图标控件
                  backgroundImage: new NetworkImage('https://upload.jianshu.io/users/upload_avatars/7700793/dbcf94ba-9e63-4fcf-aa77-361644dd5a87?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240'),//图片调取自网络
                ),
              ),
              otherAccountsPictures: <Widget>[    //粉丝头像
                new GestureDetector(    //手势探测器，可以识别各种手势，这里只用到了onTap
                  onTap: () => print('other user'), //暂且先打印一下信息吧，以后再添加跳转页面的逻辑
                  child: new CircleAvatar(
                    backgroundImage: new NetworkImage('https://upload.jianshu.io/users/upload_avatars/10878817/240ab127-e41b-496b-80d6-fc6c0c99f291?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240'),
                  ),
                ),
                new GestureDetector(
                  onTap: () => print('other user'),
                  child: new CircleAvatar(
                    backgroundImage: new NetworkImage('https://upload.jianshu.io/users/upload_avatars/8346438/e3e45f12-b3c2-45a1-95ac-a608fa3b8960?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240'),
                    ),
                ),
              ],
              decoration: new BoxDecoration(    //用一个BoxDecoration装饰器提供背景图片
                image: new DecorationImage(
                  fit: BoxFit.fill,
                  // image: new NetworkImage('https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/lakes/images/lake.jpg')
                  //可以试试图片调取自本地。调用本地资源，需要到pubspec.yaml中配置文件路径
                  image: new ExactAssetImage('images/lake.jpg'),
                ),
              ),
            ),
            new ListTile(   //第一个功能项
              title: new Text('First Page'),
              trailing: new Icon(Icons.arrow_upward),
              onTap: () {
                Navigator.of(context).pop();
                Navigator.of(context).push(new MaterialPageRoute(builder: (BuildContext context) => new Text('第一个功能项')));
              }
            ),
            new ListTile(   //第二个功能项
              title: new Text('Second Page'),
              trailing: new Icon(Icons.arrow_right),
              onTap: () {
                Navigator.of(context).pop();
                Navigator.of(context).push(new MaterialPageRoute(builder: (BuildContext context) => new Text('第二个功能项')));
              } 
            ),
            new ListTile(   //第二个功能项
              title: new Text('Second Page'),
              trailing: new Icon(Icons.arrow_right),
              onTap: () {
                Navigator.of(context).pop();
                Navigator.of(context).pushNamed('/a');
              } 
            ),
            new Divider(),    //分割线控件
            new ListTile(   //退出按钮
              title: new Text('Close'),
              trailing: new Icon(Icons.cancel),
              onTap: () => Navigator.of(context).pop(),   //点击后收起侧边栏
            ),
          ],
        ),
      ),
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