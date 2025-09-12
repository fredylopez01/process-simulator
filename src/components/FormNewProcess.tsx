import { useState } from "react";
import { useSimulation } from "../context/SimulationContext";

export function FormNewProcess() {
  const { addProcess } = useSimulation();
  const [arrivalTime, setArrivalTime] = useState(0);
  const [burstTime, setBurstTime] = useState(1);
  const [priority, setPriority] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProcess({
      arrivalTime,
      burstTime,
      completionTime: 0,
      turnaroundTime: 0,
      waitingTime: 0,
      priority,
    });
    setArrivalTime(0);
    setBurstTime(1);
    setPriority(1);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 10 }}>
      <label htmlFor="arrivalTime">Arrival time:</label>
      <input
        type="number"
        name="arrivalTime"
        id="arrivalTime"
        value={arrivalTime}
        min={0}
        onChange={(e) => setArrivalTime(Number(e.target.value))}
      />

      <label htmlFor="burstTime">Burst time:</label>
      <input
        type="number"
        name="burstTime"
        id="burstTime"
        value={burstTime}
        min={1}
        onChange={(e) => setBurstTime(Number(e.target.value))}
      />

      <label htmlFor="priority">Priority:</label>
      <input
        type="number"
        name="priority"
        id="priority"
        value={priority}
        min={1}
        onChange={(e) => setPriority(Number(e.target.value))}
      />

      <button type="submit">Agregar proceso</button>
    </form>
  );
}
