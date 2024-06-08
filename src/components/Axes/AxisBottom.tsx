import { useSvgDimensions } from "../../hooks/SvgDimensions";
import { useAxis } from "../../hooks/Axis";
import Line from "../Shapes/Line";

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

  const scaleFactor = Math.max(0.65, width / 1900);

  return (
    <>
      <g id="axis-bottom">
        <Line
          id="axis-bottom-line"
          xStart={padding}
          xStop={width - padding}
          yStart={height - padding}
          yStop={height - padding}
          color="black"
        />
      </g>
      <g id="axis-bottom-ticks">
        {rangeSteps.map((step, index) => (
          <Line
            key={index}
            className="axis-bottom-ticks"
            xStart={step}
            xStop={step}
            yStart={height - padding + tickWidth}
            yStop={height - padding}
            color="black"
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
