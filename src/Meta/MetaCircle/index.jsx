import React from "react"

export default function MetaCircle(props) {
  const { metaProps, metaAttrs } = props
  const {
    size,
    coordidate: { x, y },
  } = metaAttrs

  return <circle {...metaProps} {...size} cx={x} cy={y}></circle>
}
