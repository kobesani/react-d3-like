import { useSvgDimensions } from "../../hooks/SvgDimensions";
import { useAxis } from "../../hooks/Axis";

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
            id="axis-left-tick"
            key={index}
            stroke="black"
            x1={padding - tickWidth}
            y1={step}
            x2={padding}
            y2={step}
          />
        ))}
      </g>
      <g transform={`scale(${scaleFactor})`}>
        {rangeSteps.map((step, index) => (
          <text
            id="axis-left-tick-labels"
            key={index}
            fill="white"
            x={(padding - tickWidth * 3) / scaleFactor}
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

export default AxisLeft;
