import { MouseEvent } from "react";

import { SVGPanController, SVGViewBox } from "../types/PropTypes";

export const startPan = (
  event: MouseEvent<HTMLDivElement>,
  svgPanController: SVGPanController,
  setSvgPanController: React.Dispatch<React.SetStateAction<SVGPanController>>,
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
) => {
  event.preventDefault();

  setIsDragging(true);

  setSvgPanController({
    ...svgPanController,
    lastMouseX: event.clientX,
    lastMouseY: event.clientY,
  });
};

export const updatePan = (
  event: MouseEvent<HTMLDivElement>,
  svgViewBox: SVGViewBox,
  setSvgViewBox: React.Dispatch<React.SetStateAction<SVGViewBox>>,
  svgPanController: SVGPanController,
  setSvgPanController: React.Dispatch<React.SetStateAction<SVGPanController>>,
  isDragging: boolean
) => {
  event.preventDefault();
  if (isDragging) {
    const deltaX = event.clientX - svgPanController.lastMouseX;
    const deltaY = event.clientY - svgPanController.lastMouseY;

    const newViewBoxX = svgViewBox.minx - deltaX;
    const newViewBoxY = svgViewBox.miny - deltaY;

    setSvgViewBox({
      ...svgViewBox,
      minx: newViewBoxX,
      miny: newViewBoxY,
    });

    setSvgPanController({
      ...svgPanController,
      velocityX: deltaX,
      velocityY: deltaY,
      lastMouseX: event.clientX,
      lastMouseY: event.clientY,
    });
  }
};

// mouse up in pan mode
export const finishPan = (
  event: MouseEvent<HTMLDivElement>,
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
) => {
  event.preventDefault();
  setIsDragging(false);
};

export const leavePan = (
  event: MouseEvent<HTMLDivElement>,
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
) => {
  event.preventDefault();
  setIsDragging(false);
};
