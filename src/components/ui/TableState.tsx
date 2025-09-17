import { useSimulation } from "../../context/useSimulation";
import { useEffect, useState } from "react";
import type { PCB } from "../../simulator/models/PCB";

type TableStateProps = {
  targetState: string;
};

export function TableState({ targetState }: TableStateProps) {
  const { processes } = useSimulation();
  const [filteredProcesses, setFilteredProcesses] = useState<PCB[]>([]);

  const filterProcessesByState = () => {
    const result = processes.filter(
      (process) => process.state === targetState
    );
    setFilteredProcesses(result);
  };

  useEffect(() => {
    filterProcessesByState();
  }, [processes, targetState]);

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-lg font-bold text-indigo-600 mb-3 text-center">
        {targetState}
      </h2>
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-indigo-100">
          <tr>
            <th className="border border-gray-300 px-2 py-1">ID</th>
            <th className="border border-gray-300 px-2 py-1">Remaining</th>
            <th className="border border-gray-300 px-2 py-1">State</th>
          </tr>
        </thead>
        <tbody>
          {filteredProcesses.map((process, i) => (
            <tr
              key={process.id}
              className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="border border-gray-300 px-2 py-1 text-center">
                {process.id}
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                {process.remainingTime}
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                {process.state}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
