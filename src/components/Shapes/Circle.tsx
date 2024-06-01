import { useSvgDimensions } from "../../hooks/SvgDimensions";

const Circle = () => {
  const { width, height } = useSvgDimensions();
  const radius = Math.min(width, height) / 4;

  return <circle cx={width / 2} cy={height / 2} r={radius} fill="blue" />;
};

export default Circle;
