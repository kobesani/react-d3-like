import { useState, useEffect, useRef } from "react";
import "./assets/css/App.css";

import {
  CircleProps,
  TransformMatrix,
  generateTransformMatrixString,
  LastMousePosition,
  Velocity,
} from "./types/PropTypes";
import Circle from "./components/Circle";

import {
  startGroupPan,
  updateGroupPan,
  finishGroupPan,
  leaveGroupPan,
} from "./utils/PanHandlers";

function App() {
  const svgRef = useRef<SVGSVGElement>(null);
  const defaultCircleColor = "goldenrod";
  const defaultCircleRadius = 10;

  const [circles, setCircles] = useState<CircleProps[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [lastMousePosition, setLastMousePosition] = useState<LastMousePosition>(
    {
      x: 0.0,
      y: 0.0,
    }
  );

  const [transformMatrix, setTransformMatrix] = useState<TransformMatrix>({
    scaleX: 1,
    scaleY: 1,
    shiftX: 0,
    shiftY: 0,
  });

  const [velocity, setVelocity] = useState<Velocity>({
    x: 0.0,
    y: 0.0,
  });

  useEffect(() => {
    const data = [
      { cx: 50, cy: 50 },
      { cx: 100, cy: 100 },
      { cx: 150, cy: 150 },
      { cx: 200, cy: 200 },
    ];
    setCircles(
      data.map(
        (value): CircleProps => ({
          cx: value.cx,
          cy: value.cy,
          fill: defaultCircleColor,
          r: defaultCircleRadius,
        })
      )
    );
  }, []);

  return (
    <>
      <div
        id="svg-container"
        // when mouse up outside svg element ->
        // it doesn't continue dragging when going back in
        onMouseUp={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
      >
        <svg
          ref={svgRef}
          width="800"
          height="600"
          onMouseDown={(event) =>
            startGroupPan(event, setIsDragging, setLastMousePosition)
          }
          onMouseMove={(event) =>
            updateGroupPan(
              event,
              isDragging,
              setLastMousePosition,
              setTransformMatrix,
              setVelocity
            )
          }
          onMouseUp={(event) =>
            finishGroupPan(
              event,
              setIsDragging,
              velocity,
              setTransformMatrix
            )
          }
          onMouseLeave={(event) => leaveGroupPan(event, setIsDragging)}
        >
          <g transform={generateTransformMatrixString(transformMatrix)}>
            {circles.map((datum, index) => (
              <Circle
                key={index}
                cx={datum.cx}
                cy={datum.cy}
                r={datum.r}
                fill={datum.fill}
              />
            ))}
          </g>
        </svg>
      </div>
    </>
  );
}

export default App;
