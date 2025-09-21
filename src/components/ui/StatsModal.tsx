import { useSimulation } from "../../context/useSimulation";

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StatsModal({ isOpen, onClose }: StatsModalProps) {
  const { processes, currentTime, algorithm } = useSimulation();

  if (!isOpen) return null;

  // Calcular estadísticas
  const completedProcesses = processes.filter((p) => p.state === "Terminated");
  const totalProcesses = processes.length;
  const avgTurnaroundTime =
    completedProcesses.length > 0
      ? completedProcesses.reduce((sum, p) => sum + p.turnaroundTime, 0) /
        completedProcesses.length
      : 0;
  const avgWaitingTime =
    completedProcesses.length > 0
      ? completedProcesses.reduce((sum, p) => sum + p.waitingTime, 0) /
        completedProcesses.length
      : 0;
  const totalBurst = processes.reduce((sum, p) => sum + p.burstTime, 0);
  const cpuUtilization = currentTime > 0 ? (totalBurst / currentTime) * 100 : 0;
  const throughput =
    currentTime > 0 ? completedProcesses.length / currentTime : 0;

  // Estadísticas por estado
  const stateStats = {
    Created: processes.filter((p) => p.state === "Created").length,
    Ready: processes.filter((p) => p.state === "Ready").length,
    Executing: processes.filter((p) => p.state === "Executing").length,
    Waiting: processes.filter((p) => p.state === "Waiting").length,
    WaitingIO: processes.filter((p) => p.state === "WaitingIO").length,
    Terminated: processes.filter((p) => p.state === "Terminated").length,
  };

  const getStateColor = (state: string) => {
    const colors: Record<string, string> = {
      Created: "text-gray-600 bg-gray-100",
      Ready: "text-blue-600 bg-blue-100",
      Executing: "text-green-600 bg-green-100",
      Waiting: "text-yellow-600 bg-yellow-100",
      WaitingIO: "text-orange-600 bg-orange-100",
      Terminated: "text-red-600 bg-red-100",
    };
    return colors[state] || "text-gray-600 bg-gray-100";
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal */}
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full relative z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gray-900 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">
                📊 Simulation Statistics
              </h3>
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Estadísticas Generales */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">
                  📈 General
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Algorithm:</span>
                    <span className="font-medium text-blue-900">
                      {algorithm}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Total Time:</span>
                    <span className="font-medium text-blue-900">
                      {currentTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Total Processes:</span>
                    <span className="font-medium text-blue-900">
                      {totalProcesses}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Completed:</span>
                    <span className="font-medium text-blue-900">
                      {completedProcesses.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Métricas de Rendimiento */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-green-800 mb-3">
                  ⚡ Performance
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-green-700">
                      Average Waiting Time:
                    </span>
                    <span className="font-medium text-green-900">
                      {avgWaitingTime.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">
                      Average Turnaround Time:
                    </span>
                    <span className="font-medium text-green-900">
                      {avgTurnaroundTime.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">CPU Utilization:</span>
                    <span className="font-medium text-green-900">
                      {cpuUtilization.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Throughput:</span>
                    <span className="font-medium text-green-900">
                      {throughput.toFixed(3)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Estados de Procesos */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-purple-800 mb-3">
                  🔄 States
                </h4>
                <div className="space-y-2">
                  {Object.entries(stateStats).map(([state, count]) => (
                    <div
                      key={state}
                      className="flex items-center justify-between"
                    >
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStateColor(
                          state
                        )}`}
                      >
                        {state}
                      </span>
                      <span className="font-medium text-purple-900">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabla detallada de procesos */}
            {completedProcesses.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  📋 Details of Completed Processes
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Process
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Priority
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Arrival T.
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Burst T.
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Completion T.
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Turnaround T. <br />
                          CT - AT
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Waiting T. <br />
                          TT - BT
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {completedProcesses.map((process) => (
                        <tr key={process.id} className="hover:bg-gray-50">
                          <td className="px-3 py-2 text-sm font-medium text-gray-900">
                            P{process.id}
                          </td>
                          <td className="px-3 py-2 text-sm text-gray-500">
                            {process.priority}
                          </td>
                          <td className="px-3 py-2 text-sm text-gray-500">
                            {process.arrivalTime}
                          </td>
                          <td className="px-3 py-2 text-sm text-gray-500">
                            {process.burstTime}
                          </td>
                          <td className="px-3 py-2 text-sm text-gray-500">
                            {process.completionTime}
                          </td>
                          <td className="px-3 py-2 text-sm text-gray-500">
                            {process.turnaroundTime}
                          </td>
                          <td className="px-3 py-2 text-sm text-gray-500">
                            {process.waitingTime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-3 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
