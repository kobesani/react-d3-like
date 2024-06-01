import { useState, useEffect, useRef } from "react";

import "./assets/css/App.css";
import AxisLeft from "./components/Axes/AxisLeft";
import AxisBottom from "./components/Axes/AxisBottom";
import SvgDimensionsProvider from "./components/Providers/SvgDimensionsProvider";
import Circle from "./components/Shapes/Circle";
import Line from "./components/Shapes/Line";

function App() {
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <>
      <div
        id="svg-container"
        style={{
          height: "600px",
          width: "100%",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        }}
      >
        {/* <svg ref={svgRef} width="100%" height="100%">
          <AxisLeft
            tickWidth={10}
            parentSvgRef={svgRef}
            padding={50}
            dataLowerBound={10}
            dataUpperBound={200}
            invert={true}
            nTicks={10}
          />
          <AxisBottom
            tickWidth={10}
            parentSvgRef={svgRef}
            padding={50}
            dataLowerBound={0}
            dataUpperBound={111}
            invert={false}
            nTicks={10}
          />
        </svg> */}
        <SvgDimensionsProvider>
          <Line />
          <Circle />
        </SvgDimensionsProvider>
      </div>
    </>
  );
}

export default App;
