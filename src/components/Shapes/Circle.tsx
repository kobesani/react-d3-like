import { CircleProps } from "./Types";

const Circle = (props: CircleProps) => {
  return (
    <>
      <circle
        cx={props.cx}
        cy={props.cy}
        r={props.r}
        fill={props.fill}
        stroke={props.stroke}
      >
        <title>{props.tooltip}</title>
      </circle>
    </>
  );
};

export default Circle;
