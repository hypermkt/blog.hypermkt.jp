import React from "react"
import { Link } from "gatsby"

import { formatDate } from "../utils/date"

const groupByYear = (posts) => {
  const map = posts.reduce((acc, node) => {
    const year = new Date(node.frontmatter.date).getFullYear()
    if (!acc.has(year)) {
      acc.set(year, [])
    }
    acc.get(year).push(node)
    return acc
  }, new Map())

  return Array.from(map.entries())
    .sort(([yearA], [yearB]) => yearB - yearA)
    .map(([year, posts]) => ({
      year,
      posts: posts.sort(
        (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
      ),
    }))
}

const PostList = ({ posts }) => (
  <div>
    {groupByYear(posts).map(({ year, posts }) => (
      <section key={year} className="mb-12">
        <h2
          className="!m-0 !mb-3 !text-sm !font-semibold !tracking-widest !text-muted"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {year}
        </h2>
        <ul className="!m-0 !list-none p-0">
          {posts.map((node) => (
            <li key={node.fields.slug} className="!m-0 border-b border-line">
              <Link
                to={node.fields.slug}
                className="group flex flex-col gap-0.5 py-3 !no-underline sm:flex-row sm:items-baseline sm:gap-6"
              >
                <time
                  dateTime={node.frontmatter.date}
                  className="shrink-0 text-xs tabular-nums text-muted sm:w-24"
                >
                  {formatDate(node.frontmatter.date)}
                </time>
                <span className="text-ink transition-colors group-hover:text-accent">
                  {node.frontmatter.title || node.fields.slug}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    ))}
  </div>
)

export default PostList
