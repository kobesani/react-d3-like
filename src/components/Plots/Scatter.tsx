import { useSvgDimensions } from "../../hooks/SvgDimensions";
import Circle from "../Shapes/Circle";

interface ScatterplotProps {
  x: number[];
  y: number[];
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  padding: number;
  color: string;
}

const Scatterplot = ({
  x,
  y,
  minX,
  minY,
  maxX,
  maxY,
  padding,
  color,
}: ScatterplotProps) => {
  const { width, height } = useSvgDimensions();

  const startX = padding;
  const endX = width - padding;
  const xSlope = (endX - startX) / (maxX - minX);
  const xPositionCalculator = (value: number) =>
    startX + xSlope * (value - minX);
  const transformedX = x.map((x) => xPositionCalculator(x));

  const startY = height - padding;
  const endY = padding;
  const ySlope = (endY - startY) / (maxY - minY);
  const yPositionCalculator = (value: number) =>
    startY + ySlope * (value - minY);
  const transformedY = y.map((y) => yPositionCalculator(y));

  return (
    <>
      <g id="points">
        {transformedX.map((value, index) => (
          <Circle
            key={index}
            cx={value}
            cy={transformedY[index]}
            r={5}
            fill={color}
            tooltip={`(${x[index].toFixed(2)}, ${y[index].toFixed(2)})`}
            stroke="none"
          />
        ))}
      </g>
    </>
  );
};

export default Scatterplot;
