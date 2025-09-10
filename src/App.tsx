import { useRef, useState } from "react";
import { Scheduler } from "./simulator/Scheduler";
import { FCFS } from "./simulator/algorithms/FCFS";
import type { PCB } from "./simulator/models/PCB";
import { SJF } from "./simulator/algorithms/SJF";
import { FormNewProcess } from "./components";

function App() {
  const [timec, setTimec] = useState(0);
  const processes: PCB[] = [
    {
      id: 1,
      arrivalTime: 0,
      burstTime: 6,
      completionTime: 0,
      turnaroundTime: 0,
      waitingTime: 0,
      priority: 2,
      remainingTime: 0,
      state: "Created",
    },
    {
      id: 2,
      arrivalTime: 2,
      burstTime: 2,
      completionTime: 0,
      turnaroundTime: 0,
      waitingTime: 0,
      priority: 1,
      remainingTime: 0,
      state: "Created",
    },
    {
      id: 3,
      arrivalTime: 4,
      burstTime: 8,
      completionTime: 0,
      turnaroundTime: 0,
      waitingTime: 0,
      priority: 3,
      remainingTime: 0,
      state: "Created",
    },
    {
      id: 4,
      arrivalTime: 6,
      burstTime: 3,
      completionTime: 0,
      turnaroundTime: 0,
      waitingTime: 0,
      priority: 2,
      remainingTime: 0,
      state: "Created",
    },
  ];

  processes.forEach((processes) => {
    processes.remainingTime = processes.burstTime;
  });

  const schedulerRef = useRef(new Scheduler(processes, new SJF(), setTimec));

  const scheduler = schedulerRef.current;

  return (
    <>
      <FormNewProcess />
      <button onClick={() => scheduler.startClock()}>Start</button>
      <button onClick={() => scheduler.pauseClock()}>Pausar</button>
      <button onClick={() => scheduler.resumeClock()}>Resume</button>
      <button onClick={() => scheduler.resetClock()}>Reset</button>

      <div>{timec}</div>
    </>
  );
}

export default App;
