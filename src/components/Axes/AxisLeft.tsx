import { useEffect, useState } from "react";

interface AxisLeftProps {
  parentSvgRef: React.RefObject<SVGSVGElement>;
  tickWidth: number;
  padding: number;
  dataLowerBound: number;
  dataUpperBound: number;
  invert: boolean;
  nTicks: number;
}

const AxisLeft = ({
  tickWidth,
  parentSvgRef,
  padding,
  dataLowerBound,
  dataUpperBound,
  nTicks,
  invert,
}: AxisLeftProps) => {
  const [parentExtent, setParentExtent] = useState(0);
  // const [parentHeight, setParentHeight] = useState(0);
  // const [parentWidth, setParentWidth] = useState(0);

  useEffect(() => {
    if (!parentSvgRef.current) return;

    setParentExtent(parentSvgRef.current.clientHeight);
    // setParentHeight(parentSvgRef.current.clientHeight);
    // setParentWidth(parentSvgRef.current.clientWidth);
  }, []);

  if (!parentSvgRef.current) return;

  // setParentExtent(parentSvgRef.current.clientHeight);

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

  return (
    <>
      <g>
        <line
          x1={padding}
          x2={padding}
          y1={padding}
          y2={parentExtent - padding}
          stroke="black"
        />
      </g>
      <g>
        {rangeSteps.map((step, index) => (
          <line
            key={index}
            stroke="black"
            x1={padding - tickWidth}
            y1={step}
            x2={padding}
            y2={step}
          />
        ))}
        {rangeSteps.map((step, index) => (
          <text
            key={index}
            fill="white"
            x={padding - tickWidth * 3}
            y={step}
            textAnchor="middle"
            fontSize={16}
            dominantBaseline="middle"
          >
            {domainSteps[index]}
          </text>
        ))}
      </g>
    </>
  );
};

export default AxisLeft;
