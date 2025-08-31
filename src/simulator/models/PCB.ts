export type ProcessStatus =
  | "Created"
  | "Ready"
  | "Executing"
  | "Waiting"
  | "Terminated";

export interface PCB {
  id: number;
  arrivalTime: number;
  burstTime: number;
  priority: number;
  remainingTime: number;
  state: ProcessStatus;
}
