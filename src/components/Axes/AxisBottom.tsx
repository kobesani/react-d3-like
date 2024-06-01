import { useEffect, useState } from "react";

interface AxisBottomProps {
  parentSvgRef: React.RefObject<SVGSVGElement>;
  tickWidth: number;
  padding: number;
  dataLowerBound: number;
  dataUpperBound: number;
  invert: boolean;
  nTicks: number;
}

const AxisBottom = ({
  tickWidth,
  parentSvgRef,
  padding,
  dataLowerBound,
  dataUpperBound,
  nTicks,
  invert,
}: AxisBottomProps) => {
  const [parentExtent, setParentExtent] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);
  //   const [parentWidth, setParentWidth] = useState(0);

  useEffect(() => {
    if (!parentSvgRef.current) return;

    setParentExtent(parentSvgRef.current.clientWidth);
    setParentHeight(parentSvgRef.current.clientHeight);
    // setParentWidth(parentSvgRef.current.clientWidth);
  }, []);

  console.log(parentExtent);

  const xOutputStart = padding;
  const xOutputEnd = parentExtent - padding;
  const xSlope =
    (xOutputEnd - xOutputStart) / (dataUpperBound - dataLowerBound);

  const xPositionCalculator = (xValue: number) =>
    xOutputStart + xSlope * (xValue - dataLowerBound);

  const stepSize = (dataUpperBound - dataLowerBound) / nTicks;

  const domainSteps = [...Array(nTicks + 1).keys()].map(
    (x) => x * stepSize + dataLowerBound
  );

  const rangeSteps = (invert ? domainSteps.slice().reverse() : domainSteps).map(
    (x) => xPositionCalculator(x)
  );
  console.log(domainSteps);
  console.log(rangeSteps);

  return (
    <>
      <g>
        <line
          x1={padding}
          x2={parentExtent - padding}
          y1={parentHeight - padding}
          y2={parentHeight - padding}
          stroke="black"
        />
      </g>
      <g>
        {rangeSteps.map((step, index) => (
          <line
            key={index}
            stroke="black"
            x1={step}
            x2={step}
            y1={parentHeight - padding + tickWidth}
            y2={parentHeight - padding}
          />
        ))}
        {rangeSteps.map((step, index) => (
          <text
            key={index}
            fill="white"
            x={step}
            y={parentHeight - padding + tickWidth * 3}
            fontSize={16}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {Math.round(domainSteps[index])}
          </text>
        ))}
      </g>
    </>
  );
};

export default AxisBottom;
