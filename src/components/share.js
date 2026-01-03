import React from "react"
import {
  FacebookShareButton,
  FacebookIcon,
  HatenaShareButton,
  HatenaIcon,
  XIcon,
} from "react-share"

const Share = ({ url, title }) => {
  const iconSize = 32
  const buttonStyle = { marginLeft: "8px", cursor: "pointer" }

  const shareToX = () => {
    const xUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}&via=hypermkt`

    const width = 550
    const height = 420
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2
    const windowFeatures = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`

    window.open(xUrl, "share-x", windowFeatures)
  }

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={buttonStyle}>
        <FacebookShareButton url={url}>
          <FacebookIcon size={iconSize} round />
        </FacebookShareButton>
      </div>

      <div style={buttonStyle} onClick={shareToX} role="button" tabIndex={0}>
        <XIcon size={iconSize} round />
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
