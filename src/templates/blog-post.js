import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import { CategoryTag } from "../components/category-list"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Share from "../components/share"
import { formatDate } from "../utils/date"

const SectionHeading = ({ children }) => (
  <h2
    className="!m-0 !mb-4 !text-xs !font-semibold !uppercase !tracking-widest !text-muted"
    style={{ fontFamily: "var(--font-display)" }}
  >
    {children}
  </h2>
)

const PostNavLink = ({ post, label, rel, align }) => (
  <Link
    to={post.fields.slug}
    rel={rel}
    className={`block h-full rounded-md border border-line p-4 !no-underline transition-colors hover:border-muted ${align}`}
  >
    <span className="block text-xs text-muted">{label}</span>
    <span className="mt-1 block text-sm leading-relaxed text-ink">
      {post.frontmatter.title}
    </span>
  </Link>
)

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const categories = post.frontmatter.categories || []

  const relatedPosts = data.related.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <article>
        <header className="mb-12">
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <time
              dateTime={post.frontmatter.date}
              className="text-sm tabular-nums text-muted"
            >
              {formatDate(post.frontmatter.date)}
            </time>
            {categories.length > 0 && (
              <ul className="!m-0 flex !list-none flex-wrap gap-2 p-0">
                {categories.map((category) => (
                  <li key={category} className="!m-0">
                    <CategoryTag name={category} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <h1 className="!m-0 !text-[1.75rem] !leading-snug md:!text-[2rem]">
            {post.frontmatter.title}
          </h1>
        </header>

        <section
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <div className="mt-12">
          <Share url={location.href} title={post.frontmatter.title} />
        </div>

        <footer className="mt-8 border-y border-line py-6">
          <Bio />
        </footer>
      </article>

      {(previous || next) && (
        <nav className="mt-12 !grid gap-4 sm:grid-cols-2">
          <div>
            {previous && (
              <PostNavLink
                post={previous}
                label="← 前の記事"
                rel="prev"
                align=""
              />
            )}
          </div>
          <div>
            {next && (
              <PostNavLink
                post={next}
                label="次の記事 →"
                rel="next"
                align="sm:text-right"
              />
            )}
          </div>
        </nav>
      )}

      {relatedPosts.length > 0 && (
        <section className="mt-14">
          <SectionHeading>同じカテゴリの記事</SectionHeading>
          <ul className="!m-0 !list-none border-t border-line p-0">
            {relatedPosts.map((node) => (
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
                  <span className="text-sm text-ink transition-colors group-hover:text-accent">
                    {node.frontmatter.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $categories: [String]) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date
        categories
      }
    }
    related: allMarkdownRemark(
      filter: {
        frontmatter: { categories: { in: $categories } }
        fields: { slug: { ne: $slug } }
      }
      sort: { frontmatter: { date: DESC } }
      limit: 5
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date
        }
      }
    }
  }
`
