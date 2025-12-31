import React from "react"
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share"

const Share = ({ url, title }) => {
  return (
    <div align="right">
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton title={title} via="hypermkt" url={url}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
  )
}

export default Share
