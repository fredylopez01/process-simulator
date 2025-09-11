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
  private onFinish?: (all: PCB[]) => void;

  constructor(
    createdQueue: PCB[],
    algorithm: ScheduleNextProcess,
    onTime: TickCallback,
    onFinish?: (all: PCB[]) => void
  ) {
    this.createdQueue = createdQueue;
    this.readyQueue = [];
    this.cpuProcess = null;
    this.waitingQueue = [];
    this.terminatedQueue = [];
    this.scheduleNextProcess = algorithm;
    this.onTick = onTime;
    this.onFinish = onFinish;
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
      this.clock.pause();
      this.finalCalculation();
      // Notificar a React con el estado final de todos los procesos
      if (this.onFinish) {
        // Unir terminados + los que nunca llegaron a ejecutarse
        const all = [
          ...this.terminatedQueue,
          ...this.createdQueue,
          ...this.readyQueue,
        ];
        this.onFinish(all);
      }
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
      this.readyQueue.push(this.cpuProcess!);
      this.cpuProcess = null;
      this.quantumCounter = 0;
    }
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
