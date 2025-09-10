import type { PCB } from "../models/PCB";
import type { ScheduleNextProcess } from "./ScheduleNextProcess";

export class FCFS implements ScheduleNextProcess {
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
