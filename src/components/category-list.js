import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

const CategoryList = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___categories) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  const categories = data?.allMarkdownRemark?.group || []

  if (categories.length === 0) {
    return null
  }

  return (
    <div>
      <h3>Categories</h3>
      <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', padding: 0 }}>
        {categories.map(category => (
          <li key={category.fieldValue} style={{ marginRight: '1rem' }}>
            <Link
              to={`/category/${kebabCase(category.fieldValue)}/`}
              style={{ fontSize: '1.05rem' }}
            >
              {category.fieldValue} ({category.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryList
