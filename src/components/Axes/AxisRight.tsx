import { useAxis } from "../../hooks/Axis";
import { useSvgDimensions } from "../../hooks/SvgDimensions";
import Line from "../Shapes/Line";

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
        <Line
          id="axis-right-line"
          xStart={width - padding}
          xStop={width - padding}
          yStart={padding}
          yStop={height - padding}
          color="black"
        />
      </g>
      <g id="axis-right-ticks">
        {rangeSteps.map((step, index) => (
          <Line
            key={index}
            className="axis-right-ticks"
            xStart={width - (padding - tickWidth)}
            xStop={width - padding}
            yStart={step}
            yStop={step}
            color="black"
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
