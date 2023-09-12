import logo from "./logo.svg"
import "./App.css"
import { useState, useEffect } from "react"
import { metaData, eightPoints } from "./Meta/metaData"
import { findParentByClass } from "./utiles/index.jsx"
function App() {
  const [initPositionData, setinitPositionData] = useState({
    type: undefined,
    startPageX: 0,
    startPageY: 0,
  })
  const [metaDataList, setMetaDataList] = useState(metaData)

  const [activeGraphObj, setActiveGraphObj] = useState({})

  const fnMove = (e) => {
    const { pageX, pageY } = e
    const { startPageX, startPageY } = initPositionData
    metaDataList.forEach((item) => {
      if (item.type === initPositionData.type) {
        item.metaAttrs.move = {
          x: pageX - startPageX + item.metaAttrs.coordidate.x,
          y: pageY - startPageY + item.metaAttrs.coordidate.y,
        }
      }
    })
    setMetaDataList([...metaDataList])
  }

  const fnDwon = (e) => {
    const spriteDom = findParentByClass(e.target, "gTagContainer")
    if (!spriteDom) {
      return
    }
    const domType = spriteDom.getAttribute("data-sprite-id")
    const activeObj = metaDataList.find((item) => {
      return item.type === domType
    })
    console.log(`output->activeObj`, activeObj)
    const selectRectBounding = spriteDom.getBoundingClientRect()
    console.log(selectRectBounding, "selectRectBounding")
    activeObj.x = selectRectBounding.x
    activeObj.y = selectRectBounding.y

    setActiveGraphObj(activeObj)
    const { pageX: startPageX, pageY: startPageY } = e
    initPositionData.startPageX = startPageX
    initPositionData.startPageY = startPageY
    initPositionData.type = domType
    setinitPositionData({ ...initPositionData })
    document.addEventListener("pointermove", fnMove, false)
    document.addEventListener("pointerup", fnUp, false)
  }

  const fnUp = () => {
    metaDataList.forEach((item) => {
      if (item.type === initPositionData.type) {
        item.metaAttrs.coordidate = {
          x: item.metaAttrs.move.x,
          y: item.metaAttrs.move.y,
        }
      }
    })

    document.removeEventListener("pointermove", fnMove, false)
    document.removeEventListener("pointedown", fnDwon, false)
    document.removeEventListener("pointerup", fnUp, false)
  }
  useEffect(() => {
    document.addEventListener("pointerdown", fnDwon, false)
  }, [])

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
    document.addEventListener("pointermove", resize_mouseMove, false)
    document.addEventListener("pointerup", resize_mouseUp, false)
  }

  const resize_mouseMove = (e) => {}

  const resize_mouseUp = () => {
    document.removeEventListener("pointermove", resize_mouseMove, false)
    document.removeEventListener("pointerup", resize_mouseUp, false)
  }
  return (
    <div className="App">
      <svg width={900} height={900} id="svgId" fill="blue">
        <rect
          x={-activeGraphObj?.metaProps?.r}
          y={-activeGraphObj?.metaProps?.r}
          width={activeGraphObj?.metaAttrs?.size.width}
          height={activeGraphObj?.metaAttrs?.size.height}
          transform={`translate(${activeGraphObj?.metaAttrs?.move.x},${activeGraphObj?.metaAttrs?.move.y})`}
          stroke="#0067ed"
          strokeWidth={4}
          fill="none"
          className="active-meta-rect-line"
        ></rect>

        {metaDataList.map((metaItem) => {
          const {
            MetaComponent,
            metaAttrs: { move },
          } = metaItem

          return (
            <g
              className="gTagContainer"
              data-sprite-id={metaItem.type}
              key={metaItem.type}
              transform={`translate(${move.x},${move.y})`}
            >
              <MetaComponent {...metaItem}></MetaComponent>
              <text
                fontSize={18}
                fill="white"
                x={200}
                y={200}
                textAnchor="middle"
              >
                {move.x},{move.y}
              </text>
            </g>
          )
        })}

        {eightPoints.map((item) => {
          console.log(`output->222`, activeGraphObj)
          const { size, coordidate } = activeGraphObj?.metaAttrs || {}
          const { r = 0 } = activeGraphObj?.metaProps || {}
          console.log(r, "circleR")
          return (
            <rect
              width={8}
              height={8}
              x={
                size?.width +
                (size?.width / 100) * item.position.x -
                4 -
                size?.width -
                r
              }
              y={
                size?.height +
                (size?.height / 100) * item.position.y -
                4 -
                size?.height -
                r
              }
              style={{
                cursor: getCursor(item.angle),
              }}
              stroke="#0067ed"
              strokeWidth={2}
              transform={`translate(${activeGraphObj?.metaAttrs?.move.x},${activeGraphObj?.metaAttrs?.move.y})`}
              fill="white"
              onMouseDown={(event) => resizeMouseDown(event, item.name)}
            ></rect>
          )
        })}
      </svg>
    </div>
  )
}

export default App
