import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

export const CategoryTag = ({ name, count }) => (
  <Link
    to={`/category/${kebabCase(name)}/`}
    className="inline-block rounded-full border border-line !px-3 !py-0.5 !text-xs !leading-6 !text-muted !no-underline transition-colors hover:border-muted hover:!text-ink"
  >
    {name}
    {count !== undefined && <span className="ml-1 opacity-60">{count}</span>}
  </Link>
)

const CategoryList = ({ limit, showHeading = true }) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(limit: 2000) {
        group(field: { frontmatter: { categories: SELECT } }) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  const categories = [...(data?.allMarkdownRemark?.group || [])].sort(
    (a, b) => b.totalCount - a.totalCount
  )

  if (categories.length === 0) {
    return null
  }

  const shown = limit ? categories.slice(0, limit) : categories

  return (
    <div>
      {showHeading && (
        <h2
          className="!m-0 !mb-4 !text-xs !font-semibold !uppercase !tracking-widest !text-muted"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Categories
        </h2>
      )}
      <ul className="!m-0 flex !list-none flex-wrap gap-2 p-0">
        {shown.map((category) => (
          <li key={category.fieldValue} className="!m-0">
            <CategoryTag
              name={category.fieldValue}
              count={category.totalCount}
            />
          </li>
        ))}
        {limit && categories.length > limit && (
          <li className="!m-0">
            <Link
              to="/category/"
              className="inline-block !px-2 !text-xs !leading-7 !text-muted hover:!text-ink"
            >
              すべて見る →
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default CategoryList
