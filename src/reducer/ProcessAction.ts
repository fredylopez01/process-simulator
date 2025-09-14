// src/reducer/ProcessAction.ts
import type { PCB } from "../simulator/models/PCB";
import {
  ADD_PROCESS,
  MOVE_TO_READY,
  DISPATCH_TO_CPU,
  TICK_CPU,
  MOVE_TO_WAITING,
  MOVE_TO_TERMINATED,
  RESET,
} from "./actions";

// Definimos el tipo de todas las acciones posibles
export type ProcessAction =
  | { type: typeof ADD_PROCESS; payload: PCB }            // Agregar un proceso nuevo
  | { type: typeof MOVE_TO_READY; payload: number }       // Mover un proceso a la cola READY (id)
  | { type: typeof DISPATCH_TO_CPU; payload: number }     // Asignar un proceso a la CPU (id)
  | { type: typeof TICK_CPU; payload: number }            // Reducir 1 unidad de tiempo a un proceso en CPU (id)
  | { type: typeof MOVE_TO_WAITING; payload: number }     // Mover proceso a WAITING (id)
  | { type: typeof MOVE_TO_TERMINATED; payload: number }  // Mover proceso a TERMINATED (id)
  | { type: typeof RESET };                               // Reiniciar todo
