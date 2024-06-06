import { useSvgDimensions } from "../../hooks/SvgDimensions";
import { useAxis } from "../../hooks/Axis";

interface AxisTopProps {
  tickWidth: number;
  padding: number;
  dataLowerBound: number;
  dataUpperBound: number;
  invert: boolean;
  nTicks: number;
}

const AxisTop = ({
  tickWidth,
  padding,
  dataLowerBound,
  dataUpperBound,
  nTicks,
  invert,
}: AxisTopProps) => {
  const { width, height } = useSvgDimensions();
  const { domainSteps, rangeSteps } = useAxis({
    padding,
    dataLowerBound,
    dataUpperBound,
    invert,
    nTicks,
    tickWidth,
  });

  const scaleFactor = Math.max(0.65, width / 1900);

  return (
    <>
      <g id="axis-top">
        <line
          x1={padding}
          x2={width - padding}
          y1={padding}
          y2={padding}
          stroke="black"
        />
      </g>
      <g id="axis-top-ticks">
        {rangeSteps.map((step, index) => (
          <line
            id="axis-top-tick"
            key={index}
            stroke="black"
            x1={step}
            x2={step}
            y1={padding - tickWidth}
            y2={padding}
          />
        ))}
      </g>
      <g transform={`scale(${scaleFactor})`}>
        {rangeSteps.map((step, index) => (
          <text
            id="axis-top-tick-labels"
            key={index}
            fill="white"
            x={step / scaleFactor}
            y={(padding - tickWidth * 3) / scaleFactor}
            fontSize={16}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {domainSteps[index]}
          </text>
        ))}
      </g>
    </>
  );
};

export default AxisTop;
