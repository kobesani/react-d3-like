import { useSvgDimensions } from "../hooks/SvgDimensions";
import Circle from "./Shapes/Circle";

export interface PolygonProps {
  numberOfSides: number;
  radius: number;
  angleShift: number;
}


const Polygon = ({ numberOfSides, radius, angleShift }: PolygonProps) => {
  const { width, height } = useSvgDimensions();

  const angleStepLength = (2 * Math.PI) / numberOfSides;

  const x = [...Array(numberOfSides + 1).keys()].map(
    (x) => radius * Math.cos(angleShift + x * angleStepLength)
  );
  const y = [...Array(numberOfSides + 1).keys()].map(
    (y) => radius * Math.sin(angleShift + y * angleStepLength)
  );

  const pointsString = x
    .map((value, index) => `${width / 2 + value},${height / 2 - y[index]}`)
    .join(" ");

  // console.log(pointsString);

  return (
    <>
      <g>
        {/* <Circle
          cx={width / 2}
          cy={height / 2}
          fill="none"
          r={radius}
          stroke="white"
        /> */}
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={5}
          stroke="none"
          fill="black"
        />
        <polygon stroke="black" points={pointsString} fill="none"></polygon>

        {/* {x.map((value, index) => (
          <Circle
            key={index}
            cx={width / 2 + value}
            cy={height / 2 - y[index]}
            fill="black"
            stroke="none"
            r={5}
          />
        ))} */}
      </g>
    </>
  );
};

export default Polygon;
