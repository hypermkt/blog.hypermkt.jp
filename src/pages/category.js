import React from "react"
import { graphql } from "gatsby"

import CategoryList from "../components/category-list"
import Layout from "../components/layout"
import SEO from "../components/seo"

const CategoriesPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Categories" />
      <h1 className="!m-0 !mb-8 !text-3xl">Categories</h1>
      <CategoryList showHeading={false} />
    </Layout>
  )
}

export default CategoriesPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
