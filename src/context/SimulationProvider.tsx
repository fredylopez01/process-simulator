import React, { useState, useRef, useEffect} from "react";
import { Scheduler } from "../simulator/Scheduler";
import { Clock } from "../simulator/Clock";
import { FCFS } from "../simulator/algorithms/FCFS";
import { SJF } from "../simulator/algorithms/SJF";
import { RoundRobin } from "../simulator/algorithms/RoundRobin";
import { SimulationContext } from "./SimulationContext";
import { useSimulationReducer } from "../hooks/useSimulationReducer";


export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [algorithm, setAlgorithm] = useState("RR");
  const [quantum, setQuantum] = useState(4);
  const [intervalMs, setIntervalMs] = useState(500);
  const { processes } = useSimulationReducer();
  const [running, setRunning] = useState(false);

  const schedulerRef = useRef<Scheduler | null>(null);
  const clockRef = useRef<Clock | null>(null);

  // Configura el scheduler
  useEffect(() => {
    let algoInstance;
    if (algorithm === "FCFS") algoInstance = new FCFS();
    else if (algorithm === "SJF") algoInstance = new SJF();
    else algoInstance = new RoundRobin(quantum);

    const cloned = processes.map((p) => ({ ...p }));
    schedulerRef.current = new Scheduler(cloned, algoInstance, (ended) => {
      //setFinalProcesses(ended.map((p) => ({ ...p })));
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

  /* Ya no es necesario porque se maneja con el reducer
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
  */

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
        algorithm,
        quantum,
        intervalMs,
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
};
