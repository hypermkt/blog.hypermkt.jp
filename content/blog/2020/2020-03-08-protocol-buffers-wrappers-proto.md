---
title: Protocol Buffersのwrappers.protoによる副作用とその解決法
date: "2020-03-08"
---

## はじめに

Protocol Buffersの標準型を利用した場合、エレメントに値がセットしないと初期値が設定される仕様があります。これはドキュメントの[こちら](https://developers.google.com/protocol-buffers/docs/proto#optional)で説明されています。しかし、この仕様では nil 判定ができないという問題がありました。

そこでgRPC Pluginとして提供されている `wrappers.proto` を使用することで、nil 判定が可能となりましたが、ある副作用がありました。本記事ではその副作用とその解決方法について紹介します。

## 前提

以下の環境で検証をしました。

- Ruby 2.6.1
- Gem
    - protobuf 3.11.4
    - grpc-tools 1.27.0

## nil判定できない問題とwrappers.protoについて

本件の前提知知識として簡単に紹介します。例えば以下のように定義します。

```
syntax = "proto3";

message SampleMessage {
  int64 age = 1;
  string name = 2;
  bool has_job = 3;
}
```

値が未設定の場合は、型に応じた初期値がセットされてしまいます。

```ruby
irb(main):002:0> SampleMessage.new
=> <SampleMessage: age: 0, name: "", has_job: false>
```

それであれば、 `nil` をセットすれば良いと思いますが、**nilはセットされず**、それでも初期値が設定されてしまします。

```ruby
irb(main):004:0> SampleMessage.new(age: nil, name: nil, has_job: nil)
=> <SampleMessage: age: 0, name: "", has_job: false>
```

つまり、 `nil` 判定ができないので、故意にセットされた値なのか、未セットなのか判定できないという問題が発生します。

### そこで wrappers.protoを使えば nil 判定できる

wrappers.proto で提供される `Google::Protobuf::StringValue` という型を利用することで、

```
syntax = "proto3";

import "google/protobuf/wrappers.proto";

message SampleMessage2 {
  google.protobuf.Int64Value age = 1;
  google.protobuf.StringValue name = 2;
  google.protobuf.BoolValue has_job = 3;
}
```

値が未セットの場合は nil になり、これで値の nil 判定が可能になりました！

```ruby
irb(main):016:0> SampleMessage2.new
=> <SampleMessage2: age: nil, name: nil, has_job: nil>
```

wrappers.protoについては、以下のブログ記事で詳しく解説されていますのでご参考ください。

- [ProtocolBuffersでのwrappers\.protoの使い方 \- Qiita](https://qiita.com/k-o-u/items/cf333a4ce30973524591)
- [ProtocolBuffersでprimitiveのデフォルト値と値が入っていないことを区別したいときにどう書くか \- だいたいよくわからないブログ](https://matsu-chara.hatenablog.com/entry/2016/11/12/110000)
- [protobuf typeに値が入っているか確認するにはgoogle/protobuf/wrappers\.protoをつかうとよい \- 平日インプット週末アウトプットぶろぐ](https://blog.soushi.me/entry/2017/09/03/170655/)

## wrappers.protoで万事解決と思われたが副作用があった


しかし、wrappers.proto で提供される型を使用した場合に副作用がありました。値をセットする際に `Google::Protobuf::Int64Value.new(value: 10)` のようにwrappers.protoで定義されている型別のオブジェクトを渡す必要になり、オブジェクト構造も変わりました。クラス名が地味に長い...

```ruby
irb(main):017:0> foo = SampleMessage2.new(age: Google::Protobuf::Int64Value.new(value: 10), name: Google::Protobuf::StringValue.new(value: 'yamada'), has_job: Google::Protobuf::BoolValue.new(value:true))
=> <SampleMessage2: age: <Google::Protobuf::Int64Value: value: 10>, name: <Google::Protobuf::StringValue: value: "yamada">, has_job: <Google::Protobuf::BoolValue: value: true>>
```

値を取得するときは   `.value` を指定しないといけなくなってしまった。

```ruby
irb(main):018:0> foo.age.value
=> 10
```

Messageオブジェクトをハッシュ化すると以下になります。何が一番困るかというと、通常のkey/valueなハッシュ構造であれば、そのままActiveRecordに渡すことができましたが、以下の構造だとそのまま渡すことができません。これが**今回の本題**です。

```ruby
irb(main):020:0> foo.to_h
=> {:age=>{:value=>10}, :name=>{:value=>"yamada"}, :has_job=>{:value=>true}}
```

## 解決策

`{foo: {value: "bar"}` の構造を`{foo: "bar"}` に変換するため、再帰的にハッシュを精査して該当の箇所を愚直に変換するようにしました。

```ruby
def extract_values(obj)
  case obj
  when Hash
    obj.compact.transform_values do |v|
      if v.kind_of?(Array)
        self.extract_values(v)
      else
        v[:value]
      end
    end
  when Array
    obj.map { |v| self.extract_values(v) }
  else
    obj
  end
end
```

このメソッドにハッシュを渡すと以下のように `{foo: {value: "bar"}` を `{foo: "bar"}` に変換してくれます。

```ruby
irb(main):039:0> foo.to_h
=> {:age=>{:value=>10}, :name=>{:value=>"yamada"}, :has_job=>{:value=>true}}
irb(main):040:0> extract_values(foo.to_h)
=> {:age=>10, :name=>"yamada", :has_job=>true}
```

ハッシュの中に配列があっても問題なしです。万事解決です！

```ruby
irb(main):043:0> a = {foo1: {value: 'bar1'}, foo2: [{hoge2: {value: 'bar2'}}]}
=> {:foo1=>{:value=>"bar1"}, :foo2=>[{:hoge2=>{:value=>"bar2"}}]}
irb(main):044:0> extract_values(a)
=> {:foo1=>"bar1", :foo2=>[{:hoge2=>"bar2"}]}
```

他にも良い方法がありそうだが、今の所これ以上の方法が思いつきませんでした。もし他の方法がありましたら教えてもらえると嬉しいです。

## まとめ

Protocol Buffersでnil判定をした場合には、wrappers.protoに定義された型を使用することで解決をすることができます。しかし、それには構造変化の副作用がありましたが、再帰的にデータを精査して変換処理をかけることで、シンプルな構造に変換する事例を紹介しました。もし同様な悩みを抱えている人がいたら参考になれば幸いです。
