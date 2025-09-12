import { useSimulation } from "../context/SimulationContext";

export function ClockDisplay() {
  const { currentTime } = useSimulation();
  return <div>Tiempo actual: {currentTime}</div>;
}
