import 'dart:convert';
class ZHStoryCommentsModel {
  List comments = [];

  ZHStoryCommentsModel();

  ZHStoryCommentsModel.fromJson(jsonStr) {
    
    print("-ZHStoryCommentsModel---");
    var jsonRes = json.decode(jsonStr);
    var dataArr = jsonRes["comments"];
    for(var i = 0; i < dataArr.length; i++){
      comments.add(new ZHStoryCommentItem.fromJson(dataArr[i]));
    }
  }
}

class ZHStoryCommentItem {
  String author;
  String content;
  String avatar;
  num time;
  _CommentReplyTo replyTo;
  num id;
  num likes;

  ZHStoryCommentItem.fromJson(jsonStr) {
    var jsonRes = jsonStr;
    author = jsonRes["author"];
    content = jsonRes["content"];
    avatar = jsonRes["avatar"];
    time = jsonRes["time"];
    likes = jsonRes["likes"];
    if(jsonStr["reply_to"] != null) {
      replyTo = new _CommentReplyTo.fromJson(jsonStr["reply_to"]);
    }
  }
}

class _CommentReplyTo {
  String content;
  num status;
  num id;
  String author;

  _CommentReplyTo.fromJson(jsonStr) {
    var jsonRes = jsonStr;
    content = jsonRes["content"];
    status = jsonRes["status"];
    id = jsonRes["id"];
    author = jsonRes["author"];
  }
}