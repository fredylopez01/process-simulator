import { useSimulation } from "../../context/useSimulation";
import type { PCB } from "../../simulator/models/PCB";

export function ProcessTable() {
  const { processes, deleteProcess, running, currentTime, totalTime } =
    useSimulation();

  const getStateColor = (state: string) => {
    const colors: Record<string, string> = {
      Created: "bg-gray-500",
      Ready: "bg-blue-500",
      Executing: "bg-green-500",
      Waiting: "bg-yellow-500",
      WaitingIO: "bg-orange-500",
      Terminated: "bg-red-500",
    };
    return colors[state] || "bg-gray-300";
  };

  const getProgressPercentage = (process: PCB) => {
    if (process.burstTime === 0) return 100;
    const executed = process.burstTime - process.remainingTime;
    return Math.min((executed / process.burstTime) * 100, 100);
  };

  return (
    <div className="overflow-auto">
      <table className="w-full">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Arrival Time
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Burst Time
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Remaining Time
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-80">
              State and progress
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-30">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {processes
            .sort((a, b) => a.id - b.id)
            .map((process, index) => {
              const progress = getProgressPercentage(process);
              const stateColor = getStateColor(process.state);

              return (
                <tr
                  key={process.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    P{process.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {process.arrivalTime}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {process.burstTime}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {process.remainingTime}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {process.priority}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full w-20 text-center text-xs font-medium text-white ${stateColor}`}
                      >
                        {process.state}
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${stateColor}`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 w-8">
                        {Math.round(progress)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => deleteProcess(process.id)}
                      disabled={
                        (currentTime > 0 &&
                          currentTime != totalTime &&
                          !running) ||
                        running
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
