/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithubSquare,
  faXTwitter,
  faSpeakerDeck,
} from "@fortawesome/free-brands-svg-icons"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/myself.jpeg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata

  const links = [
    {
      href: "https://github.com/hypermkt",
      label: "GitHub",
      icon: faGithubSquare,
    },
    { href: "https://x.com/hypermkt", label: "X", icon: faXTwitter },
    {
      href: "https://qiita.com/hypermkt",
      label: "Qiita",
      icon: faSearch,
      boxed: true,
    },
    {
      href: "https://speakerdeck.com/hypermkt",
      label: "Speaker Deck",
      icon: faSpeakerDeck,
    },
  ]

  return (
    <div className="flex items-start gap-4">
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <div>
        <p className="!m-0 text-sm font-semibold text-ink">{author}</p>
        <p className="!m-0 !mt-1 text-sm leading-relaxed text-muted">
          都内で働くWebアプリケーションエンジニア。主にサーバーサイド。最近はRuby/Railsでコードを書くのが楽しい。
        </p>
        <ul className="!m-0 !mt-2 flex !list-none gap-3 p-0">
          {links.map((link) => (
            <li key={link.href} className="!m-0">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="!text-muted transition-colors hover:!text-ink"
              >
                <FontAwesomeIcon
                  icon={link.icon}
                  style={
                    link.boxed
                      ? {
                          height: "0.95em",
                          width: "0.95em",
                          padding: "2px",
                          color: "white",
                          backgroundColor: "var(--color-muted)",
                          borderRadius: "2px",
                          verticalAlign: "middle",
                        }
                      : {
                          height: "1.15em",
                          width: "1.15em",
                          verticalAlign: "middle",
                        }
                  }
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Bio
