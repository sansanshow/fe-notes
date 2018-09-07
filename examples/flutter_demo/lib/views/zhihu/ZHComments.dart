import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import './api/api.dart';
import './model/ZHStoryCommentsModel.dart';

class ZHComments extends StatelessWidget {
  final num _id;
  ZHComments(this._id);
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new _List(_id);
  }
}

class _List extends StatefulWidget {
  final num _id;
  _List(this._id);
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return new _ListState();
  }
}

class _ListState extends State<_List> with AutomaticKeepAliveClientMixin{
  ZHStoryCommentsModel data = new ZHStoryCommentsModel();
  getShortComments() async{
    await http.read("http://news-at.zhihu.com/api/4/story/${widget._id}/short-comments").then((response) {
      print('--------getShortComments--');
      if(this.mounted) {
        setState(() {
          data = new ZHStoryCommentsModel.fromJson(response);
        });
      }
    });
  }
  List<Widget> _buildList() {
    List<Widget> res = [];
    for(var i = 0; i < data.comments.length; i++){
      res.add(new Item(data.comments[i]));
    }
    return res;
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getShortComments();
  }
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: _buildList(),
    );
    // return new Container(
    //   height: 500.0,
    //   child: new ListView.builder(
    //     itemCount: 10,
    //     itemBuilder: (context, index) {
    //       return new Item();
    //     },
    //   ),
    // );
  }

  // TODO: implement wantKeepAlive
  @override
  bool get wantKeepAlive => true;
}

// new CircleAvatar();
class Item extends StatelessWidget {
  final CommentItem data;
  Item(this.data);

  List<Widget> _buidCommentsDetail() {
    bool hasReplyTo = data?.replyTo != null;
    List<Widget> nameRowItems = [
      new Text(data.author, style: new TextStyle(color: Colors.blueGrey,fontSize: 14.0)),
    ];
    List<Widget> commentColItems = [];
    if(hasReplyTo) {
      nameRowItems.addAll([
        new Text("回复", style: new TextStyle(color: Colors.blue,fontSize: 14.0)),
        new Text(data.replyTo.author, style: new TextStyle(color: Colors.blueGrey,fontSize: 14.0)),
      ]);
      commentColItems.add(new ClipRRect(
        borderRadius: const BorderRadius.all(const Radius.circular(10.0)),
        child: new Container(
          padding: const EdgeInsets.all(5.0),
          color: Colors.grey[400],
          child: new Text('“${data.replyTo.content}”'),)
      ));
    }
    commentColItems.addAll([
      new Text(data?.content != null ? data.content : '', textDirection: TextDirection.ltr),
      new Row(children: <Widget>[
        new Text(new DateTime(data?.time).toString())
      ],)
    ]);
    return [
      new Row(children: <Widget>[
        new Expanded(child: new Row(children: nameRowItems)), // "作者名字"
        new Icon(Icons.thumb_up, size: 14.0, color: Colors.black54,),
        new Container(padding: const EdgeInsets.only(left: 6.0), child: new Text(data.likes.toString()),) // likes 
      ]),
      
      new Wrap(children: <Widget>[// 评论内容
        new Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          // child: new Text(data.content, style: new TextStyle(color: Colors.black87, fontSize: 16.0)), 
          children: commentColItems,  
        )]
      ),

      new Divider(color: Colors.grey)
    ];
  }
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Container(
      child: new Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          // new Icon(Icons.account_circle),
          new ClipOval(child: new Container( // 圆形头像 
            // margin: const EdgeInsets.only(right: 10.0),
            color: Colors.red,
            // // 实现方式：1
            // child: new CircleAvatar(
            //   backgroundImage: new NetworkImage("https://pic3.zhimg.com/v2-5d6b31a8fb55eb0abec268f9fec394ba.jpg"),
            // ),
            // // 实现方式：2
            child: new Padding(
              padding: const EdgeInsets.all(1.0),
              child: new ClipOval(
                child: new FadeInImage.assetNetwork(
                  placeholder: "images/girl.jpg",//预览图
                  fit: BoxFit.fitWidth,
                  image: data?.avatar == null ? "" : data.avatar,
                  width: 40.0,
                  height: 40.0,
                ),
              ),
            ),
          )
          ),
          new Expanded(child: new Container(padding: const EdgeInsets.only(left: 6.0) ,child: new Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children:  _buidCommentsDetail(),
              // new Row(children: <Widget>[
              //   new Expanded(child: Text(data.author, style: new TextStyle(color: Colors.blueGrey,fontSize: 14.0),)), // "作者名字"
              //   new Icon(Icons.thumb_up, size: 14.0, color: Colors.black54,),
              //   new Container(padding: const EdgeInsets.only(left: 6.0), child: new Text(data.likes.toString()),) // likes 
              // ]),
          )))
        ],
      ),
    );
  }
}