import { useSvgDimensions } from "../../hooks/SvgDimensions";
import { useAxis } from "../../hooks/Axis";
import Line from "../Shapes/Line";

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
        <Line
          id="axis-top-line"
          xStart={padding}
          xStop={width - padding}
          yStart={padding}
          yStop={padding}
          color="black"
        />
      </g>
      <g id="axis-top-ticks">
        {rangeSteps.map((step, index) => (
          <Line
            className="axis-top-ticks"
            key={index}
            xStart={step}
            xStop={step}
            yStart={padding - tickWidth}
            yStop={padding}
            color="black"
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
