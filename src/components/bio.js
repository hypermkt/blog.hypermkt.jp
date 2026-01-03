/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare, faXTwitter, faSpeakerDeck } from '@fortawesome/free-brands-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { rhythm } from "../utils/typography"

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

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        都内で働くWebアプリケーションエンジニア。主にサーバーサイド。最近はRuby/Railsでコードを書くのが楽しい。
        <br />
        <a href="https://github.com/hypermkt" style={{boxShadow: 'none'}} target="_blank">
          <FontAwesomeIcon
            color="#333"
            style={{
              height: '1.2em',
              width: '1.2em',
              margin: '2px',
            }}
            icon={faGithubSquare}
          />
        </a>

        <a href="https://x.com/hypermkt" style={{'box-shadow': 'none'}} target="_blank">
          <FontAwesomeIcon
            color="#000"
            style={{
              height: '1.2em',
              width: '1.2em',
              margin: '2px',
            }}
            icon={faXTwitter}
          />
        </a>

        <a href="https://qiita.com/hypermkt" style={{'box-shadow': 'none'}} target="_blank">
          <FontAwesomeIcon
            color="white"
            style={{
              height: '1.1em',
              width: '1.1em',
              backgroundColor: '#4cb10d',
              borderRadius: '2px',
              margin: '3px',
            }}
            icon={faSearch} />
        </a>

        <a href="https://speakerdeck.com/hypermkt" style={{'box-shadow': 'none'}} target="_blank">
          <FontAwesomeIcon
            color="#108274"
            style={{
              height: '1.2em',
              width: '1.2em',
              margin: '2px',
            }}
            icon={faSpeakerDeck}
          />
        </a>
      </p>
    </div>
  )
}

export default Bio
