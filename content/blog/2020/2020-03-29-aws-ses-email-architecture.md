---
title: AWS SESを利用したメール配信とバウンスメール対策の設計案
date: 2020-03-29
---

## はじめに 

とあるサービスのアプリケーションからのメール配信をAWS SESに切り替えるため、全体的なアーキテクチャを検討した。内容としては参考サイトの内容と被っているが、自分の理解のためにまとめた。

## 現状

- アプリケーションからはDovecot + Postfixで構築したメールサーバーを利用してメール配信をしている
- バウンスメール対応が出来ていない
- OSのサポート期限が迫っている

## 要求

- OSのサポート期限問題を解決したい
- マネージドサービスを利用してインフラ運用の手間を減らしたい = サービス開発に注力したい
- バウンスメール対応をしたい

## アーキテクチャー

上記の現状と要求と満たすため、AWSのドキュメント・各種ブログの記事を参考にして、AWS SESを利用したメール配信アーキテクチャにしたい。

![](/images/blog/2020/2020-03-29-01.png)

### ポイント

- SESを利用することでメールサーバーの構築・運用が不要
- Appからのメール配信はAWS SES経由で行う
    - [Amazon SES とは](https://docs.aws.amazon.com/ja_jp/ses/latest/DeveloperGuide/Welcome.html)
- AWS SESではメール送信の結果をバウンス（不達）、苦情、配達の３つを受け取ることができる。それらの結果は、AWS SNSトピックのHTTPエンドポイントのリクエストを利用して、Appに送信する
    - [Amazon SES 通知を使用したモニタリング](https://docs.aws.amazon.com/ja_jp/ses/latest/DeveloperGuide/monitor-sending-activity-using-notifications.html)
- AppはAWS SNSより受けたリクエストの種類に応じて処理。バウンス・苦情のメールアドレスは、送信失敗メールアドレスとしてDBなどに保持。
- Appからメール配信時は、送信失敗メールアドレスのリストと比較して、対象メールアドレスには送信しないようにする。それ以外の場合は正常なメールアドレスとしてメール送信しても良い。

## おわりに

全体的なアーキテクチャとしては実現できそうなイメージとなった。個々の細かい仕様や設定方法は随時調べる必要はあるが、多分どうにかなるだろう。あとは頑張るのみ。

## 参考

- [AWSのSESでバウンスメール\(bouncemail\)対策。3つの方法とメリット・デメリット \| ブログ｜ベトナムでのオフショア開発とスマートフォンアプリ開発のバイタリフィ](https://vitalify.jp/blog/2018/03/aws-ses-bouncemail.html)
- [Amazon SESとSNSを利用してバウンスメールを自動的にハンドリングする \- $shibayu36\->blog;](https://blog.shibayu36.org/entry/2015/08/27/101815)
- [Amazon SES と SNS を使って バウンスメールを PHPでハンドリング \| ProgramMemo](http://program-memo.com/archives/599)
- [Amazon SES ベストプラクティス&アンチパターン \- 後ろを向いて後退します](http://micpsm.hatenablog.com/entry/2019/12/06/120000)
- [[Node.js]Amazon SNSでHTTPを使って通知を受け取る[aws-sdk-js]](https://dev.classmethod.jp/articles/amazonsns-http/)

