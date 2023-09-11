import MetaCircle from "./MetaCircle"
import MetaLine from "./MetaLine"
import MetaRect from "./MetaRect"

export const metaData = [
  {
    type: "line",
    MetaComponent: MetaLine,
    metaProps: {
      x1: 0,
      y1: 0,
      x2: 100,
      y2: 100,
      stroke: "red",
      strokeWidth: 6,
    },
    metaAttrs: {
      coordidate: {
        x: 100,
        y: 100,
      },
      size: {
        width: 200,
        height: 200,
      },
    },
  },
  {
    type: "rect",
    MetaComponent: MetaRect,
    metaProps: {
      stroke: "red",
      strokeWidth: "2",
      fill: "yellow",
    },
    metaAttrs: {
      coordidate: {
        x: 100,
        y: 100,
      },
      size: {
        width: 200,
        height: 200,
      },
    },
  },
  {
    type: "circle",
    MetaComponent: MetaCircle,
    metaProps: {
      r: 50,
      fill: "red",
    },
    metaAttrs: {
      coordidate: {
        x: 200,
        y: 100,
      },
      size: {
        width: 200,
        height: 200,
      },
    },
  },
]
