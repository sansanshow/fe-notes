import 'dart:convert';
class DailyModel {
  String date;
  List stories;
  String top_stories;
  DailyModel.fromJson(jsonStr) {
    stories = [];
    var jsonRes = JSON.decode(jsonStr.toString());
    // var jsonRes = jsonStr;
    date = jsonRes["date"];
    var dataArr = jsonRes['stories'];
    for(var i = 0; i < dataArr.length; i++){
      print(dataArr[i]["type"]);
      stories.add(new Story.fromJson(dataArr[i]));
    }
  }
}
class Story {
  List images;
  int type;
  int id;
  String ga_prefix;
  String title;
  Story.fromJson(jsonStr) {
    var jsonRes = jsonStr;
    type = jsonRes["type"];
    id = jsonRes['id'];
    ga_prefix = jsonRes['ga_prefix'];
    title = jsonRes['title'];
    images = new List.from(jsonRes['images']);
  }
  String getFirstImageUrl() {
    return images.length > 0 ? images[0] : null;
  }
  @override
  String toString() {
    return '[id: $id, type: $type, ga_prefix: $ga_prefix, title: $title], images: ${images.toString()}';
  }
}