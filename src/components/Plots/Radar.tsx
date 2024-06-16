import Polygon from "../Polygon";
import { PolygonProps } from "../Polygon";
import { useSvgDimensions } from "../../hooks/SvgDimensions";
import Line from "../Shapes/Line";

export interface RadarPlotProps {
  numberOfSides: number;
  radius: number;
  angleShift: number;
}

const RadarPlot = ({ numberOfSides, radius, angleShift }: RadarPlotProps) => {
  const { width, height } = useSvgDimensions();

  const angleStepLength = (2 * Math.PI) / numberOfSides;

  const x = [...Array(numberOfSides + 1).keys()].map(
    (x) => radius * Math.cos(angleShift + x * angleStepLength)
  );
  const y = [...Array(numberOfSides + 1).keys()].map(
    (y) => radius * Math.sin(angleShift + y * angleStepLength)
  );

  console.log(x, y);
  console.log(width, height);

  return (
    <>
      <Polygon numberOfSides={numberOfSides} radius={50} angleShift={Math.PI / 2} />
      <Polygon numberOfSides={numberOfSides} radius={100} angleShift={Math.PI / 2} />
      <Polygon numberOfSides={numberOfSides} radius={150} angleShift={Math.PI / 2} />
      <Polygon numberOfSides={numberOfSides} radius={200} angleShift={Math.PI / 2} />
      <Polygon numberOfSides={numberOfSides} radius={250} angleShift={Math.PI / 2} />
      {x.map((value, index) => (
        <Line
          className="test"
          key={index}
          xStart={width / 2 + value}
          xStop={width / 2}
          yStart={height / 2 - y[index]}
          yStop={height / 2}
          color="black"
        />
      ))}
    </>
  );
};

export default RadarPlot;
