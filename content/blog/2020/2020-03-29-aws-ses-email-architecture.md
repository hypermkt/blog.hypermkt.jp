---
title: AWS SESを利用したメール配信とバウンスメール対策の設計案
date: 2020-03-29
cateogories:
  - AWS
  - SES
---

## はじめに

とあるサービスのアプリケーションからのメール配信を AWS SES に切り替えるため、全体的なアーキテクチャを検討した。内容としては参考サイトの内容と被っているが、自分の理解のためにまとめた。

## 現状

- アプリケーションからは Dovecot + Postfix で構築したメールサーバーを利用してメール配信をしている
- バウンスメール対応が出来ていない
- OS のサポート期限が迫っている

## 要求

- OS のサポート期限問題を解決したい
- マネージドサービスを利用してインフラ運用の手間を減らしたい = サービス開発に注力したい
- バウンスメール対応をしたい

## アーキテクチャー

上記の現状と要求と満たすため、AWS のドキュメント・各種ブログの記事を参考にして、AWS SES を利用したメール配信アーキテクチャにしたい。

![](/images/blog/2020/2020-03-29-01.png)

### ポイント

- SES を利用することでメールサーバーの構築・運用が不要
- App からのメール配信は AWS SES 経由で行う
  - [Amazon SES とは](https://docs.aws.amazon.com/ja_jp/ses/latest/DeveloperGuide/Welcome.html)
- AWS SES ではメール送信の結果をバウンス（不達）、苦情、配達の３つを受け取ることができる。それらの結果は、AWS SNS トピックの HTTP エンドポイントのリクエストを利用して、App に送信する
  - [Amazon SES 通知を使用したモニタリング](https://docs.aws.amazon.com/ja_jp/ses/latest/DeveloperGuide/monitor-sending-activity-using-notifications.html)
- App は AWS SNS より受けたリクエストの種類に応じて処理。バウンス・苦情のメールアドレスは、送信失敗メールアドレスとして DB などに保持。
- App からメール配信時は、送信失敗メールアドレスのリストと比較して、対象メールアドレスには送信しないようにする。それ以外の場合は正常なメールアドレスとしてメール送信しても良い。

## おわりに

全体的なアーキテクチャとしては実現できそうなイメージとなった。個々の細かい仕様や設定方法は随時調べる必要はあるが、多分どうにかなるだろう。あとは頑張るのみ。

## 参考

- [AWS の SES でバウンスメール\(bouncemail\)対策。3 つの方法とメリット・デメリット \| ブログ｜ベトナムでのオフショア開発とスマートフォンアプリ開発のバイタリフィ](https://vitalify.jp/blog/2018/03/aws-ses-bouncemail.html)
- [Amazon SES と SNS を利用してバウンスメールを自動的にハンドリングする \- $shibayu36\->blog;](https://blog.shibayu36.org/entry/2015/08/27/101815)
- [Amazon SES と SNS を使って バウンスメールを PHP でハンドリング \| ProgramMemo](http://program-memo.com/archives/599)
- [Amazon SES ベストプラクティス&アンチパターン \- 後ろを向いて後退します](http://micpsm.hatenablog.com/entry/2019/12/06/120000)
- [[Node.js]Amazon SNSでHTTPを使って通知を受け取る[aws-sdk-js]](https://dev.classmethod.jp/articles/amazonsns-http/)
