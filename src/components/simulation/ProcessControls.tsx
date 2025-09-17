import { useSimulation } from "../../context/useSimulation";

export function ProcessControls() {
  const { start, pause, resume, reset, running } = useSimulation();

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-4">
      <button
        onClick={start}
        disabled={running}
        className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Iniciar
      </button>
      <button
        onClick={pause}
        disabled={!running}
        className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Pausar
      </button>
      <button
        onClick={resume}
        disabled={running}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Continuar
      </button>
      <button
        onClick={reset}
        className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
      >
        Resetear
      </button>
    </div>
  );
}
