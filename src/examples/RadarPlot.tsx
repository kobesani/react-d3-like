import "../assets/css/App.css";

import SvgDimensionsProvider from "../components/Providers/SvgDimensionsProvider";
import RadarPlot from "../components/Plots/Radar";

function App() {
  return (
    <>
      <div
        id="svg-container-1"
        className="svg-container"
        style={{
          height: "600px",
          width: "600px",
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
