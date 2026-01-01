import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { formatDate } from "../utils/date"

const CategoryTemplate = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const { category } = pageContext
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
      <SEO title={`Posts in category "${category}"`} />
      <Bio />
      <h1>Category: {category}</h1>
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
    </Layout>
  )
}

export default CategoryTemplate

export const pageQuery = graphql`
  query ($category: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { categories: { in: [$category] } } }
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
