import React from "react"

export default function MetaRect(props) {
  const { metaProps, metaAttrs } = props
  const {
    size,
    coordidate: { x, y },
  } = metaAttrs

  return <rect {...metaProps} {...size}></rect>
}
