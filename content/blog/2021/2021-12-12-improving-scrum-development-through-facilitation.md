---
title: ファシリテーションでスクラム開発の改善に取り組んだ話
date: 2021-12-12
---

こんにちは、ばーちーです！この記事は [SmartHR Advent Calendar 2021 12日目](https://qiita.com/advent-calendar/2021/smarthr)の記事です。

ブログ記事、前回書いたのが2021/04/01だったので随分時間が空いてしまいました。今回は自分が所属するチームで取り組んだお話を紹介したいと思います。

## はじめに

みなさんはスクラム開発をしていますか？ SmartHRでは、すべてのプロダクトチームでスクラム開発をしています。

スクラム開発にはプランニング、レトロスペクティブなど様々なイベントがありますが、各イベントで共通しているのはメンバーとの議論で、如何に意見の発散と収束させられるかがポイントです。しかし、いざスクラムイベントに参加して見ると「レトロスペクティブでTryがまとめられないなぁ〜」「リファイメントをしたのにいざ着手すると漏れがあるなぁ〜」など、意外と難しいぞ!! ということに気付かされます。教科書を読んでフレームワークの使い方を知っても、そのフレームワークをうまく使いこなすのとは別の話です。

スクラムイベントがうまく進行できないと、プランニングした通りにタスクが消化できず、結果的にユーザーさんに価値を提供する機会が減ってしまいます。計画通りに価値を提供したい、その機会を増やしていきたい！というのが目的であり、その手段として我々はスクラム開発をしています。

どうすればスクラム開発というフレームワークをうまく使いこなせるのか。この１年間のスクラム開発を通じて「ファシリテーション力」がスクラム開発を円滑に進めるための重要な要素であることに気づきました。

## スクラム開発におけるファシリテーションの重要性

スプリントレトロスペクティブ（以降レトロスペクティブといいます）を例にします。レトロスペクティブは、スプリント最後のイベントで今回のスプリントがどのように進められたかを検査します。レトロスペクティブでは、振り返りフレームワークであるKPT法が用いられることが多く、ファシリテーターが参加者が出したKeep/Problemの深掘りを行い、そこからみんなで議論をしてTryを導き出します。

しかし、安易に「今後も続けたいことはなんですかねぇ〜」「どの辺が一番困りましたか？」と全員に問いかけても、「う〜ん、なんでしょうねぇ・・・」で会話が止まってしまい、意見が出ないということがありました。意見を収束させるのは思っている以上に難しいです。これはレトロスペクティブに限らず他のスクラムイベントでも同様です。つまり、ファシリテーションがイベント進行における重要な要素であることがわかります。

## チームでファシリテーション力をあげていく

実際に自分が所属するチームで行われた事例を紹介します。

### ファシリテーションのローテーション

「習うより慣れろ」で、スクラムイベントのファシリテーターを「ガチャ」でランダムに決めるようにしました。ガチャはSlackbotを利用した簡単なものです。多少の偏りがあるのが欠点ですが、そういうもの!として受け入れて楽しんでいます。

また、スクラムイベントのファシリテーションには、専門技術は不要なので、チームメンバー全員(エンジニアだけでなくプロダクトマネージャー/UXライター/QA/ドメインエキスパートなど!)をガチャの対象とするようにしました。これにより公平にファシリテーションをするチャンスが訪れます。いろんな人のファシリテーションを見ることで、「なるほど〜、こんな深掘りの質問の仕方があるんだなぁ〜!」と発見もありました。

### 会議のファシリテーションでは会議設計が重要

「○○の方針についてここでは決められないので別ミーティングで決めましょう」ということが稀にあるかと思います。何かを決める会議ではファシリテーションの事前準備が必要です。大きく以下の4点です。

1. 台本ともいえる資料作り
2. 結論の決め方を決めておく
3. 時間配分を考える
4. 参加者を把握してイメトレをする

### 台本ともいえる資料作り

何の用意もなしに参加者を集めていきなり議論を始めてしまうと、参加者は「主催者が何に困っているのか分からない」「どんな観点で意見を言えば良いか分からない」と困ってしまい、決まるものも決まりません。

例えば以下のような書式で議題についてまとめておきましょう。内容としてはシンプルにしつつも、説明が必要な箇所は記載し、読み上げるだけで説明できるような台本のように使える資料を意識すると良いです。これによりファシリテーションもしやすくなります。

```bash
# ○○の方針について
- タイムテーブル
- 課題
- 議論の観点
- 選択肢
- 結論
- Next Action
```

### 結論の決め方を決めておく

会議の目的は、合意形成を経て問題解決の結論を出すことです。選択肢を列挙して会議に持ち込めば決まるだろうと考えがちですが、事前に結論の決め方を考えておかないと収束できません。方法については議題に応じて適切なものを選択すれば良いと思いますが、以下のサイトにわかりやすくまとまっていますので参考にしてください。

- [どれがいい？会議の結論の出し方4パターン | お役立ち](https://www.fukuracia.jp/report/blog/1703.html)
- [結論の出ない会議から卒業するための3つの手法 | Backlogブログ](https://backlog.com/ja/blog/3-ways-of-effective-meeting/)

チーム内で何かしらの１つの方針を決める際は、評価項目ごとに天気マークで評価していました。これにより選択肢のメリデメが視覚的にわかり、天気マークがつけ終わる頃には「もうこれしかないでしょう〜」と必然的に決まりました。

|  | 案A | 案B |
| --- | --- | --- |
| お値段 | ☀️ | ☂️ |
| 機能性 | ☁️ | ☀️ |
| デザイン | ☁️ | ☀️ |

### 時間配分を考える

会議には制限時間があります。資料ができたのでヨシ！ではなく、各項目毎の時間配分を考えて見ると、意外と○○の時間が足りないということに気づけます。時間配分を先に決めておかないと、会議中に時間が迫ると焦ってしまい適切なファシリテーションができなくなります。
例えば資料の中に簡易的なタイムテーブル表を作成し、この後のイメトレと合わせて活用すると良いと思います。

### 参加者を把握しイメトレをする

資料も作った! 結論の決め方も決めた! 準備万端! ヨシ! といざ始めて見ると、想定していなかった意見により結論が決まらなかったということが稀にありました。（全然ヨシ! じゃない.. )

そこで極力そのような状況を回避するために、一度イメトレをするのがお勧めです。参加者を想像し、司会進行をして見ると、

- 説明不足の箇所がありそう
- この辺は時間がかかりそう
- あの人からはこんな意見が出るかもしれない

ということに気づけるでしょう。事前に想定問答を用意することで、気持ち的にも余裕が生まれ司会進行しやすくなります。

### 意見の発散と収束を区別する

会議の目的は、「関係者が集まり、特定の目的（議題）に関して意見交換・審議し、合意・施策などの意思決定をすること」です。その過程において意見の「発散」と「収束」を分けることで目的が達成しやすくなります。

- 発散
    - アイデアを募る
    - 質より量
    - 参加者からの意見を引き出す
- 収束
    - 発散から生まれたアイデアを絞り込む
    - 論理的な根拠で判断する

会議の場面において、今は発散・収束を意識し、メンバーにもそれを共有しながら進行するとゴールまでリードしやすくなります。

### ファシリテーションハンドブック

スクラムイベントのファシリテーションを担当をして見ると、「どうやって進行するんだっけ？」「どんなことを気にして質問すべきかな 〜🤔」と悩むことがありました。

そこで私の所属するチームでは、朝会・リファイメント用に台本ともいえるファシリテーションハンドブックが用意されました。（チームのエンジニアマネージャー [@zoshigayan](https://twitter.com/zoshigayan) さんに超絶感謝! ) 

内容としては、

- 全体の進め方
- 場面毎で
    - 声かけ・質問例
    - 気にかけること

などがまとめられています。ちなみにこのハンドブックは、先ほど紹介した会議設計と意見の発散と収束に基づいた資料になっています!

このファシリテーションハンドブックを用いることで、イベントの司会進行がしやすくなり、また誰に・どんな観点で質問を投げかけがされることで、例えばエンジニアだけでなくカスタマーサクセス・ドメインエキスパート・QAなど様々な方の観点で意見を求めることができるようになりました。

## チーム全体の意識が変わってバーンダウンができるようになった

その後チームとしてどうなったのか？！ですが、結果的に

- 徐々にプランニング通りにチケット消化できるようになり、その後継続的かつ高頻度で出来るようになった
- 1スプリントあたりの消化ポイントを増やすことができた

特に後者ができたということはチームとしての開発力があがることでユーザーさんへの価値提供の頻度があがりとても良い結果になったと感じています。

これらができるようになった理由としては以下と考えています。

### 1. レトロスペクティブを活用して継続的に改善できたこと

レトロスペクティブで各メンバーの出したKeep/Problemについて、チームとしてなぜうまく機能したのか、なぜうまくいかなかったの深掘りができるようになり、そこからチームメンバーで合意したTryが出せるようになりました。またせっかく決めたTryも翌日に忘れては意味がないので、Slackでピン留めして朝会で「今週のTryできてますか〜」くらいの簡単な確認を行いました。

これによりTryを意識した行動がチーム全体できるようになり、プランニング通りにタスクを消化するにはどうすれば良いか？が朝会・夕会で議論されるようになり、継続的にタスク消化の調整ができるようになりました。

### 2. 手戻りの少ないリファイメントができるようになった

チームで用意したリファイメントハンドブックを用いることで、

- 進め方に迷わなくなった
- 参加者全体で認識合わせができるようになった
- タスク内容の項目毎に聞くべきことがスムーズに問いかけされることで抜け漏れが減った

という効果があり、手戻りの少ないリファイメントができることで、着実にプロダクト開発ができるになったと感じています。

## さいごに

私が所属するチームで今年取り組んだチーム開発改善の一部を紹介しました。今年１年を通じてチーム全体でチーム開発として大きく成長できたと実感できました。いろんな施策を何度も試すことで少しずつ変われたと思います。良いことだけか?! というとそうではなく、失敗もたくさんありましたが、去年に比べれば今年は格段に良くなっていると実感しています。

一般的にエンジニアの技術力として、バックエンド・フロントエンドにおける固有技術や設計技術などが注目されがちですが、チーム開発においては「ファシリテーション力」も技術の一つとして考えるべきだと改めて実感しました。もしこの記事をきっかけに「ファシリテーション」について興味が湧いていいただければ幸いです！

最後まで読んで頂きありがとうございました! Merry Christmas!
