import 'dart:convert';
class ZHStoryDetailModel {
  String body = "";
  String image_source = "";
  String title = "";
  String image;
  String share_url = "";
  List js = [];
  String ga_prefix = "";
  List<String> images = [];
  int type;
  num id;
  List<String> css;
  
  ZHStoryDetailModel();

  ZHStoryDetailModel.fromJson(jsonStr) {
    var jsonRes = JSON.decode(jsonStr.toString());
    if(jsonRes["body"] != null) {
      body = jsonRes["body"].replaceAll(new RegExp('<.+?>'), '');
    }
    // body = jsonRes["body"];
    image_source = jsonRes["image_source"];
    title = jsonRes["title"];
    image = jsonRes["image"];
    share_url = jsonRes["share_url"];
    js = List.from(jsonRes['js']);
    ga_prefix = jsonRes["ga_prefix"];
    images = List.from(jsonRes['images']);
    type = jsonRes["type"];
    id = jsonRes["id"];
    css = List.from(jsonRes['css']);
  }
}