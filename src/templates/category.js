import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { formatDate } from "../utils/date"

const CategoryTemplate = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const { category } = pageContext
  const posts = data.allMarkdownRemark.edges

  // Group posts by year
  const postsByYearMap = posts.reduce((acc, { node }) => {
    const year = new Date(node.frontmatter.date).getFullYear()
    if (!acc.has(year)) {
      acc.set(year, [])
    }
    acc.get(year).push(node)
    return acc
  }, new Map())

  const postsByYear = Array.from(postsByYearMap.entries())
    .sort(([yearA], [yearB]) => yearB - yearA)
    .map(([year, posts]) => ({
      year,
      posts: posts.sort(
        (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
      ),
    }))

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={`Posts in category "${category}"`} />
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
