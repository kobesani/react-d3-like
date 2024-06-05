import { useAxis } from "../../hooks/Axis";
import { useSvgDimensions } from "../../hooks/SvgDimensions";

interface AxisRightProps {
  tickWidth: number;
  padding: number;
  dataLowerBound: number;
  dataUpperBound: number;
  invert: boolean;
  nTicks: number;
}

const AxisRight = ({
  tickWidth,
  padding,
  dataLowerBound,
  dataUpperBound,
  nTicks,
  invert,
}: AxisRightProps) => {
  const { width, height } = useSvgDimensions();
  const { domainSteps, rangeSteps } = useAxis({
    padding,
    dataLowerBound,
    dataUpperBound,
    invert,
    nTicks,
    tickWidth,
  });

  const scaleFactor = Math.max(0.6, width / 1900);

  return (
    <>
      <g id="axis-right">
        <line
          x1={width - padding}
          x2={width - padding}
          y1={padding}
          y2={height - padding}
          stroke="black"
        />
      </g>
      <g id="axis-right-ticks">
        {rangeSteps.map((step, index) => (
          <line
            id="axis-right-tick"
            key={index}
            stroke="black"
            x1={width - (padding - tickWidth)}
            y1={step}
            x2={width - padding}
            y2={step}
          />
        ))}
      </g>
      <g transform={`scale(${scaleFactor})`}>
        {rangeSteps.map((step, index) => (
          <text
            id="axis-right-tick-labels"
            key={index}
            fill="white"
            x={(width - (padding - tickWidth * 3)) / scaleFactor}
            y={step / scaleFactor}
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

export default AxisRight;
