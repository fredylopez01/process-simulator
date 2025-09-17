import {
  SimulationSection
} from "./components/SimulationSection";
import { SimulationProvider } from "./context/SimulationProvider";

function App() {
  return (
    <SimulationProvider>
      <SimulationSection/>
    </SimulationProvider>

    

  );
}

export default App;
