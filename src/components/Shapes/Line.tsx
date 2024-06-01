import { useSvgDimensions } from "../../hooks/SvgDimensions";

const Line = () => {
  const { width, height } = useSvgDimensions();

  return <line x1={0} y1={0} x2={width} y2={height} stroke="black" />;
};

export default Line;
