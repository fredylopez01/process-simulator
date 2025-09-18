import { useSimulation } from "../../context/useSimulation";
import { TableRow } from "../ui/TableRow";

export function ProcessTable() {
  const { processes, deleteProcess } = useSimulation();

  const onDelete = (id: number) => {
    console.log("Deleting process", id);
    deleteProcess(id);
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md my-6">
      <table className="min-w-full border border-gray-300 text-sm text-left">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-3 py-2 border border-gray-300">ID</th>
            <th className="px-3 py-2 border border-gray-300">Arrival</th>
            <th className="px-3 py-2 border border-gray-300">Burst</th>
            <th className="px-3 py-2 border border-gray-300">Remaining</th>
            <th className="px-3 py-2 border border-gray-300">State</th>
            <th className="px-3 py-2 border border-gray-300">Priority</th>
            <th className="px-3 py-2 border border-gray-300">Completion</th>
            <th className="px-3 py-2 border border-gray-300">Turnaround</th>
            <th className="px-3 py-2 border border-gray-300">Normalized T.A.</th>
            <th className="px-3 py-2 border border-gray-300">Waiting</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((p, i) => (
            <TableRow key={p.id} process={p} index={i} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
