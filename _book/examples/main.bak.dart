import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';
import 'dart:async';

void main() => runApp(new MyApp());
// void main() => runApp(new MaterialApp(
//   title: 'Flutter Demo',
//   home: new MyApp(title: 'Hello Flutter'),
//   routes: <String, WidgetBuilder> {
//       '/a': (BuildContext context) => new MyApp(title: 'page A'),
//       '/b': (BuildContext context) => new MyApp(title: 'page B'),
//       '/c': (BuildContext context) => new MyApp(title: 'page C'),
//     },
//   )
// );

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Hello MyApp',
      home: new RandomWords(),
      routes: <String, WidgetBuilder> {
        '/a': (BuildContext context) => new MyPage(title: 'page A'),
        '/b': (BuildContext context) => new MyHomePage(title: 'page B'),
        '/c': (BuildContext context) => new MyPage(title: 'page C'),
      },
    );
  }
}

class RandomWords extends StatefulWidget {
  @override
  createState() => new RandomWordsState();
}

class RandomWordsState extends State<RandomWords> {
  final _suggestions = <WordPair>[];
  final _saved = new Set<WordPair>();
  final _biggerFont = new TextStyle(fontSize: 18.0, color: Colors.red);

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('ListView Name'),
      ),
      body: _buildSuggestions(),
    );
  }

  Widget _buildSuggestions() {
    return new ListView.builder(
      padding: const EdgeInsets.all(16.0),
      itemBuilder: (context, i) {
        // isOdd 奇数判断 -- 在每一列之前添加分割行
        if (i.isOdd) return new Divider();
        // 语法 "i ~/ 2" 表示i除以2，但返回值是整形（向下取整），比如i为：1, 2, 3, 4, 5
        // 时，结果为0, 1, 1, 2, 2， 这可以计算出ListView中减去分隔线后的实际单词对数量
        final index = i ~/ 2;
        if (index >= _suggestions.length) {
          _suggestions.addAll(generateWordPairs().take(10));
        }
        return _buildRow(_suggestions[index]);
      },
    );
  }

  Widget _buildRow(WordPair pair) {
    final alreadySaved = _saved.contains(pair);
    return new ListTile(
      title: new Text(
        pair.asPascalCase,
        style: _biggerFont,
      ),
      trailing: new Icon(
        alreadySaved ? Icons.favorite : Icons.favorite_border,
        color: alreadySaved ? Colors.red : null,
      ),
      onTap: () {
        if (alreadySaved) {
          Navigator.pushNamed(context, '/a'); // 导航跳转
        } else {
          Navigator.pushNamed(context, '/b'); // 导航跳转
        }
       
        setState(() {
          if (alreadySaved) {
            _saved.remove(pair);
          } else {
            _saved.add(pair);
          }
        });
      },
    );
  }
}

class MyPage extends StatelessWidget {
  MyPage({Key key, this.title}) : super(key: key);
  final String title;

  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(title)
      ),
      // body: new RaisedButton(
      //   child: new Text('Button'),
      //   onPressed:() {
      //     Navigator.pushNamed(context, '/a');
      //   }
      // ),

      // body: new Row(
      //   children: <Widget>[
      //     new Expanded(
      //       child: new Text('Deliver features faster', textAlign: TextAlign.center),
      //     ),
      //     new Expanded(
      //       child: new Text('Craft beautiful UIs', textAlign: TextAlign.center),
      //     ),
      //     new Expanded(
      //       child: new FittedBox(
      //         fit: BoxFit.contain, // otherwise the logo will be tiny
      //         child: const FlutterLogo(),
      //       ),
      //     ),
      //   ],
      // )

      // body: new Column(
      //   children: <Widget>[
      //     new Text('Deliver features faster'),
      //     new Text('Craft beautiful UIs'),
      //     new Expanded(
      //       child: new FittedBox(
      //         fit: BoxFit.contain, // otherwise the logo will be tiny
      //         child: const FlutterLogo(),
      //       ),
      //     ),
      //   ],
      // ),

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