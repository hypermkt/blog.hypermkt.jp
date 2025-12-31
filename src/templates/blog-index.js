import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

const BlogIndex = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  // Group posts by year
  const postsByYear = posts.reduce((acc, { node }) => {
    const date = new Date(node.frontmatter.date)
    const year = date.getFullYear()
    const lastGroup = acc[acc.length - 1]

    if (lastGroup && lastGroup.year === year) {
      lastGroup.posts.push(node)
    } else {
      acc.push({ year, posts: [node] })
    }
    return acc
  }, [])

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {postsByYear.map(({ year, posts }) => (
        <React.Fragment key={year}>
          <h2
            style={{
              marginTop: rhythm(1),
              marginBottom: rhythm(0.5),
            }}
          >
            {year}
          </h2>
          {posts.map((node) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <article
                key={node.fields.slug}
                style={{ marginBottom: rhythm(0.5) }}
              >
                <header>
                  <div style={{ display: `flex`, alignItems: `center` }}>
                    <small
                      style={{ marginRight: rhythm(0.5), fontSize: "0.9em" }}
                    >
                      {formatDate(node.frontmatter.date)}
                    </small>
                    <h3
                      style={{
                        ...scale(0.2),
                        margin: 0,
                        lineHeight: rhythm(1),
                      }}
                    >
                      <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                        {title}
                      </Link>
                    </h3>
                  </div>
                </header>
              </article>
            )
          })}
        </React.Fragment>
      ))}

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
            {pageContext.previousPagePath && (
              <Link to={pageContext.previousPagePath}>Previous</Link>
            )}
          </li>
          <li>
            {pageContext.nextPagePath && (
              <Link to={pageContext.nextPagePath}>Next</Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date
            title
          }
        }
      }
    }
  }
`
