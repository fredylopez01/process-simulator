import { useSimulation } from "../../context/useSimulation";

export function ProcessControls() {
  const { start, reset, running } = useSimulation();

  return (
    <div className="flex h-20 justify-center items-center gap-2">
      <button
        onClick={start}
        disabled={running}
        className="px-3 py-1 text-sm bg-green-600 text-white rounded-md shadow hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Iniciar
      </button>

      <button
        onClick={reset}
        className="px-3 py-1 text-sm border border-red-600 text-red-600 rounded-md shadow hover:bg-red-50 transition"
      >
        Resetear
      </button>
    </div>
  );
}
