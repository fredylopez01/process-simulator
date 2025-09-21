import { useState } from "react";
import { useSimulation } from "../../context/useSimulation";

// Componente FormNewProcess compacto
export function FormNewProcess() {
  const { addProcessListener, running, currentTime, totalTime } =
    useSimulation();
  const [arrivalTime, setArrivalTime] = useState(0);
  const [burstTime, setBurstTime] = useState(1);
  const [priority, setPriority] = useState(1);

  const handleSubmit = () => {
    addProcessListener({
      arrivalTime,
      burstTime,
      completionTime: 0,
      turnaroundTime: 0,
      waitingTime: 0,
      priority,
    });
    setArrivalTime(0);
    setBurstTime(1);
    setPriority(1);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 h-full flex flex-col">
      <h3 className="text-md font-bold text-gray-800 mb-3 border-b pb-2">
        ➕ New Process
      </h3>

      <div className="grid grid-cols-4 gap-3 flex-1">
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-600 mb-1">
            Arrival Time
          </label>
          <input
            type="number"
            value={arrivalTime}
            min={0}
            onChange={(e) => setArrivalTime(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={running}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-600 mb-1">
            Burst Time
          </label>
          <input
            type="number"
            value={burstTime}
            min={1}
            onChange={(e) => setBurstTime(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={running}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-600 mb-1">
            Priority
          </label>
          <input
            type="number"
            value={priority}
            min={1}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={running}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-3 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          disabled={
            (currentTime > 0 && currentTime != totalTime && !running) || running
          }
        >
          Add process
        </button>
      </div>
    </div>
  );
}
