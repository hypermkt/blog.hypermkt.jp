import React from "react"
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
  HatenaShareButton,
  HatenaIcon,
} from "react-share"

const Share = ({ url, title }) => {
  const iconSize = 32
  const buttonStyle = { marginLeft: "8px" }

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={buttonStyle}>
        <FacebookShareButton url={url}>
          <FacebookIcon size={iconSize} round />
        </FacebookShareButton>
      </div>

      <div style={buttonStyle}>
        <TwitterShareButton title={title} via="hypermkt" url={url}>
          <XIcon size={iconSize} round />
        </TwitterShareButton>
      </div>

      <div style={buttonStyle}>
        <HatenaShareButton url={url} title={title}>
          <HatenaIcon size={iconSize} round />
        </HatenaShareButton>
      </div>
    </div>
  )
}

export default Share
