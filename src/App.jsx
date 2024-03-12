import CenterPanel from "./components/CenterPanel";
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import "./css/container.css";

function App() {
  return (
    <>
      <Header />
      <div className="Container">
        <LeftPanel />
        <CenterPanel panelSelect={true}></CenterPanel>
        <RightPanel />
      </div>
    </>
  );
}

export default App;
