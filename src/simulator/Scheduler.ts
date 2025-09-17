import type { PCB } from "./models/PCB";
import type { ScheduleNextProcess } from "./algorithms/ScheduleNextProcess";
import { RoundRobin } from "./algorithms/RoundRobin";

export class Scheduler {
  private createdQueue: PCB[];
  private readyQueue: PCB[];
  private waitingQueue: PCB[];
  private terminatedQueue: PCB[];
  private cpuProcess: PCB | null;
  private scheduleNextProcess: ScheduleNextProcess;
  private quantumCounter = 0;
  private onFinish: (all: PCB[]) => void;
  private onTick?: (all: PCB[]) => void;

  constructor(
    createdQueue: PCB[],
    algorithm: ScheduleNextProcess,
    onFinish: (all: PCB[]) => void,
    onTick?: (all: PCB[]) => void 
  ) {
    this.createdQueue = createdQueue;
    this.readyQueue = [];
    this.waitingQueue = [];
    this.terminatedQueue = [];
    this.cpuProcess = null;
    this.scheduleNextProcess = algorithm;
    this.onFinish = onFinish;
    this.onTick = onTick;
  }

  /** Avanza un tick de simulación */
  public tick(time: number) {
    this.moveArrivalsToReady(time);
    if (time === 0) return;
    this.dispatchIfNeeded();

    if (this.cpuProcess) {
      this.runCpuProcess(time);
    }

    this.dispatchIfNeeded();
    this.checkIfFinished();

    // Notificar snapshot en cada tick
    if (this.onTick) {
      this.onTick(this.getAllProcesses());
    }
  }

  /** Devuelve snapshot de todos los procesos */
  public getAllProcesses(): PCB[] {
    return [
      ...this.createdQueue,
      ...this.readyQueue,
      ...this.waitingQueue,
      ...(this.cpuProcess ? [this.cpuProcess] : []),
      ...this.terminatedQueue,
    ];
  }

  public getTerminatedProcesses(): PCB[] {
    return this.terminatedQueue;
  }

  /** Mueve procesos que ya llegaron a la cola de listos */
  private moveArrivalsToReady(time: number) {
    if (this.waitingQueue.length > 0) {
      this.waitingQueue.forEach(p => (p.state = "Ready"));
      this.readyQueue.push(...this.waitingQueue);
      this.waitingQueue = [];
    }

    this.createdQueue = this.createdQueue.filter((process) => {
      if (process.arrivalTime === time) {
        process.state = "Ready";  
        this.readyQueue.push(process);
        return false;
      }
      return true;
    });
  }

  /** Asigna un proceso a la CPU si está libre */
  private dispatchIfNeeded() {
    if (!this.cpuProcess && this.readyQueue.length > 0) {
      this.cpuProcess = this.scheduleNextProcess.getNextProcess(
        this.readyQueue
      );
      this.readyQueue = this.readyQueue.filter(
        (p) => p.id !== this.cpuProcess!.id
      );
      this.cpuProcess.state = "Executing";
      this.quantumCounter = 0;
    }
  }

  /** Ejecuta un ciclo de CPU */
  private runCpuProcess(time: number) {
    if (!this.cpuProcess) return;

    this.cpuProcess.remainingTime--;
    this.quantumCounter++;

    console.log(
      `${time}: proceso ${this.cpuProcess.id}, restante: ${this.cpuProcess.remainingTime}`
    );

    if (this.cpuProcess.remainingTime <= 0) {
      this.finishProcess(time);
    } else if (this.shouldPreempt()) {
      this.preemptProcess();
    }
  }

  /** Marca un proceso como terminado */
  private finishProcess(currentTime: number) {
    if (!this.cpuProcess) return;
    this.cpuProcess.completionTime = currentTime;
    this.cpuProcess.state = "Terminated"; 
    this.terminatedQueue.push(this.cpuProcess);
    this.cpuProcess = null;
    this.quantumCounter = 0;
  }

  /** Verifica si debe hacerse cambio de contexto por Round Robin */
  private shouldPreempt(): boolean {
    return (
      this.scheduleNextProcess instanceof RoundRobin &&
      this.quantumCounter >=
        (this.scheduleNextProcess as RoundRobin).getQuantum() &&
      this.readyQueue.length > 0
    );
  }

  /** Saca al proceso de CPU y lo pasa a espera */
  private preemptProcess() {
    if (!this.cpuProcess) return;
    this.cpuProcess.state = "Waiting";
    this.waitingQueue.push(this.cpuProcess);
    this.cpuProcess = null;
    this.quantumCounter = 0;
  }

  /** Verifica si la simulación terminó */
  private checkIfFinished() {
    if (
      this.createdQueue.length === 0 &&
      this.readyQueue.length === 0 &&
      !this.cpuProcess
    ) {
      this.calculateMetrics();
      this.onFinish(this.terminatedQueue);
    }
  }

  /** Calcula métricas de turnaround y waiting time */
  private calculateMetrics() {
    this.terminatedQueue.forEach((p) => {
      p.turnaroundTime = p.completionTime - p.arrivalTime;
      p.waitingTime = p.turnaroundTime - p.burstTime;
      p.normalizedTurnaroundTime = p.turnaroundTime / p.burstTime;
    });
  }
}
