export function FormNewProcess() {
  return (
    <form>
      <label htmlFor="arrivalTime">Arrival time:</label>
      <input type="number" name="arrivalTime" id="arrivalTime" />

      <label htmlFor="arrivalTime">Burst time:</label>
      <input type="number" name="arrivalTime" id="arrivalTime" />

      <button type="submit">Agregar proceso</button>
    </form>
  );
}
