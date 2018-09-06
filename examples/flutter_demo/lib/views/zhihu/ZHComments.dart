import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
class ZHComments extends StatelessWidget {
  final num _id;
  ZHComments(this._id);
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new _List();
  }

}
class _List extends StatefulWidget {
@override
State<StatefulWidget> createState() {
  // TODO: implement createState
  return new _ListState();
}
}
class _ListState extends State<_List> {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Container(
      height: 500.0,
      child: new ListView.builder(
        itemCount: 10,
        itemBuilder: (context, index) {
          return new Item();
        },
      ),
    );
  }
}
// new CircleAvatar();
class Item extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Container(
      child: new Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          // new Icon(Icons.account_circle),
          new Container( // 圆形头像 
            margin: const EdgeInsets.only(right: 10.0),
            // // 实现方式：1
            // child: new CircleAvatar(
            //   backgroundImage: new NetworkImage("https://pic3.zhimg.com/v2-5d6b31a8fb55eb0abec268f9fec394ba.jpg"),
            // ),
            // // 实现方式：2
            child: new ClipOval(
              child: new FadeInImage.assetNetwork(
                placeholder: "images/normal_user_icon.webp",//预览图
                fit: BoxFit.fitWidth,
                image:"https://pic3.zhimg.com/v2-5d6b31a8fb55eb0abec268f9fec394ba.jpg",
                width: 40.0,
                height: 40.0,
              ),
            ),
          ),
          new Expanded(child: new Column(
            children: <Widget>[
              new Row(children: <Widget>[
                new Expanded(
                  child: Text("作者名字", style: new TextStyle(color: Colors.blueGrey,fontSize: 14.0),)),
                new Icon(Icons.thumb_up, size: 14.0, color: Colors.black54,),
                new Text('10') 
                
              ]),
              new Row(children: <Widget>[new Container(
                child: new Text("评论内容", style: new TextStyle(color: Colors.black87, fontSize: 16.0)),
              )],),
              // new Row(children: <Widget>[
              //   new Icon(Icons.thumb_up, size: 18.0,),
              //   new Text('10')
              // ],),
              new Divider(color: Colors.grey,)
            ],
          ),)
        ],
      ),
    );
  }
}