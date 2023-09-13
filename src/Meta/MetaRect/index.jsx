import React from "react"

export default function MetaRect(props) {
  const { metaProps, metaAttrs } = props
  const {
    size,
    position: { x, y },
  } = metaAttrs

  return <rect {...metaProps} {...size} x={x} y={y}></rect>
}
