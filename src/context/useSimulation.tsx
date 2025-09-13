import { useContext } from "react";
import { SimulationContext } from "./SimulationContext";
import type {SimulationContextType} from "./SimulationContext";

export const useSimulation = (): SimulationContextType => {
  const ctx = useContext(SimulationContext);
  if (!ctx) {
    throw new Error("useSimulation debe usarse dentro de un SimulationProvider");
  }
  return ctx;
};
