import { MouseEvent } from "react";

import {
  LastMousePosition,
  TransformMatrix,
  Velocity,
} from "../types/PropTypes";

export const startGroupPan = (
  event: MouseEvent<SVGSVGElement>,
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
  setLastMousePosition: React.Dispatch<React.SetStateAction<LastMousePosition>>
) => {
  event.preventDefault();
  setIsDragging(true);
  setLastMousePosition({ x: event.clientX, y: event.clientY });
};

export const updateGroupPan = (
  event: MouseEvent<SVGSVGElement>,
  isDragging: boolean,
  setLastMousePosition: React.Dispatch<React.SetStateAction<LastMousePosition>>,
  setTransformMatrix: React.Dispatch<React.SetStateAction<TransformMatrix>>,
  setVelocity: React.Dispatch<React.SetStateAction<Velocity>>
) => {
  event.preventDefault();

  if (isDragging) {
    setTransformMatrix((prevState) => ({
      ...prevState,
      shiftX: prevState.shiftX + event.movementX,
      shiftY: prevState.shiftY + event.movementY,
    }));

    setLastMousePosition({
      x: event.clientX,
      y: event.clientY,
    });

    setVelocity({ x: event.movementX, y: event.movementY });
  }
};

export const finishGroupPan = (
  event: MouseEvent<SVGSVGElement>,
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
  velocity: Velocity,
  setTransformMatrix: React.Dispatch<React.SetStateAction<TransformMatrix>>
) => {
  event.preventDefault();
  setIsDragging(false);

  const friction = 0.9;

  const updatedVelocity = velocity;

  console.log(updatedVelocity);

  const applyMomentum = () => {
    console.log(updatedVelocity);

    if (
      Math.abs(updatedVelocity.x) < 0.1 &&
      Math.abs(updatedVelocity.y) < 0.1
    ) {
      return; // Stop when velocity is very low
    }

    setTransformMatrix((prevState) => ({
      ...prevState,
      shiftX: prevState.shiftX + updatedVelocity.x,
      shiftY: prevState.shiftY + updatedVelocity.y,
    }));

    updatedVelocity.x *= friction;
    updatedVelocity.y *= friction;

    requestAnimationFrame(applyMomentum);
  };

  requestAnimationFrame(applyMomentum);
};

export const leaveGroupPan = (
  event: MouseEvent<SVGSVGElement>,
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
) => {
  event.preventDefault();
  setIsDragging(false);
};
