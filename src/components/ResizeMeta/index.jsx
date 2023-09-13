import React from "react"
import { useState, useEffect } from "react"
import { eightPoints } from "../../Meta/metaData"
export default function ResizeMeta(props) {
  const [initData, setInitData] = useState({
    mSize: { width: 0, height: 0 },
    coordidate: {
      x: 0,
      y: 0,
    },
  })
  const { activeGraphObj, metaDataList, setMetaDataList, setActiveGraphObj } =
    props
  const getCursor = (angle) => {
    let a = angle
    if (a < 0) {
      a += 360
    }
    if (a >= 360) {
      a -= 360
    }
    if (a >= 338 || a < 23 || (a > 157 && a <= 202)) {
      return "ew-resize"
    } else if ((a >= 23 && a < 68) || (a > 202 && a <= 247)) {
      return "nwse-resize"
    } else if ((a >= 68 && a < 113) || (a > 247 && a <= 292)) {
      return "ns-resize"
    } else {
      return "nesw-resize"
    }
  }

  const resizeMouseDown = (e, pos) => {
    const { pageX, pageY } = e
    initData.startPageX = pageX
    initData.startPageY = pageY
    initData.position = pos
    console.log(initData, pos, "pospos")
    metaDataList.forEach((item) => {
      if (item.type === activeGraphObj.type) {
        initData.coordidate = {
          x: item.metaAttrs.size.width,
          y: item.metaAttrs.size.height,
        }
      }
    })
    setInitData({ ...initData })
    document.addEventListener("pointermove", resize_mouseMove, false)
    document.addEventListener("pointerup", resize_mouseUp, false)
  }

  const resize_mouseMove = (e) => {
    const { pageX, pageY } = e

    metaDataList.forEach((item) => {
      if (item.type === activeGraphObj.type) {
        if (initData.position === "right-bottom") {
          const { coordidate } = item.metaAttrs
          const dx = pageX - coordidate?.x
          const dy = pageY - coordidate?.y
          const width = Math.abs(dx)
          const height = Math.abs(dy)
          item.metaAttrs.size = {
            width: width,
            height: height,
          }
        }

        if (initData.position === "right") {
          const { coordidate } = item.metaAttrs
          const dx = pageX - coordidate?.x
          const width = Math.abs(dx)
          item.metaAttrs.size.width = width
        }

        if (initData.position === "top-right") {
          const dx = pageX - initData.startPageX
          const dy = pageY - initData.startPageY
          const width = initData.coordidate.x + dx
          const height = initData.coordidate.y - dy
          item.metaAttrs.size = {
            width: width,
            height: height,
          }
          item.metaAttrs.move = {
            x: item.metaAttrs.coordidate.x,
            y: pageY - initData.startPageY + item.metaAttrs.coordidate.y,
          }
        }

        if (initData.position === "top") {
          const dy = pageY - initData.startPageY
          const width = initData.coordidate.x
          const height = initData.coordidate.y - dy
          item.metaAttrs.size = {
            width: width,
            height: height,
          }
          item.metaAttrs.move = {
            x: item.metaAttrs.coordidate.x,
            y: pageY - initData.startPageY + item.metaAttrs.coordidate.y,
          }
        }

        if (initData.position === "left-top") {
          const dx = pageX - initData.startPageX
          const dy = pageY - initData.startPageY
          const width = initData.coordidate.x - dx
          const height = initData.coordidate.y - dy
          item.metaAttrs.size = {
            width: width,
            height: height,
          }
          item.metaAttrs.move = {
            x: pageX - initData.startPageX + item.metaAttrs.coordidate.x,
            y: pageY - initData.startPageY + item.metaAttrs.coordidate.y,
          }
        }

        if (initData.position === "left") {
          const dx = pageX - initData.startPageX
          const dy = pageY - initData.startPageY
          const width = initData.coordidate.x - dx
          const height = initData.coordidate.y
          item.metaAttrs.size = {
            width: width,
            height: height,
          }
          item.metaAttrs.move = {
            x: pageX - initData.startPageX + item.metaAttrs.coordidate.x,
            y: item.metaAttrs.coordidate.y,
          }
        }

        if (initData.position === "bottom-left") {
          const dx = pageX - initData.startPageX
          const dy = pageY - initData.startPageY
          const width = initData.coordidate.x - dx
          const height = initData.coordidate.y + dy
          item.metaAttrs.size = {
            width: width,
            height: height,
          }
          item.metaAttrs.move = {
            x: pageX - initData.startPageX + item.metaAttrs.coordidate.x,
            y: item.metaAttrs.coordidate.y,
          }
        }

        if (initData.position === "bottom") {
          const dx = pageX - initData.startPageX
          const dy = pageY - initData.startPageY
          const width = initData.coordidate.x
          const height = initData.coordidate.y + dy
          item.metaAttrs.size = {
            width: width,
            height: height,
          }
          item.metaAttrs.move = {
            x: item.metaAttrs.coordidate.x,
            y: item.metaAttrs.coordidate.y,
          }
        }
      }
    })
    setInitData({ ...initData })
    setMetaDataList([...metaDataList])
  }

  const resize_mouseUp = () => {
    initData.coordidate = {
      x: 0,
      y: 0,
    }
    metaDataList.forEach((item) => {
      if (item.type === activeGraphObj.type) {
        item.metaAttrs.coordidate = {
          x: item.metaAttrs.move.x,
          y: item.metaAttrs.move.y,
        }
      }
    })

    setInitData({ ...initData })
    document.removeEventListener("pointermove", resize_mouseMove, false)
    document.removeEventListener("pointerup", resize_mouseUp, false)
  }

  return (
    <>
      {eightPoints.map((item) => {
        console.log(`output->222`, activeGraphObj)
        const { size, coordidate } = activeGraphObj?.metaAttrs || {}
        const { r = 0 } = activeGraphObj?.metaProps || {}
        return (
          <rect
            width={8}
            height={8}
            key={item.name}
            x={
              size?.width +
                (size?.width / 100) * item.position.x -
                4 -
                size?.width -
                r || 0
            }
            y={
              size?.height +
                (size?.height / 100) * item.position.y -
                4 -
                size?.height -
                r || 0
            }
            style={{
              cursor: getCursor(item.angle),
            }}
            stroke="#0067ed"
            strokeWidth={2}
            transform={`translate(${activeGraphObj?.metaAttrs?.move.x || 0},${
              activeGraphObj?.metaAttrs?.move.y || 0
            })`}
            fill="white"
            onMouseDown={(event) => resizeMouseDown(event, item.name)}
          ></rect>
        )
      })}
    </>
  )
}
