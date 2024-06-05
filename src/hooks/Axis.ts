import { useSvgDimensions } from "./SvgDimensions";

interface AxisProps {
  tickWidth: number;
  padding: number;
  dataLowerBound: number;
  dataUpperBound: number;
  invert: boolean;
  nTicks: number;
}

export const useAxis = ({
  padding,
  dataLowerBound,
  dataUpperBound,
  invert,
  nTicks,
  tickWidth
}: AxisProps) => {
  const { width, height } = useSvgDimensions();

  const outputStart = padding;
  const outputEnd = (invert ? height : width) - padding;

  const slope = (outputEnd - outputStart) / (dataUpperBound - dataLowerBound);

  const positionCalculator = (value: number) =>
    outputStart + slope * (value - dataLowerBound);

  const stepSize = (dataUpperBound - dataLowerBound) / nTicks;

  const stepKeys = [...Array(nTicks + 1).keys()];

  const domainSteps = stepKeys.map((x) => x * stepSize + dataLowerBound);
  const rangeSteps = (invert ? domainSteps.slice().reverse() : domainSteps).map(
    (x) => positionCalculator(x)
  );

  return { domainSteps, rangeSteps };
};
