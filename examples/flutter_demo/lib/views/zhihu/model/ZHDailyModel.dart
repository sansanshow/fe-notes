import 'dart:convert';
import './ZHDailyStoryModel.dart';
class ZHDailyModel {
  String date;
  List stories;
  String top_stories;
  ZHDailyModel.fromJson(jsonStr) {
    stories = [];
    var jsonRes = JSON.decode(jsonStr.toString());
    // var jsonRes = jsonStr;
    date = jsonRes["date"];
    var dataArr = jsonRes['stories'];
    for(var i = 0; i < dataArr.length; i++){
      stories.add(new ZHDailyStoryModel.fromJson(dataArr[i]));
    }
  }
}
