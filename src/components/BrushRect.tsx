import { RectangleProps } from "../types/PropTypes";

const BrushRect = (props: RectangleProps) => {
  return (
    <>
      <rect
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
        fill="none"
        stroke="black"
        strokeWidth={1}
      ></rect>
    </>
  );
};

export default BrushRect;
