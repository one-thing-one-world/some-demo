import React from "react"

export default function RotateMeta(props) {
  const { activeGraphObj } = props
  return (
    <>
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns=""
        width="14"
        height="14"
        // {...props}
        x={-activeGraphObj?.metaProps?.coordidate.x || 0}
        y={-activeGraphObj?.metaProps?.coordidate.y || 0}
        transform={`translate(${activeGraphObj?.metaAttrs?.move?.x || 0},${
          activeGraphObj?.metaAttrs?.move?.y || 0
        })`}
      >
        <rect width="1024" height="1024" fill="transparent"></rect>
        <path d="M482.773333 66.517333l148.181334 151.168a21.333333 21.333333 0 0 1 0 29.866667l-147.84 150.826667a21.333333 21.333333 0 0 1-28.16 2.090666l-2.346667-2.090666-27.050667-27.605334a21.333333 21.333333 0 0 1 0-29.866666l69.888-71.338667a304.64 304.64 0 1 0 318.421334 352.682667l1.024-6.826667c0.170667-1.408 0.426667-3.285333 0.64-5.632a21.333333 21.333333 0 0 1 22.314666-19.114667l42.666667 2.261334a21.333333 21.333333 0 0 1 20.224 22.4l-0.085333 1.024-1.194667 10.496A389.973333 389.973333 0 1 1 484.821333 184.746667l-59.306666-60.458667a21.333333 21.333333 0 0 1 0-29.866667l27.093333-27.605333a21.333333 21.333333 0 0 1 30.165333-0.298667z"></path>
      </svg>
    </>
  )
}
