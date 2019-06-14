> 源代码位置：exapmles/typescript


```
interface StringDictionary {
  name: string;
  age: number; // 此处报错：[ts] Property 'age' of type 'number' is not assignable to string index type 'string'.
  [index: string]: string;
}
interface StringDictionary2 {
  [index: number]: string;
  name: number;
}
```

> ## 分析原因：
 以上StringDictionary 报错的原因是：[index: string]: string 与 age: number 冲突   
 age 是string 类型的： 与[index: string] 匹配 ，[index: string]返回值启期待是string类型  
 但是age的返回值是number类型，所以出错
 