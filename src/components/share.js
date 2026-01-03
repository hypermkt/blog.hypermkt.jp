import React from "react"
import {
  FacebookShareButton,
  FacebookIcon,
  XShareButton,
  XIcon,
} from "react-share"

const Share = ({ url, title }) => {
  return (
    <div align="right">
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <XShareButton title={title} via="hypermkt" url={url}>
        <XIcon size={32} round />
      </XShareButton>
    </div>
  )
}

export default Share
