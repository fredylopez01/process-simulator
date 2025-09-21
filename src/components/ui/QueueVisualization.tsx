import { useSimulation } from "../../context/useSimulation";
import type { PCB } from "../../simulator/models/PCB";

// QueueVisualization.tsx
export function QueueVisualization() {
  const { processes } = useSimulation();

  const getQueueColor = (queueName: string) => {
    const colors: Record<string, string> = {
      created: "border-gray-500",
      ready: "border-blue-500",
      executing: "border-green-500",
      waiting: "border-yellow-500",
      waitingIO: "border-orange-500",
      terminated: "border-red-500",
    };
    return colors[queueName] || "border-gray-300";
  };

  const queues = {
    created: processes.filter((p) => p.state === "Created"),
    ready: processes.filter((p) => p.state === "Ready"),
    executing: processes.filter((p) => p.state === "Executing"),
    waiting: processes.filter((p) => p.state === "Waiting"),
    waitingIO: processes.filter((p) => p.state === "WaitingIO"),
    terminated: processes.filter((p) => p.state === "Terminated"),
  };

  return (
    <div className="grid grid-cols-6 gap-4">
      {Object.entries(queues).map(([queueName, queueProcesses]) => (
        <QueueColumn
          key={queueName}
          title={queueName}
          processes={queueProcesses}
          color={getQueueColor(queueName)}
        />
      ))}
    </div>
  );
}

interface QueueColumnProps {
  title: string;
  processes: PCB[];
  color: string;
}

function QueueColumn({ title, processes, color }: QueueColumnProps) {
  const getBgColor = (queueName: string) => {
    const colors: Record<string, string> = {
      created: "bg-gray-100",
      ready: "bg-blue-100",
      executing: "bg-green-100",
      waiting: "bg-yellow-100",
      waitingIO: "bg-orange-100",
      terminated: "bg-red-100 text-red-600",
    };
    return colors[queueName] || "bg-gray-100";
  };
  const bgColor = getBgColor(title.toLowerCase());

  return (
    <div className={`bg-white rounded-lg border-2 ${color} p-4`}>
      <h3 className="font-bold text-center mb-3 capitalize">{title}</h3>
      <div className="space-y-2 min-h-[200px]">
        {processes.map((process, index) => (
          <div
            key={process.id}
            className={`p-2 rounded ${bgColor} transform transition-all duration-500`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-sm font-medium">P{process.id}</div>
            <div className="text-xs text-gray-600">
              Remaining: {process.remainingTime}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-2 text-sm font-medium">
        Total: {processes.length}
      </div>
    </div>
  );
}
