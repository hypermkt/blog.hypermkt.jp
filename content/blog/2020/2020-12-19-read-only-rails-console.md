---
title: 安全にRails Consoleが使いたい
date: 2020-12-19
categories:
  - Ruby on Rails
---

この記事は、[SmartHR Advent Calender 2020 20 日目](https://qiita.com/advent-calendar/2020/smarthr)です。

## 背景

サービスの運用上、利用状況の調査などで本番データベースからデータ取得したいことがあります。DB に Read Only ユーザーを作成し DB のクライアントツールや Redash などから SQL を利用するケースが多いと思います。
ほとんどのユースケースではそれで事足りるのですが、Rails Console から Active Record や実装した機能を組み合わせてデータ取得したいと感じることが何度かありました。
ただ普通に Rails Console を起動すると DB の Master 側に接続されるので、操作ミスによるデータ更新や DB に高負荷をかけてしまいサービス影響を与えてしまう恐れがありました。

そこで本記事では 安心 & 安全に利用できる Read Only Rails Console の導入方法について紹介します。

## 解決したい課題

1. Rails Console を参照専用で利用したい
2. 重たい処理を実行してもサービス影響が無いようにしたい

## TL;DR

- リードレプリカ環境を用意する
- DB 接続の接続情報をリードレプリカ環境の情報に上書きして Rails Console を起動するだけ
- サービス運用では重宝するツールとなるのでオススメ

## 検証環境

- Rails 6.0
- PostgreSQL
  - MySQL でも同じことは可能です

## sandbox モードがあるよね！

`rails console --sandbox` で起動をすると Sandbox モードとなりコンソールを抜けると SQL がすべてロールバックされるので課題 1 は解決できます！
ですが、万が一サーバー負荷を与えるような Active Record を実行してしまった場合は、サービス影響も与えてしまう懸念があるので安心できないなぁと感じてました。

refs: [Rails のコマンドラインツール \- Rails ガイド](https://railsguides.jp/command_line.html#rails-console)

そこでとても単純な方針ですかサービスが直接が利用しないリードレプリカ環境を用意して、そこに Rails Console の DB が接続するようにすれば両方の課題が解決できます！

## 手順

### ステップ１: リードレプリカ環境を用意する

DB のスレーブサーバーを構築し、SELECT のみを許可した READ ONLY ユーザーを用意します。AWS RDS でクラスターを組んでいる場合は[リードレプリカ](http://e-words.jp/w/%E3%83%AA%E3%83%BC%E3%83%89%E3%83%AC%E3%83%97%E3%83%AA%E3%82%AB.html)を利用するも OK です。
もし環境の都合でリードレプリカ環境が用意できない場合は、Master 側に READ ONLY ユーザーを用意するだけでも良いです。

(さらっと言いましたが地味にこの環境を用意するのが大変ですね)

### ステップ２: リードレプリカ環境の環境変数を設定する

例:

```bash
export READ_ONLY_DATABASE_URL=postgres://read_only_user:password@read_replica_host:5432/database
```

### ステップ３: リードレプリカ環境を利用する Rails Console の起動スクリプトを用意する

Rails アプリケーション内の `bin/production_read_only/rails` に以下をスクリプトを配置します。

```bash
#!/bin/bash

if [ -z "$READ_ONLY_DATABASE_URL" ]; then
    echo "READ_ONLY_DATABASE_URL is empty"
    exit 1
fi

export DATABASE_URL=$READ_ONLY_DATABASE_URL
bin/rails $@
```

本番サーバーにデプロイ後、 `bin/production_read_only/rails c` と実行すれば READ ONLY な Rails Console として利用できます！ 🎉

## まとめ

今回用意したスクリプトや方針自体は大した内容ではないですが、Rails Console がユーザー影響を与えることなく安全に利用できるようになりました。
サービス運用の観点ではとても重宝するツールとなりますので、興味のある方はぜひ試してみてください。

## 参考

- [Active Record で複数のデータベース利用 - Rails ガイド](https://railsguides.jp/active_record_multiple_databases.html)
- [Rails のコマンドラインツール \- Rails ガイド](https://railsguides.jp/command_line.html#rails-console)
