import logo from "./logo.svg"
import "./App.css"
import { useState, useEffect } from "react"

function App() {
  const [initPositionData, setinitPositionData] = useState({
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
    console.log("move")
    const { pageX, pageY } = e
    console.log(pageX, pageY, "pageX, pageY ")
    const { startPageX, startPageY } = initPositionData
    // mousePointInStage
    const move = {}
    move.x = pageX - startPageX + initPositionData.cx
    move.y = pageY - startPageY + initPositionData.cy
    const transform = `translate(${move.x},${move.y})`
    initPositionData.move = {
      x: move.x,
      y: move.y,
    }
    setinitPositionData({ ...initPositionData })
    setTrans(transform)
  }

  const fnDwon = (e) => {
    console.log("fnss")
    // 获取rect
    const { pageX: startPageX, pageY: startPageY } = e
    initPositionData.startPageX = startPageX
    initPositionData.startPageY = startPageY

    setinitPositionData({ ...initPositionData })
    document.addEventListener("pointermove", fnMove, false)
    document.addEventListener("pointerup", fnUp, false)
  }

  const fnUp = () => {
    console.log("up")
    initPositionData.cx = initPositionData.move.x
    initPositionData.cy = initPositionData.move.y
    console.log(`output->initPositionData`, initPositionData)
    // setinitPositionData({ ...initPositionData })
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
        <rect
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
        <g transform={trans}>
          <rect
            id="rect"
            x="0"
            y="0"
            width={100}
            height={100}
            stroke="#999"
            stroke-width="2"
          ></rect>
        </g>
        {/* <text fontSize={18} fill="red" x={200} y={200} textAnchor="middle">
          this is text
        </text> */}
      </svg>
    </div>
  )
}

export default App
