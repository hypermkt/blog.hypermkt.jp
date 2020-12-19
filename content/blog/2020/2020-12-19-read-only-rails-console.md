---
title: 安全にRails Consoleが使いたい
date: 2020-12-19
---

この記事は、[SmartHR Advent Calender 2020 20日目](https://qiita.com/advent-calendar/2020/smarthr)です。

## 背景

サービスの運用上、利用状況の調査などで本番データベースからデータ取得したいことがあります。DBにRead Onlyユーザーを作成しDBのクライアントツールやRedashなどからSQLを利用するケースが多いと思います。
ほとんどのユースケースではそれで事足りるのですが、Rails ConsoleからActive Recordや実装した機能を組み合わせてデータ取得したいと感じることが何度かありました。
ただ普通にRails Consoleを起動するとDBのMaster側に接続されるので、操作ミスによるデータ更新やDBに高負荷をかけてしまいサービス影響を与えてしまう恐れがありました。

そこで本記事では 安心 & 安全に利用できるRead Only Rails Console の導入方法について紹介します。

## 解決したい課題
1. Rails Consoleを参照専用で利用したい
2. 重たい処理を実行してもサービス影響が無いようにしたい

## TL;DR
- リードレプリカ環境を用意する
- DB接続の接続情報をリードレプリカ環境の情報に上書きしてRails Consoleを起動するだけ
- サービス運用では重宝するツールとなるのでオススメ

## 検証環境

- Rails 6.0
- PostgreSQL
    - MySQL でも同じことは可能です

## sandbox モードがあるよね！

`rails console --sandbox` で起動をすると Sandbox モードとなりコンソールを抜けるとSQLがすべてロールバックされるので課題1は解決できます！
ですが、万が一サーバー負荷を与えるような Active Record を実行してしまった場合は、サービス影響も与えてしまう懸念があるので安心できないなぁと感じてました。

refs: [Rails のコマンドラインツール \- Railsガイド](https://railsguides.jp/command_line.html#rails-console)

そこでとても単純な方針ですかサービスが直接が利用しないリードレプリカ環境を用意して、そこにRails ConsoleのDBが接続するようにすれば両方の課題が解決できます！

## 手順

### ステップ１: リードレプリカ環境を用意する
DBのスレーブサーバーを構築し、SELECTのみを許可したREAD ONLYユーザーを用意します。AWS RDSでクラスターを組んでいる場合は[リードレプリカ](http://e-words.jp/w/%E3%83%AA%E3%83%BC%E3%83%89%E3%83%AC%E3%83%97%E3%83%AA%E3%82%AB.html)を利用するもOKです。
もし環境の都合でリードレプリカ環境が用意できない場合は、Master側にREAD ONLYユーザーを用意するだけでも良いです。

(さらっと言いましたが地味にこの環境を用意するのが大変ですね)

### ステップ２: リードレプリカ環境の環境変数を設定する

例: 

```bash
export READ_ONLY_DATABASE_URL=postgres://read_only_user:password@read_replica_host:5432/database
```

### ステップ３: リードレプリカ環境を利用するRails Consoleの起動スクリプトを用意する

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

本番サーバーにデプロイ後、 `bin/production_read_only/rails c` と実行すればREAD ONLYなRails Consoleとして利用できます！ 🎉

## まとめ

今回用意したスクリプトや方針自体は大した内容ではないですが、Rails Consoleがユーザー影響を与えることなく安全に利用できるようになりました。
サービス運用の観点ではとても重宝するツールとなりますので、興味のある方はぜひ試してみてください。

## 参考

- [Active Record で複数のデータベース利用 - Railsガイド](https://railsguides.jp/active_record_multiple_databases.html)
- [Rails のコマンドラインツール \- Railsガイド](https://railsguides.jp/command_line.html#rails-console)

