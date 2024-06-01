import { useRef } from "react";

const SvgCanvas = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <svg ref={svgRef}>
      <g>
        <text>Test</text>
      </g>
    </svg>
  );
};

export default SvgCanvas;
