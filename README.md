# 🖥️🧑🏻‍💻SIMULADOR DE PROCESOS

Este es un proyecto que busca desarrollar un simulador de procesos de un sistema operativos, que utilizar tres diferentes algoritmos para ejecutar los procesos (los más conocidos y sencillos, unos clásicos), esto con el fin de aprender el funcionamiento de una parte del sistema operativo (OS Operating System).

En concreto los algoritmos que se piensan usar son:

- **FCFS (First Come, First Served)** → Se procesa en orden de llegada.
- **SJF (Shortest Job First)** → Se escoge el proceso con menor burstTime o duración.
- **Round Robin** → Se usa un quantum definido por el usuario y alternas entre procesos.

## 🛠️Herramientas (Framework - Lenguaje)

El proyecto va a ser desarrollado en **React** y **Typescript**, esto debido a que lo que se quiere lograr es algo más ilustrativo para entender más fácil el funcionamiento de un sistema operativo y como puede llegar a gestionar los procesos, además typescript es un poco más estructurado y hará de este proyecto un desarrolló más limpio.

## 📂Estructura de carpetas

Por el momento la estructura de carpetas que se piensan trabajar es la siguiente, puede que en el transcurso del desarrolló se hagan alguna variaciones.

```bash
/process-simulator
/process-simulator
│── package.json
│── tsconfig.json
│── vite.config.ts
│── src/
│   │── main.tsx                  # Punto de entrada de la app
│   │── App.tsx                   # Layout principal
│   │
│   ├── components/               # Componentes de UI
│   │   ├── simulation/           # Módulos principales de la simulación
│   │   │   ├── AlgorithmSettings.tsx   # Configuración del algoritmo (FCFS, SJF, RR)
│   │   │   ├── ClockDisplay.tsx        # Reloj virtual de la simulación
│   │   │   ├── FormNewProcess.tsx      # Formulario para crear nuevos procesos
│   │   │   ├── ProcessControls.tsx     # Controles: iniciar, pausar, reanudar, resetear
│   │   │   ├── ProcessTable.tsx        # Tabla con información completa de los procesos
│   │   │   └── SimulationResults.tsx   # Resultados y métricas de la simulación
│   │   │
│   │   ├── ui/                   # Subcomponentes reutilizables
│   │   │   ├── GanttDiagram.tsx               # Diagrama de Gantt (timeline de ejecución)
│   │   │   ├── ProcessTurnVisualization.tsx   # Visaulización de turnos y proceso en la CPU
│   │   │   ├── QueueVisualization.tsx         # Visualización de estado de las colas
│   │   │   └── StatsModal.tsx                 # Estadísticas de los procesos ejecutados
│   │   │
│   │   └── SimulationSection.tsx   # Contenedor principal de la simulación
│   │
│   ├── context/                  # Manejo de estado global
│   │   ├── SimulationContext.tsx      # Definición del contexto
│   │   ├── SimulationProvider.tsx     # Proveedor del contexto (lógica principal)
│   │   └── useSimulation.tsx          # Hook personalizado para usar el contexto
│   │
│   ├── simulator/                # Núcleo de la lógica del planificador
│   │   ├── algorithms/                 # Implementaciones de algoritmos
│   │   │   ├── FCFS.ts                 # Algoritmo First Come First Serve
│   │   │   ├── RoundRobin.ts           # Algoritmo Round Robin
│   │   │   ├── SJN.ts                  # Algoritmo Shortest Job Next
│   │   │   └── ScheduleNextProcess.ts  # Utilidad para seleccionar el siguiente proceso
│   │   ├── models/                     # Modelos de datos
│   │   │   └── PCB.ts                  # Proceso Control Block (estructura de proceso)
│   │   ├── Scheduler.ts                # Coordinador de la ejecución de procesos
│   │   └── Clock.ts                    # Reloj virtual que avanza el tiempo
│
│── public/                      # Archivos estáticos

```

## ⚙️Creación y configuración

### Crear proyecto

```bash
npm create vite@latest process-simulator
```

### Instalar paquetes

```bash
npm install
```
