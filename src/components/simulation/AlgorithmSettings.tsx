import { useSimulation } from "../../context/useSimulation";

export function AlgorithmSettings() {
  const {
    algorithm,
    setAlgorithm,
    quantum,
    setQuantum,
    intervalMs,
    setIntervalMs,
  } = useSimulation();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Configuración de Algoritmo
      </h3>
      <div className="flex flex-wrap gap-6 items-center">
        {/* Algoritmo */}
        <label className="flex flex-col text-sm font-medium text-gray-600">
          Algoritmo
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="FCFS">FCFS</option>
            <option value="SJF">SJF</option>
            <option value="RR">Round Robin</option>
          </select>
        </label>

        {/* Quantum (solo si es RR) */}
        {algorithm === "RR" && (
          <label className="flex flex-col text-sm font-medium text-gray-600">
            Quantum
            <input
              type="number"
              min={1}
              value={quantum}
              onChange={(e) => setQuantum(Number(e.target.value))}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>
        )}

        {/* Intervalo */}
        <label className="flex flex-col text-sm font-medium text-gray-600">
          Intervalo (ms)
          <input
            type="number"
            min={100}
            value={intervalMs}
            onChange={(e) => setIntervalMs(Number(e.target.value))}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
      </div>
    </div>
  );
}
