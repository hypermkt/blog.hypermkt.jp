import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import CategoryList from "./category-list"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const header = (
    <h3
      style={{
        ...scale(0.5),
        fontFamily: `Montserrat, sans-serif`,
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      <Link
        style={{
          boxShadow: `none`,
          textDecoration: `none`,
          color: `inherit`,
        }}
        to={`/`}
      >
        {title}
      </Link>
    </h3>
  )
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(35),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header
        style={{
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `center`,
          marginBottom: rhythm(1.5),
        }}
      >
        {header}
        <nav>
          <ul
            style={{
              display: `flex`,
              listStyle: `none`,
              margin: 0,
            }}
          >
            <li style={{ marginRight: rhythm(0.5), marginBottom: 0 }}>
              <Link to={`/`}>Home</Link>
            </li>
            <li style={{ marginBottom: 0 }}>
              <Link to={`/about`}>About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <div style={{ marginBottom: rhythm(1) }}>
          <CategoryList />
        </div>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
