import { createContext } from "react";
import type { PCB } from "../simulator/models/PCB";

export type SimulationContextType = {
  currentTime: number;
  running: boolean;
  processes: PCB[];
  algorithm: string;
  quantum: number;
  intervalMs: number;
  //addProcess: (p: Omit<PCB, "id" | "remainingTime" | "state">) => void;
  setAlgorithm: (alg: string) => void;
  setQuantum: (q: number) => void;
  setIntervalMs: (ms: number) => void;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
};

// Contexto vacío (se llena en el Provider)
export const SimulationContext = createContext<SimulationContextType | undefined>(
  undefined
);
