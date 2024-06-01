import { useEffect, useState } from "react";

interface AxisProps {
  parentSvgRef: React.RefObject<SVGSVGElement>;
  axisDirection: "vertical" | "horizontal";
  tickWidth: number;
  padding: number;
  dataLowerBound: number;
  dataUpperBound: number;
  invert: boolean;
}

const Axis = ({
  axisDirection,
  tickWidth,
  parentSvgRef,
  padding,
  dataLowerBound,
  dataUpperBound,
  invert,
}: AxisProps) => {
  // if (!parentSvgRef.current) return null;

  const [parentExtent, setParentExtent] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);
  const [parentWidth, setParentWidth] = useState(0);

  // const [outputStart, setOutputStart] = useState(0);
  // const [outputEnd, setOutputEnd] = useState(0);
  // const [outputStart, setOutputStart] = useState<number | null>(null);
  const xAxisExtent = {
    lower: 10,
    upper: 200,
  };

  const yAxisExtent = {
    lower: 0,
    upper: 110,
  };

  useEffect(() => {
    if (!parentSvgRef.current) return;
    const extent =
      axisDirection === "vertical"
        ? parentSvgRef.current.clientHeight
        : parentSvgRef.current.clientWidth;

    setParentExtent(extent);
    setParentHeight(parentSvgRef.current.clientHeight)
    setParentWidth(parentSvgRef.current.clientWidth)
  }, []);

  console.log(parentExtent);

  const xOutputStart = padding;
  const xOutputEnd = parentExtent - padding;
  const xSlope =
    (xOutputEnd - xOutputStart) / (dataUpperBound - dataLowerBound);

  console.log(`${axisDirection}: ${xOutputEnd} ${xOutputStart}`);

  const xPositionCalculator = (xValue: number) =>
    xOutputStart + xSlope * (xValue - dataLowerBound);

  const xNumberOfSteps = 10;
  const xStepSize = (dataUpperBound - dataLowerBound) / xNumberOfSteps;
  const xSteps = (
    invert
      ? [...Array(xNumberOfSteps + 1).keys()].reverse()
      : [...Array(xNumberOfSteps + 1).keys()]
  ).map((x) => xPositionCalculator(x * xStepSize + dataLowerBound));

  console.log(`${axisDirection}: ${xStepSize} ${xSteps}`);

  return (
    <>
      <g>
        {axisDirection === "vertical" ? (
          <line
            x1={padding}
            x2={padding}
            y1={padding}
            y2={parentExtent - padding}
            stroke="black"
          />
        ) : (
          <line
            x1={padding}
            x2={parentExtent - padding}
            y1={parentHeight - padding}
            y2={parentHeight - padding}
            stroke="black"
          />
        )}
      </g>
      <g>
        {axisDirection === "vertical"
          ? xSteps.map((step, index) => (
              <line
                key={index}
                stroke="black"
                x1={padding - tickWidth}
                x2={padding}
                y1={step}
                y2={step}
              />
            ))
          : xSteps.map((step, index) => (
              <line
                key={index}
                stroke="black"
                x1={step}
                x2={step}
                y1={580 + tickWidth}
                y2={580}
              />
            ))}
      </g>
    </>
  );
};

export default Axis;
