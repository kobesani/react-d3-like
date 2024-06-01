import "./assets/css/App.css";

import AxisLeft from "./components/Axes/AxisLeft";
import AxisBottom from "./components/Axes/AxisBottom";
import SvgDimensionsProvider from "./components/Providers/SvgDimensionsProvider";

function App() {
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
          <AxisLeft
            tickWidth={10}
            padding={50}
            dataLowerBound={10}
            dataUpperBound={200}
            invert={true}
            nTicks={10}
          />
          <AxisBottom
            tickWidth={10}
            padding={50}
            dataLowerBound={0}
            dataUpperBound={111}
            invert={false}
            nTicks={10}
          />
        </SvgDimensionsProvider>
      </div>
    </>
  );
}

export default App;
