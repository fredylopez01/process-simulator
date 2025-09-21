import { useSimulation } from "../../context/useSimulation";

// ProcessTurnVisualization.tsx
export function ProcessTurnVisualization() {
  const { processes } = useSimulation();
  const executingProcess = processes.find((p) => p.state === "Executing");
  const readyQueue = processes.filter((p) => p.state === "Ready");

  return (
    <div className="bg-white rounded-lg p-4">
      <h3 className="font-bold mb-4">Process Turn</h3>

      {/* Proceso Actual */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-600 mb-2">On CPU:</h4>
        {executingProcess ? (
          <div className="bg-green-100 border-2 border-green-500 p-3 rounded">
            <div className="flex justify-between">
              <span className="font-bold">P{executingProcess.id}</span>
              <span>Remaining: {executingProcess.remainingTime}</span>
            </div>
            {/* Barra de progreso animada */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                style={{
                  width: `${
                    ((executingProcess.burstTime -
                      executingProcess.remainingTime) /
                      executingProcess.burstTime) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 p-3 rounded text-center text-gray-500">
            Idle CPU
          </div>
        )}
      </div>

      {/* Cola de Espera */}
      <div>
        <h4 className="text-sm font-medium text-gray-600 mb-2">
          Next in Ready line ({readyQueue.length}):
        </h4>
        <div className="flex gap-2 overflow-x-auto">
          {readyQueue.map((process, index) => (
            <div
              key={process.id}
              className={`min-w-[80px] p-2 rounded border-2 transition-all duration-300 ${
                index === 0
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              <div className="text-center text-sm font-medium">
                P{process.id}
              </div>
              <div className="text-xs text-center text-gray-600">
                {index === 0 ? "Next" : `Position ${index + 1}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
