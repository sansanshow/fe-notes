import 'package:flutter/material.dart';

import 'package:flutter_swiper/flutter_swiper.dart';

class DetailIndex extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // 标题栏
    Widget titleSection = new Container(
      padding: const EdgeInsets.all(32.0),
      child: new Row(
        children: <Widget>[
          new Expanded(
            child: new Column(
              crossAxisAlignment: CrossAxisAlignment.start, // 列对齐方式，左对齐
              children: <Widget>[
                new Container(
                  padding: const EdgeInsets.only(bottom: 8.0),
                  child: new Text('这是标题栏',
                    style: new TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                new Text('这是副标题栏', style: new TextStyle(color: Colors.grey[500]),)
              ],
            ),
          ),
          new Icon(
            Icons.star,
            color: Colors.red[500],
          ),
          new Text('41')
        ],
      ),
    );

    Column buildButtonColumn(IconData icon, String label) {
      Color color = Theme.of(context).primaryColor;

      return new Column(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          new Icon(icon, color: color),
          new Container(
            padding: const EdgeInsets.only(top: 8.0),
            child: new Text(label,
              style: new TextStyle(
                fontSize: 12.0,
                fontWeight: FontWeight.w400,
                color: color
              ),
            ),
          )
        ],
      );
    }
    // 按钮部分
    Widget buttonSection = new Container(
      child: new Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: <Widget>[
          buildButtonColumn(Icons.call, 'CALL'), // Column
          buildButtonColumn(Icons.near_me, 'ROUTE'), // Column
          buildButtonColumn(Icons.share, 'SHARE'), // Column
        ],
      ),
    );

    // 文本部分
    Widget textSection = new Container(
      padding: const EdgeInsets.all(32.0),
      child: new Text(
        '''
        Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese Alps. Situated 1,578 meters above sea level, it is one of the larger Alpine Lakes. A gondola ride from Kandersteg, followed by a half-hour walk through pastures and pine forest, leads you to the lake, which warms to 20 degrees Celsius in the summer. Activities enjoyed here include rowing, and riding the summer toboggan run.
        ''',
        softWrap: true,
      ),
    );


    return new Scaffold(
      appBar: new AppBar(
        title: new Text('详情页'),
      ),
      body: new ListView(
        children: [
          new Image.asset(
            'images/girl.jpg',
            width: 600.0,
            height: 240.0,
            fit: BoxFit.cover,
          ),
          titleSection,
          buttonSection,
          textSection,
        ],
      ),
    );
  }

}




