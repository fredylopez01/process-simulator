import { useSimulation } from "../../context/useSimulation";

export function ClockDisplay() {
  const { currentTime } = useSimulation();
  return (
    <div className="text-lg font-semibold text-gray-700 text-center">
      Tiempo actual:{" "}
      <span className="text-indigo-600 font-bold">{currentTime}</span>
    </div>
  );
}
