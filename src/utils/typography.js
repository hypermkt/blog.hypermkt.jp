import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

const fontFamily = [
  "Hiragino Sans",
  "Hiragino Kaku Gothic ProN",
  "Noto Sans JP",
  "Yu Gothic",
  "Meiryo",
  "sans-serif",
]

Wordpress2016.overrideThemeStyles = ({ rhythm }) => {
  return {
    h1: {
      fontFamily: fontFamily.join(","),
      lineHeight: 1.4,
    },
    "h2,h3,h4,h5,h6": {
      lineHeight: 1.5,
    },
    a: {
      color: "#3f5d70",
      boxShadow: "none",
      textDecoration: "underline",
      textDecorationThickness: "1px",
      textUnderlineOffset: "0.25em",
      textDecorationColor: "rgba(63, 93, 112, 0.35)",
      transition: "color 0.2s, text-decoration-color 0.2s",
    },
    "a:hover,a:active": {
      color: "#2a4252",
      textDecorationColor: "currentColor",
    },
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    ".blog-post-content ul": {
      marginLeft: rhythm(0.8),
    },
    ".blog-post-content ol": {
      marginLeft: rhythm(0.8),
    },
  }
}

delete Wordpress2016.googleFonts

Wordpress2016.baseFontSize = "17px"
Wordpress2016.baseLineHeight = 1.9
Wordpress2016.scaleRatio = 2
Wordpress2016.headerFontFamily = fontFamily
Wordpress2016.bodyFontFamily = fontFamily
Wordpress2016.headerWeight = 700
Wordpress2016.bodyColor = "#2b2a27"
Wordpress2016.headerColor = "#2b2a27"

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
