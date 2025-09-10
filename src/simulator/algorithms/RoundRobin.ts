import type { PCB } from "../models/PCB";
import type { ScheduleNextProcess } from "./ScheduleNextProcess";

export class RoundRobin implements ScheduleNextProcess {
  private quantum: number;
  private lastIndex: number;

  constructor(quantum: number) {
    this.quantum = quantum;
    this.lastIndex = 0;
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
    if (this.lastIndex >= processes.length) {
      this.lastIndex = 0;
    }
    const next = processes[this.lastIndex];
    this.lastIndex = (this.lastIndex + 1) % processes.length;
    return next;
  }

  getQuantum(): number {
    return this.quantum;
  }

  setQuantum(q: number) {
    this.quantum = q;
  }
}
