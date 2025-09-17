import type { PCB } from "./models/PCB";
import type { ScheduleNextProcess } from "./algorithms/ScheduleNextProcess";
import { RoundRobin } from "./algorithms/RoundRobin";
import type { State } from "./models/State";

export class Scheduler {
  private state: State;
  private scheduleNextProcess: ScheduleNextProcess;
  private quantumCounter = 0;
  private onFinish: (all: PCB[]) => void;

  constructor(
    createdQueue: PCB[],
    algorithm: ScheduleNextProcess,
    onFinish: (all: PCB[]) => void
  ) {
    this.state = {
      createdQueue: [...createdQueue],
      readyQueue: [],
      waitingQueue: [],
      terminatedQueue: [],
      cpuProcess: null,
    };
    this.scheduleNextProcess = algorithm;
    this.onFinish = onFinish;
  }

  /** Avanza un tick de simulación */
  public tick(time: number) {
    this.moveArrivalsToReady(time);
    // if (time === 0) return;
    // this.dispatchIfNeeded();

    if (this.state.cpuProcess) {
      this.runCpuProcess(time);
    }

    this.dispatchIfNeeded();
    this.checkIfFinished();
  }

  /** Mueve procesos que ya llegaron a la cola de listos */
  private moveArrivalsToReady(time: number) {
    if (this.state.waitingQueue.length > 0) {
      this.state.readyQueue.push(
        ...this.state.waitingQueue.map((process) => {
          process.state = "Ready";
          return process;
        })
      );
      this.state.waitingQueue = [];
    }

    this.state.createdQueue = this.state.createdQueue.filter((process) => {
      if (process.arrivalTime === time) {
        process.state = "Ready";
        this.state.readyQueue.push(process);
        return false;
      }
      return true;
    });
  }

  /** Asigna un proceso a la CPU si está libre */
  private dispatchIfNeeded() {
    if (!this.state.cpuProcess && this.state.readyQueue.length > 0) {
      this.state.cpuProcess = this.scheduleNextProcess.getNextProcess(
        this.state.readyQueue
      );
      this.state.cpuProcess.state = "Executing";
      this.state.readyQueue = this.state.readyQueue.filter(
        (p) => p.id !== this.state.cpuProcess!.id
      );
      this.quantumCounter = 0;
    }
  }

  /** Ejecuta un ciclo de CPU */
  private runCpuProcess(time: number) {
    if (!this.state.cpuProcess) return;

    this.state.cpuProcess.remainingTime--;
    this.quantumCounter++;

    console.log(
      `${time}: proceso ${this.state.cpuProcess.id}, restante: ${this.state.cpuProcess.remainingTime}`
    );

    if (this.state.cpuProcess.remainingTime <= 0) {
      this.finishProcess(time);
    } else if (this.shouldPreempt()) {
      this.preemptProcess();
    }
  }

  /** Marca un proceso como terminado */
  private finishProcess(currentTime: number) {
    if (!this.state.cpuProcess) return;
    this.state.cpuProcess.completionTime = currentTime;
    this.state.cpuProcess.state = "Terminated";
    this.state.terminatedQueue.push(this.state.cpuProcess);
    this.state.cpuProcess = null;
    this.quantumCounter = 0;
  }

  /** Verifica si debe hacerse cambio de contexto por Round Robin */
  private shouldPreempt(): boolean {
    return (
      this.scheduleNextProcess instanceof RoundRobin &&
      this.quantumCounter >=
        (this.scheduleNextProcess as RoundRobin).getQuantum() &&
      this.state.readyQueue.length > 0
    );
  }

  /** Saca al proceso de CPU y lo pasa a espera */
  private preemptProcess() {
    if (!this.state.cpuProcess) return;
    this.state.cpuProcess.state = "Waiting";
    this.state.waitingQueue.push(this.state.cpuProcess);
    this.state.cpuProcess = null;
    this.quantumCounter = 0;
  }

  /** Verifica si la simulación terminó */
  private checkIfFinished() {
    if (
      this.state.createdQueue.length === 0 &&
      this.state.readyQueue.length === 0 &&
      !this.state.cpuProcess
    ) {
      this.calculateMetrics();
      this.onFinish(this.state.terminatedQueue);
    }
  }

  /** Calcula métricas de turnaround y waiting time */
  private calculateMetrics() {
    this.state.terminatedQueue.forEach((p) => {
      p.turnaroundTime = p.completionTime - p.arrivalTime;
      p.waitingTime = p.turnaroundTime - p.burstTime;
    });
  }

  public getState(): State {
    return this.state;
  }
}
