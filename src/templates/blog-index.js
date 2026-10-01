import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import PostList from "../components/post-list"
import SEO from "../components/seo"

const BlogIndex = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.nodes
  const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } =
    pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <PostList posts={posts} />

      {numberOfPages > 1 && (
        <nav className="!flex items-center justify-between text-sm">
          <span className="w-32">
            {previousPagePath && (
              <Link to={previousPagePath} className="!no-underline">
                ← 新しい記事
              </Link>
            )}
          </span>
          <span className="text-muted tabular-nums">
            {humanPageNumber} / {numberOfPages}
          </span>
          <span className="w-32 text-right">
            {nextPagePath && (
              <Link to={nextPagePath} className="!no-underline">
                過去の記事 →
              </Link>
            )}
          </span>
        </nav>
      )}
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
      nodes {
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
`
