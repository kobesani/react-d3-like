export interface CircleProps {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  tooltip: string;
}

export interface RectangleProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BoundingBox {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export interface SVGViewBox {
  minx: number;
  miny: number;
  scaleWidth: number;
  scaleHeight: number;
  viewportWidth: number;
  viewportHeight: number;
}

export interface SVGPanController {
  lastMouseX: number;
  lastMouseY: number;
  velocityX: number;
  velocityY: number;
}

export const generateViewBoxAttribute = (viewBox: SVGViewBox): string => {
  const width = viewBox.scaleWidth * viewBox.viewportWidth;
  const height = viewBox.scaleHeight * viewBox.viewportHeight;
  return `${viewBox.minx} ${viewBox.miny} ${width} ${height}`;
};

export interface TransformMatrix {
  scaleX: number;
  shiftX: number;
  scaleY: number;
  shiftY: number;
}

export interface LastMousePosition {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export const generateTransformMatrixString = (
  matrix: TransformMatrix
): string =>
  `matrix(${matrix.scaleX} 0 0 ${matrix.scaleY} ${matrix.shiftX} ${matrix.shiftY})`;
