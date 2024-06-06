import "./assets/css/App.css";

import AxisLeft from "./components/Axes/AxisLeft";
import AxisBottom from "./components/Axes/AxisBottom";
import AxisRight from "./components/Axes/AxisRight";
import AxisTop from "./components/Axes/AxisTop";
import SvgDimensionsProvider from "./components/Providers/SvgDimensionsProvider";

import { useIrisData } from "./hooks/IrisData";
import Scatterplot from "./components/Plots/Scatter";

function App() {
  const { x, y, minX, minY, maxX, maxY } = useIrisData({
    xColumn: "petal_length",
    yColumn: "petal_width",
  });
  return (
    <>
      <div
        id="svg-container"
        style={{
          height: "600px",
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
            maxY={2.5}
            padding={50}
          />
          <AxisLeft
            tickWidth={10}
            padding={50}
            dataLowerBound={0}
            dataUpperBound={2.5}
            invert={true}
            nTicks={5}
          />
          {/* <AxisRight
            tickWidth={10}
            padding={50}
            dataLowerBound={10}
            dataUpperBound={200}
            invert={true}
            nTicks={10}
          /> */}
          <AxisBottom
            tickWidth={10}
            padding={50}
            dataLowerBound={1}
            dataUpperBound={7}
            invert={false}
            nTicks={6}
          />
          {/* <AxisTop
            tickWidth={10}
            padding={50}
            dataLowerBound={0}
            dataUpperBound={111}
            invert={false}
            nTicks={10}
          /> */}
        </SvgDimensionsProvider>
      </div>
    </>
  );
}

export default App;
