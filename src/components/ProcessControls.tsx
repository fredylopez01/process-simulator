import React from "react";

interface ProcessControlsProps {
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  running: boolean;
}

export const ProcessControls: React.FC<ProcessControlsProps> = ({
  onStart,
  onPause,
  onResume,
  onReset,
  running,
}) => {
  return (
    <div style={{ margin: "10px 0" }}>
      <button onClick={onStart} disabled={running}>
        Iniciar
      </button>
      <button onClick={onPause} disabled={!running}>
        Pausar
      </button>
      <button onClick={onResume} disabled={running}>
        Continuar
      </button>
      <button onClick={onReset}>Resetear</button>
    </div>
  );
};
