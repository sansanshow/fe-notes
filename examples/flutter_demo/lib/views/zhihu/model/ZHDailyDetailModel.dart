import 'dart:convert';
class ZHDailyDetailModel {
  String body;
  String image_source;
  String title;
  String image;
  String share_url;
  List js;
  String ga_prefix;
  List<String> images;
  int type;
  num id;
  List<String> css;

  ZHDailyDetailModel.fromJson(jsonStr) {
    var jsonRes = JSON.decode(jsonStr.toString());
    body = jsonRes["body"];
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