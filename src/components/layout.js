import React from "react"
import { Link } from "gatsby"
import CategoryList from "./category-list"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  
  const header = (
    <h1 className="!font-bold !m-0 !tracking-tight" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "2.25rem", lineHeight: "1.1" }}>
      <Link
        className="!text-gray-800 no-underline shadow-none"
        style={{ boxShadow: "none" }}
        to={`/`}
      >
        {title}
      </Link>
    </h1>
  )

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:px-8 md:py-16">
      <header className="mb-12 w-full">
        <div className="flex w-full justify-between items-center">
          {header}
          <nav>
            <div className="flex items-center">
              <Link to={`/`} className="text-gray-800 font-medium hover:text-blue-600 transition-colors no-underline shadow-none">Home</Link>
              <Link to={`/about`} className="ml-8 text-gray-800 font-medium hover:text-blue-600 transition-colors no-underline shadow-none">About</Link>
            </div>
          </nav>
        </div>
      </header>
      <main className="mb-20">{children}</main>
      <footer className="mt-8 text-sm text-gray-500">
        <div className="mb-2">
          <CategoryList />
        </div>
        <div>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org" className="text-blue-500 hover:underline">Gatsby</a>
        </div>
      </footer>
    </div>
  )
}

export default Layout