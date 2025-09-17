import type { PCB } from "./PCB";

export interface State {
  createdQueue: PCB[];
  readyQueue: PCB[];
  waitingQueue: PCB[];
  terminatedQueue: PCB[];
  cpuProcess: PCB | null;
}
