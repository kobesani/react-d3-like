import { LineProps } from "./Types";

const Line = (props: LineProps) => {
  return (
    <line
      className={props.className}
      x1={props.xStart}
      x2={props.xStop}
      y1={props.yStart}
      y2={props.yStop}
      stroke={props.color}
      id={props.id}
    ></line>
  );
};

export default Line;
