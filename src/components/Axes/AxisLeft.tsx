import { useSvgDimensions } from "../../hooks/SvgDimensions";

interface AxisLeftProps {
  tickWidth: number;
  padding: number;
  dataLowerBound: number;
  dataUpperBound: number;
  invert: boolean;
  nTicks: number;
}

const AxisLeft = ({
  tickWidth,
  padding,
  dataLowerBound,
  dataUpperBound,
  nTicks,
  invert,
}: AxisLeftProps) => {
  const { height } = useSvgDimensions();

  const xOutputStart = padding;
  const xOutputEnd = height - padding;
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
      <g id="axis-left">
        <line
          x1={padding}
          x2={padding}
          y1={padding}
          y2={height - padding}
          stroke="black"
        />
      </g>
      <g id="axis-left-ticks">
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
            id="axis-left-tick-labels"
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
