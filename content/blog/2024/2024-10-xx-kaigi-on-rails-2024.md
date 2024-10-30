---
title: Kaigi on Rails 2024に参加＆登壇しました
date:
---

2024 年 10 月 25 日, 26 日に開催された Kaigi on Rails 2024 に参加し、「Sidekiq で実現する 長時間非同期処理の中断と再開」というタイトルで発表してきました。

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/519ed48333bb467f99800676350f6fc3" title="Sidekiqで実現する 長時間非同期処理の中断と再開 / Pausing and Resuming Long-Running Asynchronous Jobs with Sidekiq" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 315;" data-ratio="1.7777777777777777"></iframe>

## 発表の経緯

SmartHRに入社して5年が経とうとしていますが、転職や子育ても重なり、イベントでの参加や発表から遠ざかっていました。今回、久しぶりに発表しようと思ったきっかけがありました。

1つめは、今年の前半にチームのエンジニアマネージャーから「技術的リードを手伝ってほしい」とのフィードバックをもらったことです。その際、前職のGMOペパボで学んだ「アウトプットの重要性」を思い出しました。自身の知見が誰かにとって有益かもしれないという考えのもと、アウトプットを通じて技術力を向上させることが、チームにも良い影響を与えると感じたのです。

2つめは、社内メンバーからの「Kaigi on RailsにCFPを出しませんか？ネタ出しサポートします！」という声かけでした。

最後にチームで長時間非同期処理の課題にチームで取り組んでいたことです。その過程で学んだ中断・再開という技術を学び、長時間非同期処理の課題は、他のエンジニアや企業にも同様のニーズがあるのでは？と感じ、CFPを出そうと考えました。

## 社内レビューに感謝

資料作成の過程では、社内レビューや発表会を通じて多くのフィードバックを頂きました。技術的な正しさ、ストーリーの一貫性や文章のつながり、読みやすさ、さらにプロジェクター投影時のコードの見やすさなど、さまざまな観点から意見をもらい、資料をブラッシュアップすることができました。そのおかげで自信を持って発表に臨める資料に仕上がったと感じています。ありがとうございました。

## 発表後にフィードバックを頂きました！！

大変ありがたいことですが、発表後に質問やこうすると良かったのでは？とご意見を頂きました。抜粋してご紹介します。

### 非同期処理のデータを分割して最後にマージできないか

 <blockquote class="twitter-tweet"><p lang="ja" dir="ltr">しかしジョブが長すぎるとつらいので分割実行したあとマージするみたいなことを考えたくなりそう、そうも言ってられない要件もあるのかなー <a href="https://twitter.com/hashtag/kaigionrails?src=hash&amp;ref_src=twsrc%5Etfw">#kaigionrails</a> <a href="https://twitter.com/hashtag/kaigionrails_blue?src=hash&amp;ref_src=twsrc%5Etfw">#kaigionrails_blue</a></p>&mdash; うたがわきき (@utgwkk) <a href="https://twitter.com/utgwkk/status/1849693208500138074?ref_src=twsrc%5Etfw">October 25, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

直接お会いしてご意見を頂きました。

頂いたご意見の要約としては以下だった記憶があります。（間違えていたらすいません...!）

* そもそも非同期処理の実行時間が長いのが良くない
* 非同期処理の対象データに依存性がなければ、一定の単位で分割して非同期で処理する
* 処理がすべて終わったらマージして結果として返すのはどうか
* AWS Step Functionなら可能かも。Google Cloudでも同様のものがあるでしょう。

正直なところ、その発想はありませんでした。データ的には依存性はないため、仕様的には分割可能です。
そもそも非同期処理の実行時間が長いのは課題なのは仰るとおりでしたので、実行時間を短縮するための案としてありだと思いました。

### 処理データをtmp tableにはいとけば、状態管理も全部アトミックにやれそうな気がする

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">tmp table使わない理由気になる。処理データをtmp tableにはいとけば、状態管理も全部アトミックにやれそうな気がする？<a href="https://twitter.com/hashtag/kaigionrails?src=hash&amp;ref_src=twsrc%5Etfw">#kaigionrails</a> <a href="https://twitter.com/hashtag/kaigionrails_blue?src=hash&amp;ref_src=twsrc%5Etfw">#kaigionrails_blue</a></p>&mdash; P山 (@pyama86) <a href="https://twitter.com/pyama86/status/1849692197635096689?ref_src=twsrc%5Etfw">October 25, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


Temporary Tableについて教えていただきありがとうございます。

今回の中断・再開の仕組みは、数年前に設計されたもので、自分が導入に関わっていなかったためTemporary Tableを利用しなかった背景は不明です。ただ、調査を進める中でTemporary Tableでも状態管理が可能だと感じています。

一時テーブルが「セッション内のみ有効」という特徴から、短時間のジョブに適していることがわかりました。長時間のジョブで一時的に処理が停止する場合、Temporary Tableのデータが消えるリスクがあるため、中断のない運用に変更するか、別の工夫が必要になるかもしれません。

Temporary Tableはこれまで考慮していなかった選択肢でしたが、今後の改善の参考にさせていただきます！

## おわりに

Kaigi on Rails は初参加でしたが、スポンサーブース、懇親会で様々な人との交流ととても楽しむことができました。また久しぶりの登壇を通じて忘れていた何かを思い出すことができました。来年の Kaigi on Rails 2025もぜひ参加したいと思います。もちろん来年も登壇を目指します！

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">SmartHRは、Kaigi on Rails 2024に協賛しています。<br>みんなで記念撮影！<br>2枚目は、登壇直後の <a href="https://twitter.com/ymtdzzz?ref_src=twsrc%5Etfw">@ymtdzzz</a> <a href="https://twitter.com/hypermkt?ref_src=twsrc%5Etfw">@hypermkt</a> と、明日登壇の <a href="https://twitter.com/asonas?ref_src=twsrc%5Etfw">@asonas</a><a href="https://twitter.com/hashtag/kaigionrails?src=hash&amp;ref_src=twsrc%5Etfw">#kaigionrails</a><a href="https://t.co/COTFotyqDx">https://t.co/COTFotyqDx</a> <a href="https://t.co/keXJsVOupB">pic.twitter.com/keXJsVOupB</a></p>&mdash; SmartHR Developers (@smarthr_dev) <a href="https://twitter.com/smarthr_dev/status/1849697221517902294?ref_src=twsrc%5Etfw">October 25, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>