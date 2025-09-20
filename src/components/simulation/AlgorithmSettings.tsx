import { useSimulation } from "../../context/useSimulation";

const algorithms = [
  { id: "FCFS", label: "FCFS" },
  { id: "SJF", label: "SJF" },
  { id: "RR", label: "Round Robin" },
];

export function AlgorithmSettings() {
  const {
    algorithm,
    setAlgorithm,
    quantum,
    setQuantum,
    intervalMs,
    setIntervalMs,
    running,
  } = useSimulation();

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 h-full flex flex-col">
      <h3 className="text-md font-bold text-gray-800 mb-3 border-b pb-2">
        ⚙️ Configuración
      </h3>

      <div className="grid grid-cols-3 gap-3 flex-1">
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-600 mb-1">
            Algoritmo
          </label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={running}
          >
            {algorithms.map((algo) => (
              <option key={algo.id} value={algo.id}>
                {algo.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-600 mb-1">
            Intervalo (ms)
          </label>
          <input
            type="number"
            min={100}
            value={intervalMs}
            onChange={(e) => setIntervalMs(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={running}
          />
        </div>

        {algorithm === "RR" && (
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-600 mb-1">
              Quantum
            </label>
            <input
              type="number"
              min={1}
              value={quantum}
              onChange={(e) => setQuantum(Number(e.target.value))}
              className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={running}
            />
          </div>
        )}
      </div>
    </div>
  );
}
