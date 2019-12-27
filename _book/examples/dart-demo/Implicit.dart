class Person {
  final _name;
  Person(this._name);
  String greet(String who) => "Hi ${who}, i'm ${_name}";
}

class Imposer implements Person {
    final _name = "";
    String greet(String who) => "Hi ${who}, do you know who i am";
}
greetBob(Person person) => person.greet('bob');
main(List<String> args) {
  greetBob(new Person('Kaliy'));
  greetBob(new Imposer());
}