import { useSvgDimensions } from "../../hooks/SvgDimensions";
import { useAxis } from "../../hooks/Axis";

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
  const { domainSteps, rangeSteps } = useAxis({
    padding,
    dataLowerBound,
    dataUpperBound,
    invert,
    nTicks,
    tickWidth,
  });

  const scaleFactor = Math.max(0.65, (width / 1900));

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
      </g>
      <g transform={`scale(${scaleFactor})`}>
        {rangeSteps.map((step, index) => (
          <text
            id="axis-bottom-tick-labels"
            key={index}
            fill="white"
            x={step / scaleFactor}
            y={(height - padding + tickWidth * 3) / scaleFactor}
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

export default AxisBottom;
