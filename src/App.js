import logo from "./logo.svg"
import "./App.css"
import { useState, useEffect } from "react"
import { metaData } from "./Meta/metaData"
import { findParentByClass } from "./utiles/index.jsx"

function App() {
  const [initPositionData, setinitPositionData] = useState({
    type: undefined,
    x: 0,
    y: 0,
    cx: 0,
    cy: 0,
    startPageX: 0,
    startPageY: 0,
    move: {
      x: 0,
      y: 0,
    },
  })
  const [trans, setTrans] = useState(undefined)
  const [metaDataList, setMetaDataList] = useState(metaData)

  const getActiveSpritType = (e) => {
    const spriteDom = findParentByClass(e.target, "gTagContainer")
    const domType = spriteDom.getAttribute("data-sprite-id")
    return domType
  }
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
    console.log(startPageX, startPageY, "startPageY", metaDataList)
    setMetaDataList([...metaDataList])
  }

  const fnDwon = (e) => {
    // 获取rect

    const spriteDom = findParentByClass(e.target, "gTagContainer")
    if (!spriteDom) {
      return
    }
    const domType = spriteDom.getAttribute("data-sprite-id")
    const { pageX: startPageX, pageY: startPageY } = e
    initPositionData.startPageX = startPageX
    initPositionData.startPageY = startPageY
    initPositionData.type = domType
    setinitPositionData({ ...initPositionData })
    document.addEventListener("pointermove", fnMove, false)
    document.addEventListener("pointerup", fnUp, false)
  }

  const getActiveSpriteList = () => {
    const activeMetaLists = metaDataList.filter((item) => {
      return item.type === initPositionData.type
    })
    console.log(
      metaDataList,
      "metaDataList",
      activeMetaLists,
      "initPositionData.type",
      initPositionData.type
    )
    return activeMetaLists
  }
  const fnUp = () => {
    console.log("up")
    // initPositionData.cx = initPositionData.move.x
    // initPositionData.cy = initPositionData.move.y
    console.log(`output->initPositionData`, initPositionData)
    // setinitPositionData({ ...initPositionData })
    metaDataList.forEach((item) => {
      if (item.type === initPositionData.type) {
        item.metaAttrs.coordidate = {
          x: item.metaAttrs.move.x,
          y: item.metaAttrs.move.y,
        }
      }
    })
    // setMetaDataList([...metaDataList])

    console.log(metaDataList, "metaDataList")
    document.removeEventListener("pointermove", fnMove, false)
    document.removeEventListener("pointedown", fnDwon, false)
    document.removeEventListener("pointerup", fnUp, false)
  }
  useEffect(() => {
    document.addEventListener("pointerdown", fnDwon, false)
  }, [])

  return (
    <div className="App">
      <div>distance:{initPositionData.move.x}</div>
      <svg width={400} height={400} id="svgId" fill="blue">
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
        {/* <rect
          width={200}
          height={200}
          stroke="red"
          strke-width="4"
          fill="yellow"
          // onClick={getboundingclientRectDataClick}
        ></rect>

        <g className="sprite-container" data-sprite-id="circle">
          <circle
            id="circle"
            // onMouseMove={moveDrag}
            // onMouseDown={startDrag}
            // onMouseUp={endDrag}
            // cx={initPositionData.x}
            // cy={initPositionData.y}
            cx={200}
            cy={200}
            r="50"
          ></circle>
        </g>
        <g
          transform={`translate(${initPositionData.move.x},${initPositionData.move.y})`}
        >
          <rect
            id="rect"
            x="0"
            y="0"
            width={100}
            height={100}
            stroke="#999"
            stroke-width="2"
          ></rect>
        </g> */}
        {/* <text fontSize={18} fill="red" x={200} y={200} textAnchor="middle">
          this is text
        </text> */}
      </svg>
    </div>
  )
}

export default App
