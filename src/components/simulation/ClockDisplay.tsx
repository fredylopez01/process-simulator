import { useSimulation } from "../../context/useSimulation";

export function ClockDisplay() {
  const { currentTime } = useSimulation();
  return <div>Tiempo actual: {currentTime}</div>;
}
