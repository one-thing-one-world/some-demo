import React from "react"

export default function MetaLine(props) {
  const { metaProps, metaAttrs } = props
  const {
    coordidate: { x, y },
  } = metaAttrs

  return <line {...metaProps}></line>
}
