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
│── package.json
│── tsconfig.json
│── vite.config.ts
│── src/
│   │── main.tsx            # Punto de entrada
│   │── App.tsx             # Layout principal
│   │
│   ├── components/         # Todo lo visual (UI/UX)
│   │   ├── ProcessForm.tsx # Formulario para agregar procesos
│   │   ├── QueueView.tsx   # Visualización de colas (ready, waiting, running, terminated)
│   │   ├── GanttChart.tsx  # Gráfico de ejecución
│   │   ├── Controls.tsx    # Botones de iniciar/pausar/reiniciar, elegir algoritmo
│   │   └── Metrics.tsx     # KPIs: tiempo de espera, turnaround, etc.
│   │
│   ├── simulator/          # Lógica del "mini S.O."
│   │   ├── models/
│   │   │   └── PCB.ts      # Definición de la interfaz PCB
│   │   ├── algorithms/
│   │   │   ├── fcfs.ts     # Implementación de FCFS
│   │   │   ├── sjf.ts      # Implementación de SJF
│   │   │   └── roundRobin.ts # Implementación de RR
│   │   ├── Scheduler.ts    # Clase/funciones para coordinar los algoritmos
│   │   └── Clock.ts        # Reloj virtual (simulación del tiempo)
│   │
│   ├── hooks/
│   │   └── useSimulator.ts # Hook para conectar la lógica con los componentes
│   │
│   ├── context/
│   │   └── SimulatorContext.tsx # Contexto global para manejar el estado
│   │
│   ├── styles/             # Estilos
│   │   └── globals.css
│   │
│   └── utils/
│       └── helpers.ts      # Funciones auxiliares (random IDs, formateo, etc.)

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
