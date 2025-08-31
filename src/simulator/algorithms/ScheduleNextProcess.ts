import type { PCB } from "../models/PCB";

export interface ScheduleNextProcess {
  getNextProcess(process: PCB[]): PCB;
}
