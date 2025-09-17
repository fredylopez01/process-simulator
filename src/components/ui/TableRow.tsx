import type { PCB } from "../../simulator/models/PCB";

export function TableRow({ process, index }: { process: PCB; index: number }) {
  return (
    <tr className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
      <td className="px-3 py-2 border border-gray-300 text-center">{process.id}</td>
      <td className="px-3 py-2 border border-gray-300 text-center">{process.arrivalTime}</td>
      <td className="px-3 py-2 border border-gray-300 text-center">{process.burstTime}</td>
      <td className="px-3 py-2 border border-gray-300 text-center">{process.remainingTime}</td>
      <td className="px-3 py-2 border border-gray-300 text-center">{process.state}</td>
      <td className="px-3 py-2 border border-gray-300 text-center">{process.priority}</td>
      <td className="px-3 py-2 border border-gray-300 text-center">{process.completionTime}</td>
      <td className="px-3 py-2 border border-gray-300 text-center">{process.turnaroundTime}</td>
      <td className="px-3 py-2 border border-gray-300 text-center">
        {process.normalizedTurnaroundTime?.toFixed(2) ?? "-"}
      </td>
      <td className="px-3 py-2 border border-gray-300 text-center">{process.waitingTime}</td>
    </tr>
  );
}
