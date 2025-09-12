import type { PCB } from "./models/PCB";
import type { ScheduleNextProcess } from "./algorithms/ScheduleNextProcess";
import { RoundRobin } from "./algorithms/RoundRobin";

export class Scheduler {
  private createdQueue: PCB[];
  private readyQueue: PCB[];
  private cpuProcess: PCB | null;
  private waitingQueue: PCB[];
  private terminatedQueue: PCB[];
  private scheduleNextProcess: ScheduleNextProcess;
  private quantumCounter: number = 0;
  private onFinish?: (all: PCB[]) => void;

  constructor(
    createdQueue: PCB[],
    algorithm: ScheduleNextProcess,
    onFinish: (all: PCB[]) => void
  ) {
    this.createdQueue = createdQueue;
    this.readyQueue = [];
    this.cpuProcess = null;
    this.waitingQueue = [];
    this.terminatedQueue = [];
    this.scheduleNextProcess = algorithm;
    this.onFinish = onFinish;
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
    } else {
      this.cpuProcess.remainingTime--;
      this.quantumCounter++;
      console.log(
        `${time}: proceso ${this.cpuProcess.id}, tiempo restante: ${this.cpuProcess.remainingTime}`
      );

      // Si terminó el proceso
      if (this.cpuProcess.remainingTime === 0) {
        this.processTerminated(time);
      } else {
        // Si se agotó el quantum (solo para Round Robin)
        this.isQuantumEnded();
      }
    }

    // Si el proceso en CPU terminó o fue cambiado, tomar el siguiente
    if (!this.cpuProcess && this.readyQueue.length > 0) {
      this.updateCpuProcess();
      this.quantumCounter = 0;
    }

    this.isSimulationTerminated();
  }

  updateReadyQueue(time: number) {
    if (this.waitingQueue.length >= 0) {
      this.readyQueue = [...this.readyQueue, ...this.waitingQueue];
      this.waitingQueue = [];
    }
    this.createdQueue = this.createdQueue.filter((process) => {
      if (process.arrivalTime === time) {
        this.readyQueue.push(process);
        return false;
      }
      return true;
    });
  }

  updateCpuProcess() {
    if (this.readyQueue.length === 0) {
      this.cpuProcess = null;
      return;
    }
    this.cpuProcess = this.scheduleNextProcess.getNextProcess(this.readyQueue);
    // Eliminar el proceso seleccionado de la cola de listos
    this.readyQueue = this.readyQueue.filter(
      (p) => p.id !== this.cpuProcess!.id
    );
  }

  isSimulationTerminated() {
    if (
      this.createdQueue.length === 0 &&
      this.readyQueue.length === 0 &&
      !this.cpuProcess
    ) {
      this.finalCalculation();
      // Notificar a React con el estado final de todos los procesos
      const all = [
        ...this.terminatedQueue,
        ...this.createdQueue,
        ...this.readyQueue,
      ];
      this.onFinish!(all);
    }
  }

  finalCalculation() {
    this.terminatedQueue.forEach((process) => {
      process.turnaroundTime = process.completionTime - process.arrivalTime;
      process.waitingTime = process.turnaroundTime - process.burstTime;
    });
  }

  processTerminated(currentTime: number) {
    this.cpuProcess!.completionTime = currentTime;
    this.terminatedQueue.push(this.cpuProcess!);
    this.cpuProcess = null;
    this.quantumCounter = 0;
  }

  isQuantumEnded() {
    if (
      this.scheduleNextProcess instanceof RoundRobin &&
      this.quantumCounter >=
        (this.scheduleNextProcess as RoundRobin).getQuantum() &&
      this.readyQueue.length > 0 // Solo hacer cambio si hay otros procesos listos
    ) {
      // Quantum agotado, cambio de proceso
      this.waitingQueue.push(this.cpuProcess!);
      this.cpuProcess = null;
      this.quantumCounter = 0;
    }
  }
}
