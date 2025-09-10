import { Clock } from "./Clock";
import type { PCB } from "./models/PCB";
import type { ScheduleNextProcess } from "./algorithms/ScheduleNextProcess";

export type TickCallback = (currentTime: number) => void;

export class Scheduler {
  private createdQueue: PCB[];
  private readyQueue: PCB[];
  private cpuProcess: PCB | null;
  private waitingQueue: PCB[];
  private terminatedQueue: PCB[];
  private scheduleNextProcess: ScheduleNextProcess;
  private onTick: TickCallback;
  private clock: Clock;

  constructor(
    createdQueue: PCB[],
    algorithm: ScheduleNextProcess,
    onTime: TickCallback
  ) {
    this.createdQueue = createdQueue;
    this.readyQueue = [];
    this.cpuProcess = null;
    this.waitingQueue = [];
    this.terminatedQueue = [];
    this.scheduleNextProcess = algorithm;
    this.onTick = onTime;
    this.clock = new Clock((time) => {
      this.executeSimulation(time);
    });
  }

  setScheduleNextProcess(algorithm: ScheduleNextProcess) {
    this.scheduleNextProcess = algorithm;
  }

  executeSimulation(time: number) {
    console.log(time);
    this.updateReadyQueue(time);

    if (!this.cpuProcess) {
      this.updateCpuProcess();
    } else {
      this.cpuProcess.remainingTime--;
      if (this.cpuProcess.remainingTime === 0) {
        this.cpuProcess.completionTime = time;
        this.terminatedQueue.push(this.cpuProcess);
        this.updateCpuProcess();
      }
      this.isTerminated();
    }

    this.onTick(time);
  }

  updateReadyQueue(time: number) {
    this.createdQueue = this.createdQueue.filter((process) => {
      if (process.arrivalTime === time) {
        this.readyQueue.push(process);
        return false;
      }
      return true;
    });
  }

  updateCpuProcess() {
    this.cpuProcess = this.scheduleNextProcess.getNextProcess(this.readyQueue);
    if (this.cpuProcess) {
      this.readyQueue = this.readyQueue.filter(
        (p) => p.id !== this.cpuProcess!.id
      );
    }
  }

  isTerminated() {
    if (
      this.createdQueue.length === 0 &&
      this.readyQueue.length === 0 &&
      !this.cpuProcess
    ) {
      console.log("Terminado");
      this.clock.pause();
      this.finalCalculation();
      console.log(this.terminatedQueue);
    }
  }

  finalCalculation() {
    this.terminatedQueue.forEach((process) => {
      process.turnaroundTime = process.completionTime - process.arrivalTime;
      process.waitingTime = process.turnaroundTime - process.burstTime;
    });
  }

  public startClock = () => {
    this.clock.start();
  };

  public pauseClock = () => {
    this.clock.pause();
  };

  public resumeClock = () => {
    this.clock.start();
  };

  public resetClock = () => {
    this.clock.reset();
  };
}
