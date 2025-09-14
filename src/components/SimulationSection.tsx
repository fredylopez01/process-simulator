import { FormNewProcess } from "./simulation/FormNewProcess";
import { ProcessControls } from "./simulation/ProcessControls";
import { ProcessTable } from "./simulation/ProcessTable";
import { SimulationResults } from "./simulation/SimulationResults";
import { AlgorithmSettings } from "./simulation/AlgorithmSettings";
import { ClockDisplay } from "./simulation/ClockDisplay";



export function SimulationSection() {


    return(
        <div className="">
            <h2>Simulador de Planificación de Procesos</h2>
            <h1 className="text-3xl font-bold underline">
    Hello world!
  </h1>
            <FormNewProcess />
            <AlgorithmSettings />
            <ProcessControls />
            <ClockDisplay />
            <ProcessTable />
            <SimulationResults />
      </div>
    )
}