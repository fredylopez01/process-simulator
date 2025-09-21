import { useSimulation } from "../../context/useSimulation";

export function ClockDisplay() {
  const { currentTime } = useSimulation();
  return (
    <div className="text-sm font-medium text-gray-500 text-center">
      <span className="text-sm font-bold">⏱️</span> Current Time:{" "}
      <span className="text-indigo-200 font-semibold">{currentTime}</span>
    </div>
  );
}
