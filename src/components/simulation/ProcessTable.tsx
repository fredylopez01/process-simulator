import { useSimulation } from "../../context/useSimulation";
import {TableRow} from "../ui/tableRow";

export function ProcessTable() {
  const { processes } = useSimulation();
  return (
    <table border={1} style={{ width: "100%", marginTop: 10 }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Arrival</th>
          <th>Burst</th>
          <th>Remaining</th>
          <th>State</th>
          <th>Priority</th>
          <th>Completion</th>
          <th>Turnaround</th>
          <th>Normalized Turnaround</th>
          <th>Waiting</th>
        </tr>
      </thead>
      <tbody>
        {processes.map((p) => (
          <TableRow key={p.id} process={p} />
        ))}
      </tbody>
    </table>
  );
}
