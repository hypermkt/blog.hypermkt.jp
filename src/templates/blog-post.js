import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Share from "../components/share"
import { rhythm, scale } from "../utils/typography"
import { formatDate } from "../utils/date"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const articleUrl = location.href
  const articleTitle = post.frontmatter.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <article>
        <header>
          <p
            style={{
              ...scale(0),
              display: `block`,
              marginBottom: rhythm(0.2),
              marginTop: rhythm(1),
              color: "#666",
            }}
          >
            {formatDate(post.frontmatter.date)}
          </p>
          <h1
            style={{
              marginTop: 0,
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.title}
          </h1>
        </header>
        <section className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }} />

        <Share url={articleUrl} title={articleTitle} />

        <hr
          style={{
            marginTop: rhythm(1),
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date
      }
    }
  }
`
