import 'dart:convert';
class ZHStoryDetailModel {
  String body = "";
  String imageSource = "";
  String title = "";
  String image;
  String shareUrl = "";
  List js = [];
  String gaPrefix = "";
  List<String> images = [];
  int type;
  num id;
  List<String> css;
  
  ZHStoryDetailModel();

  ZHStoryDetailModel.fromJson(jsonStr) {
    var jsonRes = json.decode(jsonStr.toString());
    if(jsonRes["body"] != null) {
      body = jsonRes["body"].replaceAll(new RegExp('<.+?>'), '');
    }
    // body = jsonRes["body"];
    imageSource = jsonRes["image_source"];
    title = jsonRes["title"];
    image = jsonRes["image"];
    shareUrl = jsonRes["share_url"];
    js = List.from(jsonRes['js']);
    gaPrefix = jsonRes["ga_prefix"];
    images = List.from(jsonRes['images']);
    type = jsonRes["type"];
    id = jsonRes["id"];
    css = List.from(jsonRes['css']);
  }
}