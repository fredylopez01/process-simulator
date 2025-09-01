import { FCFS } from "./algorithms/FCFS";
import type { ScheduleNextProcess } from "./algorithms/scheduleNextProcess";
import { Clock } from "./Clock";
import type { PCB } from "./models/PCB";

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
      this.update(time);
    });
  }

  setScheduleNextProcess(algorithm: ScheduleNextProcess) {
    this.scheduleNextProcess = algorithm;
  }

  initReadyQueue(createdProcess: PCB[]) {
    this.readyQueue = [...this.readyQueue, ...createdProcess];
  }

  update(time: number) {
    console.log(time);
    this.onTick(time);
  }

  public startSimulation() {}

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
