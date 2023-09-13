import "./App.css"
import { useState, useEffect } from "react"
import { metaData } from "./Meta/metaData"
import { findParentByClass } from "./utiles/index.jsx"
import ResizeMeta from "./components/ResizeMeta"
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

    setActiveGraphObj({ ...activeObj })
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

  useEffect(() => {
    console.log(activeGraphObj, "activeGraphObj")
  }, [activeGraphObj])

  return (
    <div className="App">
      <svg width={900} height={900} id="svgId" fill="blue">
        <rect
          x={-activeGraphObj?.metaProps?.r || 0}
          y={-activeGraphObj?.metaProps?.r || 0}
          width={activeGraphObj?.metaAttrs?.size?.width || 0}
          height={activeGraphObj?.metaAttrs?.size?.height || 0}
          transform={`translate(${activeGraphObj?.metaAttrs?.move?.x || 0},${
            activeGraphObj?.metaAttrs?.move?.y || 0
          })`}
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
              transform={`translate(${move?.x || 0},${move?.y || 0})`}
            >
              <MetaComponent {...metaItem}></MetaComponent>
              <text
                fontSize={18}
                fill="white"
                x={200}
                y={200}
                textAnchor="middle"
              >
                {move?.x},{move?.y}
              </text>
            </g>
          )
        })}
        <ResizeMeta
          metaDataList={metaDataList}
          activeGraphObj={activeGraphObj}
          setActiveGraphObj={setActiveGraphObj}
          setMetaDataList={setMetaDataList}
        ></ResizeMeta>
      </svg>
    </div>
  )
}

export default App
