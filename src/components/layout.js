import React from "react"
import { Link } from "gatsby"
import CategoryList from "./category-list"

const navItems = [
  { to: "/", label: "Home" },
  { to: "/category/", label: "Categories" },
  { to: "/about/", label: "About" },
]

const Layout = ({ title, children }) => {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 md:px-6 md:py-14">
      <header className="mb-14 !flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-line pb-6">
        <h1
          className="!m-0 !text-2xl !font-bold !tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <Link className="!text-ink !no-underline" to="/">
            {title}
          </Link>
        </h1>
        <nav>
          <ul className="!m-0 flex !list-none gap-6 p-0">
            {navItems.map((item) => (
              <li key={item.to} className="!m-0">
                <Link
                  to={item.to}
                  className="!text-sm !tracking-wide !text-muted !no-underline hover:!text-ink"
                  activeClassName="!text-ink"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="mb-20">{children}</main>
      <footer className="border-t border-line pt-10 text-sm text-muted">
        <CategoryList limit={15} />
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <span>
            © {new Date().getFullYear()}, Built with{" "}
            <a
              href="https://www.gatsbyjs.com"
              className="!text-muted hover:!text-ink"
            >
              Gatsby
            </a>
          </span>
          <span className="flex gap-5">
            <a href="/rss.xml" className="!text-muted hover:!text-ink">
              RSS
            </a>
            <Link to="/about/" className="!text-muted hover:!text-ink">
              About
            </Link>
          </span>
        </div>
      </footer>
    </div>
  )
}

export default Layout
