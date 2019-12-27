class ZHDailyStoryModel {
  List images;
  int type;
  int id;
  String gaPrefix;
  String title;
  ZHDailyStoryModel.fromJson(jsonStr) {
    var jsonRes = jsonStr;
    type = jsonRes["type"];
    id = jsonRes['id'];
    gaPrefix = jsonRes['ga_prefix'];
    title = jsonRes['title'];
    images = new List.from(jsonRes['images']);
  }
  String getFirstImageUrl() {
    return images.length > 0 ? images[0] : null;
  }
  @override
  String toString() {
    return '[id: $id, type: $type, ga_prefix: $gaPrefix, title: $title], images: ${images.toString()}';
  }
}