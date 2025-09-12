import { createContext, useContext, useState, useRef, useEffect } from "react";
import type { PCB } from "../simulator/models/PCB";
import { Scheduler } from "../simulator/Scheduler";
import { Clock } from "../simulator/Clock";
import { FCFS } from "../simulator/algorithms/FCFS";
import { SJF } from "../simulator/algorithms/SJF";
import { RoundRobin } from "../simulator/algorithms/RoundRobin";

type SimulationContextType = {
  currentTime: number;
  running: boolean;
  processes: PCB[];
  finalProcesses: PCB[];
  algorithm: string;
  quantum: number;
  intervalMs: number;
  addProcess: (p: Omit<PCB, "id" | "remainingTime" | "state">) => void;
  setAlgorithm: (alg: string) => void;
  setQuantum: (q: number) => void;
  setIntervalMs: (ms: number) => void;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
};

const SimulationContext = createContext<SimulationContextType | undefined>(
  undefined
);

export function SimulationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [algorithm, setAlgorithm] = useState("RR");
  const [quantum, setQuantum] = useState(4);
  const [intervalMs, setIntervalMs] = useState(500);
  const [processes, setProcesses] = useState<PCB[]>([]);
  const [finalProcesses, setFinalProcesses] = useState<PCB[]>([]);
  const [running, setRunning] = useState(false);

  const schedulerRef = useRef<Scheduler | null>(null);
  const clockRef = useRef<Clock | null>(null);

  // Configura el scheduler cuando cambian procesos/algoritmo
  useEffect(() => {
    let algoInstance;
    if (algorithm === "FCFS") algoInstance = new FCFS();
    else if (algorithm === "SJF") algoInstance = new SJF();
    else algoInstance = new RoundRobin(quantum);

    const cloned = processes.map((p) => ({ ...p }));
    schedulerRef.current = new Scheduler(cloned, algoInstance, (ended) => {
      setFinalProcesses(ended.map((p) => ({ ...p })));
      pause();
    });
    setRunning(false);
    setCurrentTime(0);
  }, [algorithm, quantum, processes]);

  // Configura el reloj
  useEffect(() => {
    clockRef.current = new Clock((time) => {
      schedulerRef.current?.tick(time);
      setCurrentTime(time);
    }, intervalMs);
  }, [intervalMs]);

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

  const start = () => {
    clockRef.current?.start();
    setRunning(true);
  };
  const pause = () => {
    clockRef.current?.pause();
    setRunning(false);
  };
  const resume = () => {
    clockRef.current?.resume();
    setRunning(true);
  };
  const reset = () => {
    clockRef.current?.reset();
    setRunning(false);
    setCurrentTime(0);
  };

  return (
    <SimulationContext.Provider
      value={{
        currentTime,
        running,
        processes,
        finalProcesses,
        algorithm,
        quantum,
        intervalMs,
        addProcess,
        setAlgorithm,
        setQuantum,
        setIntervalMs,
        start,
        pause,
        resume,
        reset,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const ctx = useContext(SimulationContext);
  if (!ctx)
    throw new Error("useSimulation debe usarse dentro de SimulationProvider");
  return ctx;
}
