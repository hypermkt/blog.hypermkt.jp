import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithubSquare,
  faXTwitter,
  faSpeakerDeck,
} from "@fortawesome/free-brands-svg-icons"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

const AboutPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/hypermkt",
      icon: faGithubSquare,
      color: "#333",
    },
    {
      name: "X",
      url: "https://x.com/hypermkt",
      icon: faXTwitter,
      color: "#000",
    },
    {
      name: "Qiita",
      url: "https://qiita.com/hypermkt",
      icon: faSearch,
      color: "#4cb10d",
    },
    {
      name: "Speaker Deck",
      url: "https://speakerdeck.com/hypermkt",
      icon: faSpeakerDeck,
      color: "#108274",
    },
  ]

  const presentations = [
    {
      year: 2016,
      items: [
        {
          event: "Vue.js Tokyo v-meetup=\"#1\"",
          title: "翻訳から始めるVue.js入門",
          url: "https://www.slideshare.net/slideshow/vuejs-62571331/62571331",
        },
        {
          event: "YAP(achimon)C::Asia Hachioji 2016 mid in Shinagawa",
          title: "チーム全員でお申し込み数を2倍にした話",
          url: "https://speakerdeck.com/hypermkt/timuquan-yuan-deoshen-siip-mishu-wo2bei-nisitahua",
        },
        {
          event: "PHP BLT#5",
          title: "400万個のユーザー画像をサーバー移設した話",
          url: "https://speakerdeck.com/hypermkt/400mo-ge-falseyuzahua-xiang-wosabayi-she-sitahua",
        },
        {
          event: "【ペパボxプレイド】Tech Meetup 〜自動テスト・CI編〜",
          title: "グーペのE2Eテスト運用事情",
          url: "https://speakerdeck.com/hypermkt/gupefalsee2etesutoyun-yong-shi-qing",
        },
        {
          event: "PHP Conference 2016",
          title: "PHPerのためのVue.js入門とVue.js 2.0の未来",
          url: "https://speakerdeck.com/hypermkt/phperfalsetamefalsevue-dot-jsru-men-tovue-dot-js-2-dot-0falsewei-lai",
        },
        {
          event: "YAPC::Hokkaido 2016",
          title: "Vue.jsによるWebアプリケーション開発",
          url: "https://speakerdeck.com/hypermkt/vue-dot-jsniyoruwebapurikesiyonkai-fa",
        },
      ],
    },
    {
      year: 2017,
      items: [
        {
          event: "PHP BLT#6",
          title: "5分で分かるPHP7化する方法 〜アプリケーション編〜",
          url: "https://speakerdeck.com/hypermkt/5fen-defen-karuphp7hua-surufang-fa-apurikesiyonbian",
        },
        {
          event: "Vue.js Meetup#4",
          title: "Vueコンポーネントのユニットテスト",
          url: "https://speakerdeck.com/hypermkt/vuekonponentofalseyunitutotesuto",
        },
        {
          event: "ペパボエンジニア研修座学",
          title:
            "ペパボエンジニア研修座学「Vue.jsで作る日報アプリケーション ハンズオン」",
          url: "https://speakerdeck.com/hypermkt/pepaboenziniayan-xiu-zuo-xue-vue-dot-js-dezuo-ruri-bao-apurikesiyon-hanzuon",
        },
        {
          event: "ぎんざRuby会議01",
          title:
            "歴史あるPHPアプリケーションのジョブキューシステムのリプレース",
          url: "https://speakerdeck.com/hypermkt/replace-for-historic-job-queue-system",
        },
        {
          event: "第９回ペパボテックカンファレンス〜Vue.js特集〜",
          title: "小さな課題解決から始めるVue.js",
          url: "https://speakerdeck.com/hypermkt/getting-started-vue-dot-js-for-small-improvement",
        },
        {
          event: "PHP Conference 2017",
          title: "できるPHP7アップグレード",
          url: "https://speakerdeck.com/hypermkt/php7-upgrade",
        },
      ],
    },
    {
      year: 2018,
      items: [
        {
          event: "Vue.js部",
          title: "Vue.jsで作る日報アプリケーション ハンズオン",
          url: "https://speakerdeck.com/hypermkt/vue-js-handson-by-nippo",
        },
        {
          event: "PHPerKaigi 2018 懇親会 飛び込みLT",
          title: "あの問題解きました!",
          url: "https://speakerdeck.com/hypermkt/solved-the-code",
        },
        {
          event: "フロントエンドテックミーティング#1",
          title: "Webpackで作るVueコンポーネント開発環境",
          url: "https://speakerdeck.com/hypermkt/creating-the-vue-component-development-with-webpack",
        },
        {
          event: "Laravel/Vue.js勉強会#5",
          title: "Passportのパスワードグラントで独自の認証を実装する方法",
          url: "https://speakerdeck.com/hypermkt/how-to-implement-original-authentication-for-passport-password-grant",
        },
      ],
    },
    {
      year: 2019,
      items: [
        {
          event: "PHPerKaigi 2019",
          title: "モバイルアプリ向けAPI開発を通じて学んだこと",
          url: "https://speakerdeck.com/hypermkt/learned-from-developing-mobile-app-api",
        },
        {
          event: "PHPカンファレンス沖縄2019",
          title: "脆弱性から学ぶWebセキュリティ",
          url: "https://speakerdeck.com/hypermkt/study-web-security-from-vulnerability1",
        },
        {
          event: "PHPカンファレンス2019",
          title: "脆弱性から学ぶWebセキュリティ Part2",
          url: "https://speakerdeck.com/hypermkt/study-web-security-from-vulnerability2",
        },
      ],
    },
    {
      year: 2024,
      items: [
        {
          event: "Kaigi on Rails 2024",
          title: "Sidekiqで実現する長時間非同期処理の中断と再開",
          url: "https://speakerdeck.com/hypermkt/pausing-and-resuming-long-running-asynchronous-jobs-with-sidekiq",
        },
      ],
    },
    {
      year: 2025,
      items: [
        {
          event: "Kaigi on Rails 2025",
          title: "履歴 on Rails: Bitemporal Data Modelで実現する履歴管理",
          url: "https://speakerdeck.com/hypermkt/history-on-rails-with-bitemporal-data-model",
        },
        {
          event: "Kaigi on Rails 2025 事後勉強会",
          title: "プロポーザルを書くときに私が考えていること",
          url: "https://speakerdeck.com/hypermkt/what-i-think-about-when-writing-a-proposal",
        },
      ],
    },
  ]

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About" />
      <h1>About</h1>
      Webアプリケーションエンジニア。主にサーバーサイド。最近はRuby/Railsでコードを書くのが楽しい。
      <h2>執筆</h2>
      <ul style={{ listStylePosition: "inside", marginLeft: 0 }}>
        <li>
          Software Design 2019年12月号
          「基礎のクロスサイト・スクリプティング対策 PHPer のための Web
          セキュリティ入門」
        </li>
      </ul>
      <h2>発表</h2>
      {presentations.map((yearData, index) => (
        <div key={index}>
          <h3>{yearData.year}年</h3>
          <ul style={{ listStylePosition: "inside", marginLeft: 0 }}>
            {yearData.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                {item.event}：{" "}
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <h2>SNS</h2>
      <ul style={{ listStylePosition: "inside", marginLeft: 0 }}>
        {socialLinks.map((social, index) => (
          <li key={index}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ boxShadow: "none" }}
            >
              <FontAwesomeIcon
                color={social.color}
                style={{
                  height: "1.2em",
                  width: "1.2em",
                  marginRight: "8px",
                  verticalAlign: "middle",
                }}
                icon={social.icon}
              />
              {social.name}
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
