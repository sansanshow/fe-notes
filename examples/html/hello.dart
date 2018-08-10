var name = 'Jack';
main(List<String> args) {
  const ori = 20;
  const num1 = 25;
  final sum = 10 + num1;

  //
  var foo = const [];   // foo is currently an EIA.
  final bar = const []; // bar will always be an EIA.
  const baz = const []; // baz is a compile-time constant EIA.
  // foo.add(1);
  num someNum = -123;
  // someNum.abs();
  print('Hello world ${name.toUpperCase()}, $sum, ${(-1245).abs()}');
  print('--------------');
  var s1 = 'String ' 'concatenation'
         " works even over line breaks.";
  print(s1);

  // 多行
  var s2 = '''
You can create
multi-line strings like this one.
''';

  print(s2);
  print('--------------');
String s3 = """This is also a
multi-line string.""";
  print(s3);
  print('--------------');
  var s4 = "In a raw string, even \n isn't special.";
  print(s4);
  print('--------------');
  var s5 = r"In a raw string, even \n isn't special.";
  print(s5);
  print('--------------');
  const aConstNum = 0;
  for (var char in 'hello'.split('')) {
    print(char);
  }
  print('--------------');
  var numbers = new RegExp(r'\d+');
  var someDigits = 'llamas live 15 to 20 years';
  var resOut = someDigits.replaceAll(numbers, "XX");
  print(resOut);
  print('--------------');

  // Set 相关
  var set1 = new Set();
  set1.addAll(['gold', 'green', 'red']);

  var set2 = new Set.from(['green', 'blue']);
  var comm = set1.intersection(set2);
  print(set1);
  print('set1.intersection(set2): ${comm}');
  print('--------------');

  var hawaiianBeaches = {
    "Test"      : 'String',
    'Oahu'      : ['Waikiki', 'Kailua', 'Waimanalo'],
    'Big Island': ['Wailea Bay', 'Pololu Beach'],
    'Kauai'     : ['Hanalei', 'Poipu']
  };
  hawaiianBeaches['Oahu'] = ['Waikiki', 'Kailua'];
  print("hawaiianBeaches['Oahu']: ${hawaiianBeaches['Oahu']}");
  var keys = hawaiianBeaches.keys; // --> Iterable<String>
  print(keys);
  var set3 = new Set.from(keys);
  print(set3);

  var values = hawaiianBeaches.values;
  print(values.length == 3);
  print("values.any((v) => v.toString().contains('Waikiki'))：${values.any((v) => v.toString().contains('Waikiki'))}" );
  values.forEach((i) => print(i));
  print(hawaiianBeaches.containsKey('Oahu1222'));
  hawaiianBeaches.putIfAbsent('Oahu', () => ['sssss']);
  print('--------------');

  var teas = ['green', 'black', 'chamomile', 'earl grey'];

  var loudTeas = teas.map((tea) => tea.toUpperCase());
  print(loudTeas);
  print(loudTeas.toList());
  loudTeas.forEach(print);
  //
  print('---------------');
  bool isDecaffeinated(String teaName) => teaName == 'chamomile';
  var ls = teas.any((teaName) => isDecaffeinated(teaName));
  print(ls);
  print('---------------');
  var ls2 = teas.where((teaName) => isDecaffeinated(teaName));
  print(ls2);
  print('---------------');

  print('-------Uri\'s start--------');
  var uri = 'http://example.org/api?foo=some message';
  var encodeUri = Uri.encodeFull(uri);
  print(encodeUri);
  print(Uri.decodeFull(encodeUri));
  var encodeComponentUri = Uri.encodeComponent(uri);
  print("Uri.encodeComponent(uri): ${encodeComponentUri}");
  print("Uri.decodeComponent(encodeComponentUri): ${Uri.decodeComponent(encodeComponentUri)}");

  var uriObj = Uri.parse('http://example.org:8080/foo/bar#frag');
  print("uriObj.path:${uriObj.path}");
  print("uriObj.scheme:${uriObj.scheme}");
  print("uriObj.fragment:${uriObj.fragment}");
  print("uriObj.port:${uriObj.port}");
  print("uriObj.origin:${uriObj.origin}");
  print("uriObj.host:${uriObj.host}");
  print("uriObj.queryParameters:${uriObj.queryParameters}");
  print("uriObj.authority:${uriObj.authority}");
  print('-------Uri\'s end--------');
  print('>>>>------Dates and times start--------');
  var y2k = new DateTime(2000);
  var y2001 = y2k.add(const Duration(days: 365));
  print(y2001);
  print('<<<<---Dates and times end--------');


  var res = (true ? 0 : -1) ?? null;
  print("res：${res}");
  print(0 == null ? 1 : -1);
  // String toString() => msg ?? super.toString();
}
class Person {
  // String toString() {
  //   if (msg == null) {
  //     return super.toString();
  //   } else {
  //     return msg;
  //   }
  // }

}
