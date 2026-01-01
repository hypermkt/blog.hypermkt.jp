---
title: 最近出会ったRubyの便利メソッド復習
date: 2021-04-01
categories:
  - Ruby
---

## はじめに

開発の過程やコードレビューで便利メソッドに出会ったので、次回からすぐに使えるように備忘録としてまとめておく。

## ActiveSupport の try

### nil でない時に何かしたいときに便利

そういうとき、よくありますよね。

```ruby
name = nil
p name.upcase if name.present?
```

そんな時には ActiveSupport の [try](https://railsguides.jp/active_support_core_extensions.html#try) が便利だった。ちょっとした処理でもスマートにかけるのいいですねー。

```ruby
name = nil
name.try(:upcase)

# ブロックを渡すことできる
name.try { |v| v.upcase }
```

## Enumerable#group_by

### 仕分けには group_by は便利

例えば `people` という人の集まりの配列があり、大人と子供で仕分けしたいとする。そんな時には [Enumerable#group_by](https://docs.ruby-lang.org/ja/latest/method/Enumerable/i/group_by.html) がめっちゃ便利だった。

ポイントとしてはブロックで評価した結果をキーとしてハッシュにセットされるので、そこは好きなものをセットするのが良さそう。

```ruby
people = [
  { name: 'Max', age: 30 },
  { name: 'John', age: 20 },
  { name: 'Michael', age: 10 },
]
result = people.group_by do |v|
  if v[:age] >= 20
    :adult
  else
    :child
  end
end

p result
```

いやー、これは便利だわ。

```ruby
$ ruby group_by.rb
{:adult=>[{:name=>"Max", :age=>30}, {:name=>"John", :age=>20}], :child=>[{:name=>"Michael", :age=>10}]}
```

## Array#sort

データベースからデータを取得する場合は order by をすればいいが、API のレスポンスや CSV データを任意の条件で並び替えたい時に [Array#sort](https://docs.ruby-lang.org/ja/latest/method/Array/i/sort.html) が便利だった

対象の配列に対して比較条件をブロックで渡すだけで OK。いやぁ、知らなかったなー。

```ruby
people = [
  { name: 'Max', age: 10 },
  { name: 'John', age: 30 },
  { name: 'Michael', age: 20 },
]

# age の昇順に並び替え
p people.sort { |a, b| a[:age] <=> b[:age] }
# => [{:name=>"Max", :age=>10}, {:name=>"Michael", :age=>20}, {:name=>"John", :age=>30}]

# b, a を入れ替えることで age の降順に並び替え
p people.sort { |a, b| b[:age] <=> a[:age] }
# => [{:name=>"John", :age=>30}, {:name=>"Michael", :age=>20}, {:name=>"Max", :age=>10}]
```

ポイントは `<=>` 演算子による数値の比較。a, b をそのまま比較すれば昇順となるので、b, a で比較すれば降順となる。なるほどなぁ〜。

```ruby
[1] pry(main)> 100 <=> 200
=> -1
[2] pry(main)> 200 <=> 100
=> 1
[3] pry(main)> 100 <=> 100
=> 0
```

## Enumerable#sort_by

sort_by というのもあるんですねぇ。

- ブロックの評価結果を <=> メソッドで比較することで、self を昇順にソートします

なるほどー。 パフォーマンス的にも sort よりも優れていると能登なので、基本的にはこちらを使うのが良さそう。

```ruby
[4] pry(main)> [1, 3, 2, 5].sort_by { |v| v }
=> [1, 2, 3, 5]
```

以上!

## 参考

- [Active Support コア拡張機能 - Rails ガイド](https://railsguides.jp/active_support_core_extensions.html#try)
- [Enumerable#group_by (Ruby 3.0.0 リファレンスマニュアル)](https://docs.ruby-lang.org/ja/latest/method/Enumerable/i/group_by.html)
- [Array#sort (Ruby 3.0.0 リファレンスマニュアル)](https://docs.ruby-lang.org/ja/latest/method/Array/i/sort.html)
- [Enumerable#sort_by (Ruby 3.0.0 リファレンスマニュアル)](https://docs.ruby-lang.org/ja/latest/method/Enumerable/i/sort_by.html)
