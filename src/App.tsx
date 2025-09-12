import { useEffect, useRef, useState } from "react";
import { Scheduler } from "./simulator/Scheduler";
import { FCFS } from "./simulator/algorithms/FCFS";
import type { PCB } from "./simulator/models/PCB";
import { SJF } from "./simulator/algorithms/SJF";
import { RoundRobin } from "./simulator/algorithms/RoundRobin";
import { FormNewProcess } from "./components";
import { ProcessTable } from "./components/ProcessTable";
import { ProcessControls } from "./components/ProcessControls";
import { SimulationResults } from "./components/SimulationResults";
import { Clock } from "./simulator/Clock";

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [algorithm, setAlgorithm] = useState("RR");
  const [quantum, setQuantum] = useState(4);
  const [intervalMs, setIntervalMs] = useState(500);
  const [processes, setProcesses] = useState<PCB[]>([
    {
      id: 1,
      arrivalTime: 0,
      burstTime: 5,
      completionTime: 0,
      turnaroundTime: 0,
      waitingTime: 0,
      priority: 1,
      remainingTime: 5,
      state: "Created",
    },
    {
      id: 2,
      arrivalTime: 1,
      burstTime: 2,
      completionTime: 0,
      turnaroundTime: 0,
      waitingTime: 0,
      priority: 1,
      remainingTime: 2,
      state: "Created",
    },
    {
      id: 3,
      arrivalTime: 2,
      burstTime: 8,
      completionTime: 0,
      turnaroundTime: 0,
      waitingTime: 0,
      priority: 1,
      remainingTime: 8,
      state: "Created",
    },
    {
      id: 4,
      arrivalTime: 3,
      burstTime: 6,
      completionTime: 0,
      turnaroundTime: 0,
      waitingTime: 0,
      priority: 1,
      remainingTime: 6,
      state: "Created",
    },
  ]);
  const [finalProcesses, setFinalProcesses] = useState<PCB[]>([]);
  const [running, setRunning] = useState(false);

  // Referencia al scheduler
  const schedulerRef = useRef<Scheduler | null>(null);

  // Actualiza el scheduler cuando cambian procesos o algoritmo
  useEffect(() => {
    let algoInstance;
    if (algorithm === "FCFS") algoInstance = new FCFS();
    else if (algorithm === "SJF") algoInstance = new SJF();
    else algoInstance = new RoundRobin(quantum);
    // Clonar procesos para evitar referencias
    const cloned = processes.map((p) => ({ ...p }));
    schedulerRef.current = new Scheduler(
      cloned,
      algoInstance,
      (endedProcesses) => {
        setFinalProcesses(endedProcesses.map((p) => ({ ...p })));
        handlePause();
      }
    );
    setRunning(false);
    setCurrentTime(0);
  }, [algorithm, quantum, processes]);

  // Agregar proceso
  const addProcess = (process: Omit<PCB, "id" | "remainingTime" | "state">) => {
    setProcesses((prev) => [
      ...prev,
      {
        ...process,
        id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
        remainingTime: process.burstTime,
        state: "Created",
      },
    ]);
  };

  // clock
  const clockRef = useRef<Clock | null>(null);

  useEffect(() => {
    clockRef.current = new Clock((time) => {
      schedulerRef.current?.tick(time);
      setCurrentTime(time);
    }, intervalMs);
  }, [intervalMs]);

  // controles
  const handleStart = () => {
    clockRef.current?.start();
    setRunning(true);
  };
  const handlePause = () => {
    clockRef.current?.pause();
    setRunning(false);
  };
  const handleResume = () => {
    clockRef.current?.resume();
    setRunning(true);
  };
  const handleReset = () => {
    clockRef.current?.reset();
    setRunning(false);
    setCurrentTime(0);
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2>Simulador de Planificación de Procesos</h2>
      <FormNewProcess onAdd={addProcess} />
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
            onBlur={() => {
              if (intervalMs < 100) setIntervalMs(100);
            }}
            style={{ width: 70, marginLeft: 5 }}
          />
        </label>
      </div>
      <ProcessControls
        onStart={handleStart}
        onPause={handlePause}
        onResume={handleResume}
        onReset={handleReset}
        running={running}
      />
      <div>Tiempo actual: {currentTime}</div>
      <ProcessTable processes={processes} />
      <SimulationResults processes={finalProcesses} />
    </div>
  );
}

export default App;
