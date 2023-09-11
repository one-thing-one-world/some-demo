import logo from "./logo.svg"
import "./App.css"
import { useState, useEffect } from "react"
import { metaData } from "./Meta/metaData"
import { findParentByClass } from "./utiles/index.jsx"
function App() {
  const [metaList, setMetaList] = useState(metaData)
  const [activeList, setActiveList] = useState([])
  console.log(`output->metaList`, metaList)
  const [initPositionData, setinitPositionData] = useState({
    type: undefined,
    x: 200,
    y: 200,
    cx: 0,
    cy: 0,
    move: {
      x: 0,
      y: 0,
    },
  })
  const [trans, setTrans] = useState(undefined)
  const fnMove = (e) => {
    const activeGraphList = metaList.filter(
      (item) => item.type === initPositionData.type
    )

    console.log("fnss", initPositionData.type, e)
    console.log("move")
    const { pageX, pageY } = e
    console.log(pageX, pageY, "pageX, pageY ")
    const { startPageX, startPageY } = initPositionData
    // mousePointInStage
    const move = {}
    move.x = pageX - startPageX + initPositionData.cx
    move.y = pageY - startPageY + initPositionData.cy
    // const transform = `translate(${move.x},${move.y})`
    initPositionData.move = {
      x: move.x,
      y: move.y,
    }
    activeGraphList[0].metaAttrs.coordidate.x = move.x
    activeGraphList[0].metaAttrs.coordidate.y = move.y
    setMetaList([...metaList])
    setinitPositionData({ ...initPositionData })
    // setTrans(transform)
  }

  const fnDwon = (e) => {
    const spriteDom = findParentByClass(e.target, "gTagContainer")
    console.log(spriteDom, "spriteDom")
    if (!spriteDom) {
      return
    }
    const domType = spriteDom.getAttribute("data-sprite-id")

    console.log(`output->domType`, domType)

    // 获取rect
    const { pageX: startPageX, pageY: startPageY } = e
    initPositionData.startPageX = startPageX
    initPositionData.startPageY = startPageY
    initPositionData.type = domType
    setinitPositionData({ ...initPositionData })
    document.addEventListener("pointermove", fnMove, false)
    document.addEventListener("pointerup", fnUp, false)
  }

  const fnUp = () => {
    initPositionData.cx = initPositionData.move.x
    initPositionData.cy = initPositionData.move.y
    console.log(`output->initPositionData`, initPositionData)
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
        {metaList.map((metaItem) => {
          const {
            MetaComponent,
            metaAttrs: { coordidate },
          } = metaItem

          return (
            <g
              className="gTagContainer"
              data-sprite-id={metaItem.type}
              key={metaItem.type}
              // transform={`translate(${move.x},${move.y})`}
            >
              <MetaComponent {...metaItem}></MetaComponent>
            </g>
          )
        })}

        {/* <g
          className="gTagContainer"
          data-sprite-id="circle"
          transform={type === "circle" && trans}
        >
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
          className="gTagContainer"
          data-sprite-id="rect"
          transform={type === "rect" && trans}
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
