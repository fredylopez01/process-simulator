import React, { useState, useRef, useEffect } from "react";
import { Scheduler } from "../simulator/Scheduler";
import { Clock } from "../simulator/Clock";
import { FCFS } from "../simulator/algorithms/FCFS";
import { SJN } from "../simulator/algorithms/SJN";
import { RoundRobin } from "../simulator/algorithms/RoundRobin";
import { SimulationContext } from "./SimulationContext";
import type { PCB } from "../simulator/models/PCB";

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [algorithm, setAlgorithm] = useState("RR");
  const [quantum, setQuantum] = useState(4);
  const [intervalMs, setIntervalMs] = useState(500);
  const [processes, setProcesses] = useState<PCB[]>([]);
  const [initial_processes, setInitialProcesses] = useState<PCB[]>([]);
  const [running, setRunning] = useState(false);

  const schedulerRef = useRef<Scheduler | null>(null);
  const clockRef = useRef<Clock | null>(null);

  const [processesCounter, setProcessesCounter] = useState(0);

  // Configura el reloj
  useEffect(() => {
    clockRef.current = new Clock((time) => {
      schedulerRef.current?.tick(time);
      const updatedProcesses = schedulerRef.current?.getAllProcesses() ?? [];

      setProcesses(updatedProcesses);
      setCurrentTime(time);
    }, intervalMs);
  }, [intervalMs]);

  const addProcessListener = (
    process: Omit<PCB, "id" | "remainingTime" | "state">
  ) => {
    setInitialProcesses((prev) => [
      ...prev,
      {
        ...process,
        id: processesCounter,
        remainingTime: process.burstTime,
        state: "Created",
      },
    ]);
    setProcesses((prev) => [
      ...prev,
      {
        ...process,
        id: processesCounter,
        remainingTime: process.burstTime,
        state: "Created",
      },
    ]);
    setTotalTime(totalTime + process.burstTime);
    setProcessesCounter(processesCounter + 1);
  };

  const deleteProcess = (id: number) => {
    setProcesses((prev) => prev.filter((p) => p.id !== id));
    setInitialProcesses((prev) => prev.filter((p) => p.id !== id));
  };

  const createScheduler = (procs: PCB[]) => {
    let algoInstance;
    if (algorithm === "FCFS") algoInstance = new FCFS();
    else if (algorithm === "SJN") algoInstance = new SJN();
    else algoInstance = new RoundRobin(quantum);

    const cloned = procs.map((p) => ({ ...p }));

    schedulerRef.current = new Scheduler(cloned, algoInstance, (ended) => {
      setProcesses(ended);
      clockRef.current?.pause();
      setRunning(false);
      setCurrentTime(0);
    });
  };

  const start = () => {
    if (!running && initial_processes.length > 0) {
      reset();
      // reinicia con los procesos originales
      setProcesses(initial_processes);
      createScheduler(initial_processes);
      clockRef.current?.start();
      setRunning(true);
    }
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
    setProcesses(initial_processes);
    createScheduler(initial_processes);
    setRunning(false);
    setCurrentTime(0);
  };

  return (
    <SimulationContext.Provider
      value={{
        totalTime,
        currentTime,
        running,
        processes,
        algorithm,
        quantum,
        intervalMs,
        addProcessListener,
        deleteProcess,
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
