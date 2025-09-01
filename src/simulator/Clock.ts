export type TickCallback = (currentTime: number) => void;

export class Clock {
  private currentTime = 0;
  private intervalId: number | null = null;
  private tickInterval: number;
  private onTick: TickCallback;
  private running = false;

  constructor(onTick: TickCallback, tickInterval: number = 1000) {
    this.onTick = onTick;
    this.tickInterval = tickInterval;
  }

  public start = (restart = false): void => {
    if (restart) {
      this.currentTime = 0;
      this.onTick(this.currentTime);
    }
    if (this.running) return;

    this.running = true;
    this.intervalId = window.setInterval(() => this.tick(), this.tickInterval);

    // notificar inmediatamente al iniciar
    this.onTick(this.currentTime);
  };

  public pause = (): void => {
    if (!this.running) return;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.running = false;
  };

  public resume = (): void => {
    if (!this.running) {
      this.start(false);
    }
  };

  public reset = (): void => {
    this.pause();
    this.currentTime = 0;
    this.onTick(this.currentTime);
  };

  public getTime = (): number => this.currentTime;

  public setTickInterval = (ms: number): void => {
    if (ms <= 0) throw new Error("tickInterval must be > 0");
    this.tickInterval = ms;
    if (this.running) {
      this.pause();
      this.start(false);
    }
  };

  private tick = (): void => {
    this.currentTime++;
    this.onTick(this.currentTime);
  };
}
