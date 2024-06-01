import { CircleProps } from "../types/PropTypes";

const Circle = (props: CircleProps) => {
  return (
    <>
      <circle
        cx={props.cx}
        cy={props.cy}
        r={props.r}
        fill={props.fill}
      ></circle>
    </>
  );
};

export default Circle;