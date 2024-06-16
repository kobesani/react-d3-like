export interface CircleProps {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  tooltip?: string;
  stroke: string;
}

export interface LineProps {
  id?: string;
  className?: string;
  xStart: number;
  xStop: number;
  yStart: number;
  yStop: number;
  color: string;
}
