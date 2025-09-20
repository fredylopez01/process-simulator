const ProcessStates = () => {
  const states = [
    {
      name: "Created",
      color: "bg-gray-500",
      textColor: "text-gray-700",
      bgLight: "bg-gray-50",
    },
    {
      name: "Ready",
      color: "bg-blue-500",
      textColor: "text-blue-700",
      bgLight: "bg-blue-50",
    },
    {
      name: "Executing",
      color: "bg-green-500",
      textColor: "text-green-700",
      bgLight: "bg-green-50",
    },
    {
      name: "Waiting for Resource",
      color: "bg-yellow-500",
      textColor: "text-yellow-700",
      bgLight: "bg-yellow-50",
    },
    {
      name: "Waiting for I/O",
      color: "bg-orange-500",
      textColor: "text-orange-700",
      bgLight: "bg-orange-50",
    },
    {
      name: "Terminated",
      color: "bg-red-500",
      textColor: "text-red-700",
      bgLight: "bg-red-50",
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">
        Estados de Procesos
      </h3>
      <div className="flex gap-3">
        {states.map((state, index) => (
          <div
            key={index}
            className={`flex items-center p-3 rounded-lg border transition-all hover:shadow-sm ${state.bgLight} border-gray-200`}
          >
            {/* Indicador de color */}
            <div
              className={`w-4 h-4 rounded-full ${state.color} mr-3 flex-shrink-0 shadow-sm`}
            ></div>

            {/* Contenido del estado */}
            <div className="flex-grow">
              <div className={`font-medium ${state.textColor} text-sm`}>
                {state.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessStates;
