import { Clock } from "./Clock";
import type { PCB } from "./models/PCB";
import type { ScheduleNextProcess } from "./algorithms/ScheduleNextProcess";
import { RoundRobin } from "./algorithms/RoundRobin";

export type TickCallback = (currentTime: number) => void;

export class Scheduler {
  private createdQueue: PCB[];
  private readyQueue: PCB[];
  private cpuProcess: PCB | null;
  private waitingQueue: PCB[];
  private terminatedQueue: PCB[];
  private scheduleNextProcess: ScheduleNextProcess;
  private quantumCounter: number = 0;
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
    this.quantumCounter = 0;
  }

  setScheduleNextProcess(algorithm: ScheduleNextProcess) {
    this.scheduleNextProcess = algorithm;
  }

  executeSimulation(time: number) {
    this.updateReadyQueue(time);

    // Si no hay proceso en CPU, tomar uno nuevo
    if (!this.cpuProcess) {
      this.updateCpuProcess();
      this.quantumCounter = 0;
    }

    if (this.cpuProcess) {
      this.cpuProcess.remainingTime--;
      this.quantumCounter++;

      // Si terminó el proceso
      if (this.cpuProcess.remainingTime === 0) {
        this.cpuProcess.completionTime = time;
        this.terminatedQueue.push(this.cpuProcess);
        this.cpuProcess = null;
        this.quantumCounter = 0;
        this.updateCpuProcess();
      } else if (
        this.scheduleNextProcess instanceof RoundRobin &&
        this.quantumCounter >=
          (this.scheduleNextProcess as RoundRobin).getQuantum()
      ) {
        // Quantum agotado, cambio de proceso (solo RR)
        this.readyQueue.push(this.cpuProcess);
        this.cpuProcess = null;
        this.quantumCounter = 0;
        this.updateCpuProcess();
      }
    }

    this.isTerminated();
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
