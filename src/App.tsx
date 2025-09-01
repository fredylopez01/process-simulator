import { useRef, useState } from "react";
import { Scheduler } from "./simulator/Scheduler";
import { FCFS } from "./simulator/algorithms/FCFS";

function App() {
  const [timec, setTimec] = useState(0);

  const schedulerRef = useRef(new Scheduler([], new FCFS(), setTimec));

  const scheduler = schedulerRef.current;

  return (
    <>
      <button onClick={() => scheduler.startClock()}>Start</button>
      <button onClick={() => scheduler.pauseClock()}>Pausar</button>
      <button onClick={() => scheduler.resumeClock()}>Resume</button>
      <button onClick={() => scheduler.resetClock()}>Reset</button>

      <div>{timec}</div>
    </>
  );
}

export default App;
