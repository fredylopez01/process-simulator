import { useState } from "react";
import { useSimulation } from "../../context/useSimulation";

export function FormNewProcess() {
  const { addProcessListener } = useSimulation();
  const [arrivalTime, setArrivalTime] = useState(0);
  const [burstTime, setBurstTime] = useState(1);
  const [priority, setPriority] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-wrap gap-6 items-end"
    >
      {/* Arrival Time */}
      <label className="flex flex-col text-sm font-medium text-gray-600 w-32">
        Arrival Time
        <input
          type="number"
          name="arrivalTime"
          id="arrivalTime"
          value={arrivalTime}
          min={0}
          onChange={(e) => setArrivalTime(Number(e.target.value))}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      {/* Burst Time */}
      <label className="flex flex-col text-sm font-medium text-gray-600 w-32">
        Burst Time
        <input
          type="number"
          name="burstTime"
          id="burstTime"
          value={burstTime}
          min={1}
          onChange={(e) => setBurstTime(Number(e.target.value))}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      {/* Priority */}
      <label className="flex flex-col text-sm font-medium text-gray-600 w-32">
        Priority
        <input
          type="number"
          name="priority"
          id="priority"
          value={priority}
          min={1}
          onChange={(e) => setPriority(Number(e.target.value))}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition"
      >
        Agregar Proceso
      </button>
    </form>
  );
}
