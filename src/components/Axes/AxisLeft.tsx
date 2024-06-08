import { useSvgDimensions } from "../../hooks/SvgDimensions";
import { useAxis } from "../../hooks/Axis";
import Line from "../Shapes/Line";

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
        <Line
          id="axis-left-line"
          xStart={padding}
          xStop={padding}
          yStart={padding}
          yStop={height - padding}
          color="black"
        />
      </g>
      <g id="axis-left-ticks">
        {rangeSteps.map((step, index) => (
          <Line
            key={index}
            className="axis-left-ticks"
            xStart={padding - tickWidth}
            xStop={padding}
            yStart={step}
            yStop={step}
            color="black"
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
