import 'dart:convert';
import './ZHStoryModel.dart';
class ZHDailyItemModel {
  String date;
  List stories;
  String top_stories;
  ZHDailyItemModel.fromJson(jsonStr) {
    stories = [];
    var jsonRes = JSON.decode(jsonStr.toString());
    // var jsonRes = jsonStr;
    date = jsonRes["date"];
    var dataArr = jsonRes['stories'];
    for(var i = 0; i < dataArr.length; i++){
      stories.add(new ZHStoryModel.fromJson(dataArr[i]));
    }
  }
}
