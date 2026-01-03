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
      account: "@hypermkt",
    },
    {
      name: "X",
      url: "https://x.com/hypermkt",
      icon: faXTwitter,
      color: "#000",
      account: "@hypermkt",
    },
    {
      name: "Qiita",
      url: "https://qiita.com/hypermkt",
      icon: faSearch,
      color: "#4cb10d",
      account: "@hypermkt",
    },
    {
      name: "Speaker Deck",
      url: "https://speakerdeck.com/hypermkt",
      icon: faSpeakerDeck,
      color: "#108274",
      account: "hypermkt",
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

  const communities = [
    {
      year: 2018,
      items: [
        {
          event: "Vue Fes Japan 2018",
          role: "実行委員 (コアスタッフ / スポンサー担当)",
          url: "https://vuefes.jp/2018/",
          articleUrl: "/2018/12/21/vue-fes-japan-2018-core-staff/",
        },
      ],
    },
  ]

  const books = [
    {
      media: "Software Design 2019年12月号",
      title:
        "「基礎のクロスサイト・スクリプティング対策 PHPer のための Web セキュリティ入門」",
      url: null,
    },
  ]

  const techBlogs = [
    {
      media: "Pepabo Tech Portal",
      title: "『いるだけで成長できる環境』グーペのエンジニアインターン2016レポート",
      url: "https://tech.pepabo.com/2016/10/07/goope-engineer-internship-2016/",
    },
    {
      media: "Pepabo Tech Portal",
      title: "グーペのPHPバージョンを5.2から7.1にアップグレードしました",
      url: "https://tech.pepabo.com/2017/06/21/goope-php71-upgrade/",
    },
    {
      media: "SmartHR Tech Blog",
      title:
        "PostgreSQLでjsonb型カラムのデータを検索した話",
      url: "https://tech.smarthr.jp/entry/2023/09/20/124323",
    },
    {
      media: "SmartHR Tech Blog",
      title:
        "スプリントプランニングの未来予測： 予言の書",
      url: "https://tech.smarthr.jp/entry/2024/06/21/150305",
    },
  ]

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About" />
      <div className="text-gray-800">
        <h1 className="text-3xl font-bold mb-6">About</h1>
        <p className="text-lg leading-relaxed mb-8">
          Webアプリケーションエンジニア。主にサーバーサイド。最近はRuby/Railsでコードを書くのが楽しい。
        </p>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold mb-4 mt-8">執筆</h2>
                  <ul className="list-disc list-outside !ml-5 !pl-0 space-y-2">
                    {books.map((book, index) => (
                      <li key={index}>
                        <span className="font-medium">{book.media}</span>
                        <span className="mx-2">/</span>
                        {book.url ? (
                          <a
                            href={book.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {book.title}
                          </a>
                        ) : (
                          <span>{book.title}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
        
                <section className="mb-10">
                  <h2 className="text-2xl font-bold mb-4 mt-8">テックブログ</h2>
                  <ul className="list-disc list-outside !ml-5 !pl-0 space-y-3">
                    {techBlogs.map((blog, index) => (
                      <li key={index}>
                        <span className="font-medium text-gray-700">{blog.media}</span>
                        <span className="mx-2 text-gray-400">/</span>
                        {blog.url ? (
                          <a
                            href={blog.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {blog.title}
                          </a>
                        ) : (
                          blog.title
                        )}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-500 mt-4 ml-1">
                    ※ 本記事は勤務先で執筆したものです。内容は公開情報のみを扱っています。
                  </p>
                </section>
        
                <section className="mb-10">
                  <h2 className="text-2xl font-bold mb-4 mt-8">発表</h2>
                  {presentations.map((yearData, yearIndex) => (
                    <div key={yearIndex} className="mb-6">
                      <h3 className="text-xl font-bold text-gray-700 mb-2">{yearData.year}年</h3>
                      <ul className="list-disc list-outside !ml-5 !pl-0 space-y-2">
                        {yearData.items.map((presentationItem, presentationIndex) => (
                          <li key={presentationIndex}>
                            <span className="font-medium text-gray-800">{presentationItem.event}</span>：{" "}
                            <a
                              href={presentationItem.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {presentationItem.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
        
                <section className="mb-10">
                  <h2 className="text-2xl font-bold mb-4 mt-8">コミュニティ</h2>
                  {communities.map((communityYear, communityYearIndex) => (
                    <div key={communityYearIndex} className="mb-6">
                      <h3 className="text-xl font-bold text-gray-700 mb-2">{communityYear.year}年</h3>
                      <ul className="list-disc list-outside !ml-5 !pl-0 space-y-2">
                        {communityYear.items.map((communityItem, communityItemIndex) => (
                          <li key={communityItemIndex}>
                            <a
                              href={communityItem.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {communityItem.event}
                            </a>
                            <span className="mx-1">：</span>
                            {communityItem.role}
                            {communityItem.articleUrl && (
                              <span className="ml-2 text-sm">
                                (
                                <a
                                  href={communityItem.articleUrl}
                                  className="text-gray-500 hover:text-gray-700 underline"
                                >
                                  振り返り記事
                                </a>
                                )
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 mt-8">SNS</h2>
          <ul className="list-disc list-outside !ml-5 !pl-0 space-y-2">
            {socialLinks.map((social, index) => (
              <li key={index} className="mb-0">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors no-underline"
                  style={{ boxShadow: 'none' }}
                >
                  <FontAwesomeIcon
                    icon={social.icon}
                    style={{ color: social.color, width: '1.2em' }}
                  />
                  <span className="font-medium text-gray-800">
                    {social.account}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
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
