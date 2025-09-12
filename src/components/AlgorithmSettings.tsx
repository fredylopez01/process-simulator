import { useSimulation } from "../context/SimulationContext";

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
    <div style={{ marginBottom: 10 }}>
      <label>
        Algoritmo:
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="FCFS">FCFS</option>
          <option value="SJF">SJF</option>
          <option value="RR">Round Robin</option>
        </select>
      </label>
      {algorithm === "RR" && (
        <label style={{ marginLeft: 10 }}>
          Quantum:
          <input
            type="number"
            min={1}
            value={quantum}
            onChange={(e) => setQuantum(Number(e.target.value))}
            style={{ width: 50, marginLeft: 5 }}
          />
        </label>
      )}
      <label style={{ marginLeft: 10 }}>
        Intervalo (ms):
        <input
          type="number"
          min={100}
          value={intervalMs}
          onChange={(e) => setIntervalMs(Number(e.target.value))}
          style={{ width: 70, marginLeft: 5 }}
        />
      </label>
    </div>
  );
}
