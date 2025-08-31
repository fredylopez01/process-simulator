import type { PCB } from "../models/PCB";
import type { ScheduleNextProcess } from "./scheduleNextProcess";

export class SJF implements ScheduleNextProcess {
  getNextProcess(process: PCB[]): PCB {
    let nextProcess = process[0];
    process.forEach((process) => {
      if (process.burstTime < nextProcess.burstTime) {
        nextProcess = process;
      }
    });
    return nextProcess;
  }
}
