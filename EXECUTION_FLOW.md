# Introducción

Este documento explica el mecanismo de ejecución del simulador de planificación de procesos.
Se describen las fases principales:

- Creación de procesos
- Inicio de simulación
- Ejecución y planificación
- Visualización (tablas y diagrama de Gantt)

# Diagrama de flujo general

```
UI
  ↓
SimulationProvider
   ↙        ↘
 Clock      Scheduler
   ↘        ↙
  useSimulation
   ↙        ↘
TableState   GanttDiagram
```
-----

## Fases del mecanismo
```markdown
# Fases del mecanismo

### Creación de procesos
- El usuario usa **FormNewProcess** para agregar un nuevo proceso.
- Por medio del contexto, se envian los procesos creados al provider
- Se llama a **addProcessListener**.
- Los procesos quedan en *initial_processes* y *processes* dentro del **SimulationProvider**

### Inicio de simulación
- Botón **Iniciar** → función `start()` en el Provider.
- Se reinicia el **Clock**.
- Se crea un **Scheduler** con el algoritmo seleccionado (FCFS, SJF, RR) y con los procesos de *initial_processes*.
- Se pone `running = true`.

### Ejecución paso a paso
Cada tick del Clock:
currentTime <- currentTime + 1

- El **Scheduler** elige el proceso a ejecutar y maneja toda la logica para mover de estados a los procesos
- El estado global *processes* se actualiza con los estados (*Ready, Executing, Waiting, Waiting IO, Terminated*).

### Durante ejecucion
- El provider consume los procesos modificados por el Scheduler cada vez que pasa un tick en el Clock, de esa manera
los componentes graficos pueden mantenerse actualizados al utilizar la informacion de los procesos actualizados

```

### Visualización
- **StatsModal** → lista completa de procesos con métricas.  
- **TableState** → procesos separados por estado.  
- **GanttDiagram** → ejecución en el tiempo con Google Charts.  

# Algoritmos soportados

- **FCFS (First Come, First Served):** orden por llegada.  
- **SJF (Shortest Job First):** orden por ráfaga más corta.  
- **RR (Round Robin):** asigna quantum fijo y rota procesos.

### Ejemplo de pseudocódigo

```plaintext
Entrada: Lista de procesos Ready
Salida: Proceso seleccionado para CPU

Si algoritmo == FCFS:
    Seleccionar el proceso con menor arrivalTime
Sino si algoritmo == SJF:
    Seleccionar el proceso con menor burstTime
Sino:   # Round Robin
    Ejecutar quantum y poner el proceso al final de la cola ready
```
