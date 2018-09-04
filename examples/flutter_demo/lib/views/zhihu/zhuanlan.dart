import 'package:flutter/material.dart';
import './daily.dart';

class Zhuanlan extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    // 
    return new ZLMain();
  }
  
}

class ZLMain extends StatefulWidget {
  @override
    State<StatefulWidget> createState() {
      return new ZLMainState();
    }
}

class ZLMainState extends State<ZLMain>  with SingleTickerProviderStateMixin {
  TabController _tabController;

  @override
    void initState() {
      // TODO: implement initState
      super.initState();
      _tabController = new TabController(vsync: this, length: 2);
    }

  @override
  Widget build(BuildContext context) {
    const choices = const <Choice>[
      const Choice(title: '知乎日报'),
      const Choice(title: '新鲜事')
    ];

    Widget buildTab(Choice choice) {
      return new Container(
        padding: const EdgeInsets.all(16.0),
        child: new Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            new Text(choice.title)
          ]
        )
      );
    }

    return new MaterialApp(
      home: new DefaultTabController(
        length: 2,
        child: new Scaffold(
          appBar: new AppBar(
            elevation: 2.0,
            // backgroundColor: Colors.orangeAccent,
            title: new Text('专栏'),
            bottom: new TabBar(
              controller: _tabController,
              // indicatorColor: Theme.of(context).primaryColor,
              // labelColor: Theme.of(context).primaryColor,
              tabs: choices.map( (Choice choice) {
                return buildTab(choice);
              }).toList(),
            ),
          ),
          body: new TabBarView(
            controller: _tabController,
            children: <Widget>[
              new Center(child: new ZHDaily()),
              new Center(child: new Text('新鲜事'))
            ],
          ),
        ),
      ),
    );
  }
}

class Choice {
  const Choice({ this.title, this.icon });
  final String title;
  final IconData icon;
}
