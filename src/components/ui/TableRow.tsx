import type { PCB } from "../../simulator/models/PCB";

export function TableRow({ process }: { process: PCB }) {
    return (
        <tr>
            <td>{process.id}</td>
            <td>{process.arrivalTime}</td>
            <td>{process.burstTime}</td>
            <td>{process.remainingTime}</td>
            <td>{process.state}</td>
            <td>{process.priority}</td>
            <td>{process.completionTime}</td>
            <td>{process.turnaroundTime}</td>
            <td>{process.normalizedTurnaroundTime?.toFixed(2) ?? "-"}</td>
            <td>{process.waitingTime}</td>
        </tr>
    );
}
