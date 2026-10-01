import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import PostList from "../components/post-list"
import SEO from "../components/seo"

const CategoryTemplate = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const { category } = pageContext
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={`Posts in category "${category}"`} />
      <header className="mb-12">
        <p className="!m-0 !mb-1 text-xs tracking-widest text-muted">
          <Link
            to="/category/"
            className="!text-muted !no-underline hover:!text-ink"
          >
            Categories
          </Link>
        </p>
        <h1 className="!m-0 !text-3xl">{category}</h1>
        <p className="!m-0 !mt-2 text-sm text-muted">{posts.length} 件の記事</p>
      </header>
      <PostList posts={posts} />
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
