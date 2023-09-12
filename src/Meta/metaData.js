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
        x: 0,
        y: 0,
      },
      size: {
        width: 100,
        height: 100,
      },
      move: {
        x: 0,
        y: 0,
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
        x: 0,
        y: 0,
      },
      size: {
        width: 200,
        height: 200,
      },
      move: {
        x: 0,
        y: 0,
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
        x: 0,
        y: 0,
      },
      size: {
        width: 100,
        height: 100,
      },
      move: {
        x: 0,
        y: 0,
      },
    },
  },
]

export const eightPoints = [
  {
    name: "top",
    position: { x: 50, y: 0 },
    angle: -90,
  },
  {
    name: "top-right",
    position: { x: 100, y: 0 },
    angle: -45,
  },
  {
    name: "right",
    position: { x: 100, y: 50 },
    angle: 0,
  },
  {
    name: "right-bottom",
    position: { x: 100, y: 100 },
    angle: 45,
  },
  {
    name: "bottom",
    position: { x: 50, y: 100 },
    angle: 90,
  },
  {
    name: "bottom-left",
    position: { x: 0, y: 100 },
    angle: 135,
  },
  {
    name: "left",
    position: { x: 0, y: 50 },
    angle: 180,
  },
  {
    name: "left-top",
    position: { x: 0, y: 0 },
    angle: 225,
  },
]
