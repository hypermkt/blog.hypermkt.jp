import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
  }
}

delete Wordpress2016.googleFonts

// Add Noto Sans JP to the font stack
Wordpress2016.headerFontFamily = ["Noto Sans JP", ...Wordpress2016.headerFontFamily]
Wordpress2016.bodyFontFamily = ["Noto Sans JP", ...Wordpress2016.bodyFontFamily]

// Adjust colors for better readability
Wordpress2016.bodyColor = "#333333"
Wordpress2016.headerColor = "#333333"

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
