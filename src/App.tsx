import {
  AlgorithmSettings,
  ClockDisplay,
  FormNewProcess,
  GanttDiagram,
  ProcessControls,
  ProcessTable,
  ProcessUpdatingTable,
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
        <ProcessUpdatingTable />
        <GanttDiagram />
        <SimulationResults />
      </div>
    </SimulationProvider>
  );
}

export default App;
