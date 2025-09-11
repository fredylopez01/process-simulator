import type { PCB } from "../models/PCB";
import type { ScheduleNextProcess } from "./ScheduleNextProcess";

export class RoundRobin implements ScheduleNextProcess {
  private quantum: number;

  constructor(quantum: number) {
    this.quantum = quantum;
  }

  getNextProcess(processes: PCB[]): PCB {
    if (processes.length === 0) {
      // Devuelve un proceso dummy si la cola está vacía (no debería pasar)
      return {
        id: -1,
        arrivalTime: 0,
        burstTime: 0,
        completionTime: 0,
        turnaroundTime: 0,
        waitingTime: 0,
        priority: 0,
        remainingTime: 0,
        state: "Created",
      };
    }
    const next = processes[0];
    return next;
  }

  getQuantum(): number {
    return this.quantum;
  }

  setQuantum(q: number) {
    this.quantum = q;
  }
}
