---
title: Kaigi on Rails 2024に参加＆登壇しました
date:
---

2024 年 10 月 25 日, 26 日に開催された Kaigi on Rails 2024 に参加し、「Sidekiq で実現する 長時間非同期処理の中断と再開」というタイトルで発表してきました。Kaigi on Rails は初参加でしたが、スポンサーブース、懇親会で様々な人との交流ととても楽しむことができました。

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/519ed48333bb467f99800676350f6fc3" title="Sidekiqで実現する 長時間非同期処理の中断と再開 / Pausing and Resuming Long-Running Asynchronous Jobs with Sidekiq" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 315;" data-ratio="1.7777777777777777"></iframe>

###

## 発表後にいただいたご意見について

### 非同期処理の再開方法について

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ご質問ありがとうございます！ <br><br>中断したジョブの再エンキューは、Sidekiqのsuper_fetchを利用していました。このsuper_fetchを利用することで、未完了のジョブの再取得を行い、キューに入れて再実行を自動的に行なってくれます。<a href="https://t.co/UDi8uPyzF6">https://t.co/UDi8uPyzF6</a></p>&mdash; ばーちー (@hypermkt) <a href="https://twitter.com/hypermkt/status/1849714976115786147?ref_src=twsrc%5Etfw">October 25, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">tmp table使わない理由気になる。処理データをtmp tableにはいとけば、状態管理も全部アトミックにやれそうな気がする？<a href="https://twitter.com/hashtag/kaigionrails?src=hash&amp;ref_src=twsrc%5Etfw">#kaigionrails</a> <a href="https://twitter.com/hashtag/kaigionrails_blue?src=hash&amp;ref_src=twsrc%5Etfw">#kaigionrails_blue</a></p>&mdash; P山 (@pyama86) <a href="https://twitter.com/pyama86/status/1849692197635096689?ref_src=twsrc%5Etfw">October 25, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">しかしジョブが長すぎるとつらいので分割実行したあとマージするみたいなことを考えたくなりそう、そうも言ってられない要件もあるのかなー <a href="https://twitter.com/hashtag/kaigionrails?src=hash&amp;ref_src=twsrc%5Etfw">#kaigionrails</a> <a href="https://twitter.com/hashtag/kaigionrails_blue?src=hash&amp;ref_src=twsrc%5Etfw">#kaigionrails_blue</a></p>&mdash; うたがわきき (@utgwkk) <a href="https://twitter.com/utgwkk/status/1849693208500138074?ref_src=twsrc%5Etfw">October 25, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">序盤聞けてなかったんだけど、suspend/resume する点でジョブを分割したほうが諸々楽だったりしないのだろうか <a href="https://twitter.com/hashtag/kaigionrails?src=hash&amp;ref_src=twsrc%5Etfw">#kaigionrails</a> <a href="https://twitter.com/hashtag/kaigionrails_blue?src=hash&amp;ref_src=twsrc%5Etfw">#kaigionrails_blue</a></p>&mdash; osyoyu (@osyoyu) <a href="https://twitter.com/osyoyu/status/1849692794916569491?ref_src=twsrc%5Etfw">October 25, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
