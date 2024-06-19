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
  tickWidth,
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

interface LinearScaleProps {
  domain: [number, number];
  range: [number, number];
}

export const useLinearScale = ({
  domain,
  range,
}: LinearScaleProps): ((n: number) => number) => {
  return (n: number) =>
    ((range[1] - range[0]) / (domain[1] - domain[0])) * n + range[0];
};

interface LinearAxisProps {
  tickWidth: number;
  padding: number;
  dataLowerBound: number;
  dataUpperBound: number;
  direction: "horizontal" | "vertical";
  nTicks: number;
}

export const useLinearAxis = ({
  padding,
  dataLowerBound,
  dataUpperBound,
  direction,
  nTicks,
  tickWidth,
}: LinearAxisProps) => {
  const { width, height } = useSvgDimensions();

  const result: number = (() => {
    switch (direction) {
      case "horizontal":
        return width - padding;
      case "vertical":
        return height - padding;
      default:
        throw new Error(
          `direction must be "horizontal" or "vertical", received: ${direction}`
        );
    }
  })();

  const mapping = useLinearScale({
    domain: [dataLowerBound, dataUpperBound],
    range: [padding, width - padding],
  });

  const stepSize = (dataUpperBound - dataLowerBound) / nTicks;

  const stepKeys = [...Array(nTicks + 1).keys()];

  const domainSteps = stepKeys.map((x) => x * stepSize + dataLowerBound);
  const rangeSteps = (
    direction === "vertical" ? domainSteps.slice().reverse() : domainSteps
  ).map((x) => mapping(x));

  return { domainSteps, rangeSteps };
};
