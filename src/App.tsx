import {
  AlgorithmSettings,
  ClockDisplay,
  FormNewProcess,
  ProcessControls,
  ProcessTable,
  SimulationResults,
} from "./components";
import { SimulationProvider } from "./context/SimulationContext";

function App() {
  return (
    <SimulationProvider>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h2>Simulador de Planificación de Procesos</h2>
        <FormNewProcess />
        <AlgorithmSettings />
        <ProcessControls />
        <ClockDisplay />
        <ProcessTable />
        <SimulationResults />
      </div>
    </SimulationProvider>
  );
}

export default App;
