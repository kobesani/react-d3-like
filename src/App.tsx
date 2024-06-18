import "./assets/css/App.css";

import AxisLeft from "./components/Axes/AxisLeft";
import AxisBottom from "./components/Axes/AxisBottom";
import AxisRight from "./components/Axes/AxisRight";
import AxisTop from "./components/Axes/AxisTop";
import SvgDimensionsProvider from "./components/Providers/SvgDimensionsProvider";

import { useIrisData } from "./hooks/IrisData";
import Scatterplot from "./components/Plots/Scatter";
import Polygon from "./components/Polygon";
import RadarPlot from "./components/Plots/Radar";

function App() {
  const { x, y, minX, minY, maxX, maxY } = useIrisData({
    xColumn: "petal_length",
    yColumn: "petal_width",
  });

  return (
    <>
      <div
        id="svg-container-1"
        className="svg-container"
        style={{
          height: "600px",
          // width: "600px",
          width: "100%",
        }}
      >
        <SvgDimensionsProvider>
          <Scatterplot
            x={x as number[]}
            y={y as number[]}
            minX={1}
            minY={0}
            maxX={7}
            maxY={3}
            padding={50}
            color="seagreen"
          />
          <AxisLeft
            tickWidth={10}
            padding={50}
            dataLowerBound={0}
            dataUpperBound={3}
            invert={true}
            nTicks={3}
          />
          <AxisRight
            tickWidth={10}
            padding={50}
            dataLowerBound={0}
            dataUpperBound={3}
            invert={true}
            nTicks={3}
          />
          <AxisBottom
            tickWidth={10}
            padding={50}
            dataLowerBound={1}
            dataUpperBound={7}
            invert={false}
            nTicks={6}
          />
          <AxisTop
            tickWidth={10}
            padding={50}
            dataLowerBound={1}
            dataUpperBound={7}
            invert={false}
            nTicks={6}
          />
        </SvgDimensionsProvider>
      </div>
      <div
        id="svg-container-2"
        className="svg-container"
        style={{
          height: "600px",
          width: "600px",
          // width: "100%",
        }}
      >
        <SvgDimensionsProvider>
          <RadarPlot numberOfSides={5} radius={250} angleShift={Math.PI / 2} />
        </SvgDimensionsProvider>
      </div>
    </>
  );
}

export default App;
