import { useSvgDimensions } from "../../hooks/SvgDimensions";

interface AxisBottomProps {
  tickWidth: number;
  padding: number;
  dataLowerBound: number;
  dataUpperBound: number;
  invert: boolean;
  nTicks: number;
}

const AxisBottom = ({
  tickWidth,
  padding,
  dataLowerBound,
  dataUpperBound,
  nTicks,
  invert,
}: AxisBottomProps) => {
  const { width, height } = useSvgDimensions();

  const xOutputStart = padding;
  const xOutputEnd = width - padding;
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
      <g id="axis-bottom">
        <line
          x1={padding}
          x2={width - padding}
          y1={height - padding}
          y2={height - padding}
          stroke="black"
        />
      </g>
      <g id="axis-bottom-ticks">
        {rangeSteps.map((step, index) => (
          <line
            key={index}
            stroke="black"
            x1={step}
            x2={step}
            y1={height - padding + tickWidth}
            y2={height - padding}
          />
        ))}
        {rangeSteps.map((step, index) => (
          <text
            id="axis-bottom-tick-labels"
            key={index}
            fill="white"
            x={step}
            y={height - padding + tickWidth * 3}
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
