import { useSimulation } from "../context/SimulationContext";

export function ProcessControls() {
  const { start, pause, resume, reset, running } = useSimulation();

  return (
    <div style={{ margin: "10px 0" }}>
      <button onClick={start} disabled={running}>
        Iniciar
      </button>
      <button onClick={pause} disabled={!running}>
        Pausar
      </button>
      <button onClick={resume} disabled={running}>
        Continuar
      </button>
      <button onClick={reset}>Resetear</button>
    </div>
  );
}
