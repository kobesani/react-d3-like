import { MouseEvent } from "react";

import {
  CircleProps,
  RectangleProps,
  BoundingBox,
  SVGViewBox,
} from "../types/PropTypes";

export const circleWithinRectangle = (
  circle: CircleProps,
  rectangle: RectangleProps
): boolean => {
  return (
    circle.cx >= rectangle.x &&
    circle.cx <= rectangle.x + rectangle.width &&
    circle.cy >= rectangle.y &&
    circle.cy <= rectangle.y + rectangle.height
  );
};

export const startBrush = (
  event: MouseEvent<HTMLDivElement>,
  svgRef: React.RefObject<SVGSVGElement>,
  svgViewBox: SVGViewBox,
  setBoundingBox: React.Dispatch<React.SetStateAction<BoundingBox | null>>,
  setRectangles: React.Dispatch<React.SetStateAction<RectangleProps[]>>
) => {
  event.preventDefault();

  const svg = svgRef.current;
  if (!svg) return;

  const startX =
    svgViewBox.minx +
    svgViewBox.scaleWidth * event.clientX -
    svg.getBoundingClientRect().left;

  const startY =
    svgViewBox.miny +
    svgViewBox.scaleHeight * event.clientY -
    svg.getBoundingClientRect().top;

  setBoundingBox({ startX, startY, endX: startX, endY: startY });

  const newRect: RectangleProps = {
    x: Math.min(startX, startX),
    y: Math.min(startY, startY),
    width: 0,
    height: 0,
  };

  setRectangles((prevRectangles) => [...prevRectangles, newRect]);
};

export const updateBrush = (
  event: MouseEvent<HTMLDivElement>,
  boundingBox: BoundingBox | null,
  svgRef: React.RefObject<SVGSVGElement>,
  svgViewBox: SVGViewBox,
  rectangles: RectangleProps[],
  setBoundingBox: React.Dispatch<React.SetStateAction<BoundingBox | null>>,
  setRectangles: React.Dispatch<React.SetStateAction<RectangleProps[]>>,
  setCircles: React.Dispatch<React.SetStateAction<CircleProps[]>>,
  defaultCircleColor: string,
  selectedCircleColor: string
) => {
  event.preventDefault();

  if (!boundingBox) return;

  const svg = svgRef.current;
  if (!svg) return;

  const endX =
    svgViewBox.minx +
    svgViewBox.scaleWidth * event.clientX -
    svg.getBoundingClientRect().left;

  const endY =
    svgViewBox.miny +
    svgViewBox.scaleHeight * event.clientY -
    svg.getBoundingClientRect().top;

  setBoundingBox({ ...boundingBox, endX, endY });

  const newRect: RectangleProps = {
    x: Math.min(boundingBox.startX, endX),
    y: Math.min(boundingBox.startY, endY),
    width: Math.abs(endX - boundingBox.startX),
    height: Math.abs(endY - boundingBox.startY),
  };

  if (!rectangles.length) {
    setRectangles([newRect]);
  } else {
    const updatedRectangles = [...rectangles.slice(0, -1), newRect];
    setRectangles(updatedRectangles);
  }

  setCircles((prevCircles) => {
    return prevCircles.map((circle) => {
      const isSelected = rectangles.some((rectangle) =>
        circleWithinRectangle(circle, rectangle)
      );
      return {
        ...circle,
        fill: isSelected ? selectedCircleColor : defaultCircleColor,
      };
    });
  });
};

export const finishBrush = (
  event: MouseEvent<HTMLDivElement>,
  rectangles: RectangleProps[],
  setBoundingBox: React.Dispatch<React.SetStateAction<BoundingBox | null>>,
  setRectangles: React.Dispatch<React.SetStateAction<RectangleProps[]>>
) => {
  event.preventDefault();
  setBoundingBox(null);
  /*
    Removes only last rectangle that happens when you go outside of the box and mouseup
    This works too, but the filter on all 0 height/width rects also works
  */
  // const lastRectangle = rectangles.slice(-1)[0]
  // if (lastRectangle.height === 0 && lastRectangle.width === 0) {
  //   setRectangles(rectangles.slice(0, -1))
  // }
  setRectangles(
    rectangles.filter((rect) => !(rect.height === 0 && rect.width === 0))
  );
};
