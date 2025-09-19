import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
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
  } = useSimulation();

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full h-full flex flex-col">
      {/* Título */}
      <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
        Configuración de Algoritmo
      </h3>

      {/* Controles */}
      <div className="flex flex-wrap gap-6 items-end">
        {/* Algoritmo */}
        <div className="flex flex-col text-sm font-medium text-gray-600 w-40 relative">
          Algoritmo
          <Listbox value={algorithm} onChange={setAlgorithm}>
            <div className="relative mt-1">
              {/* Botón */}
              <Listbox.Button className="relative w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-left flex justify-between items-center">
                <span>{algorithms.find((a) => a.id === algorithm)?.label}</span>
                <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
              </Listbox.Button>

              {/* Opciones */}
              <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none z-10">
                {algorithms.map((algo) => (
                  <Listbox.Option
                    key={algo.id}
                    value={algo.id}
                    className={({ active }) =>
                      `cursor-pointer select-none px-4 py-2 ${
                        active ? "bg-indigo-600 text-white" : "text-gray-700"
                      }`
                    }
                  >
                    {algo.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        {/* Quantum (solo si es RR) */}
        {algorithm === "RR" && (
          <label className="flex flex-col text-sm font-medium text-gray-600 w-40">
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
        <label className="flex flex-col text-sm font-medium text-gray-600 w-40">
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
