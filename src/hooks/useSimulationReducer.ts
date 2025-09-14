import { useReducer } from "react";
import { processReducer} from "../reducer/processReducer";
import {initialProcess} from "./initialProcess"
import type { PCB } from "../simulator/models/PCB";

export function useSimulationReducer() {
  const [processes, dispatch] = useReducer(processReducer, initialProcess);

  const addProcess = (process: PCB) => {
    dispatch({
      type: "ADD_PROCESS",
      payload: process,
    });
  };

  const moveToReady = (processId: number) => {
    dispatch({
      type: "MOVE_TO_READY",
      payload: processId,
    });
  };

  const moveToWaiting = (processId: number) => {
    dispatch({
      type: "MOVE_TO_WAITING",
      payload: processId,
    });
  };

  const moveToTerminated = (processId: number) => {
    dispatch({
      type: "MOVE_TO_TERMINATED",
      payload: processId,
    });
  };

  const dispatchToCpu = (processId: number) => {
    dispatch({
      type: "DISPATCH_TO_CPU",
      payload: processId,
    });
  };

  const tickCpu = (processId: number) => {
    dispatch({
      type: "TICK_CPU",
      payload: processId,
    });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    processes,
    addProcess,
    moveToReady,
    dispatchToCpu,
    tickCpu,
    moveToWaiting,
    moveToTerminated,
    reset
  };
}
