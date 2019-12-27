import 'dart:convert';
import 'package:http/http.dart' as http;

class _URL {
  static const String DAILY_LIST = "https://news-at.zhihu.com/api/4/news/latest";
  static const String BEFORE_LIST = "https://news-at.zhihu.com/api/4/news/before/"; //https://news-at.zhihu.com/api/4/news/before/20131119
  static const String DAILY_EXTRA_LIST = "https://news-at.zhihu.com/api/4/story-extra/"; // https://news-at.zhihu.com/api/4/story-extra/#{id}
  static const String DAILY_DETAIL = "http://news-at.zhihu.com/api/4/news/"; // http://news-at.zhihu.com/api/4/news/#{id}
  static const String SHORT_COMMENTS = "http://news-at.zhihu.com/api/4/story/id/short-comments";
}

class API {
  static getList () async {
    return await http.read(_URL.DAILY_LIST);
  }
  static getDetail (int id) async {
    return http.get(_URL.DAILY_DETAIL + id.toString());
  }
}