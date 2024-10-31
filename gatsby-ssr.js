const React = require("react")
const { siteMetadata } = require("./gatsby-config")

exports.onRenderBody = ({ setHeadComponents, pathname }) => {
  const siteUrl = siteMetadata.siteUrl

  setHeadComponents([
    <link
      key="rss-feed"
      rel="alternate"
      type="application/rss+xml"
      title="hypermkt blog"
      href={`${siteUrl}rss.xml`}
    />,
  ])
}
