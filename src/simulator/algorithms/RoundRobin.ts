import type { PCB } from "../models/PCB";
import type { ScheduleNextProcess } from "./scheduleNextProcess";

export class RoundRobin implements ScheduleNextProcess {
  quatum: number;

  constructor(quatum: number) {
    this.quatum = quatum;
  }

  getNextProcess(process: PCB[]): PCB {
    let nextProcess = process[0];
    process.forEach((process) => {
      if (process.arrivalTime < nextProcess.arrivalTime) {
        nextProcess = process;
      }
    });
    return nextProcess;
  }
}
