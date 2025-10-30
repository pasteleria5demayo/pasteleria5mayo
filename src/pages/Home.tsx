import React, { useState } from "react";
import { useOrdenes } from "../hooks/useOrdenes";

const Home: React.FC = () => {
  const { ordenesHoy, ordenesManana, loading, error } = useOrdenes();
  const [imagenSeleccionada, setImagenSeleccionada] = useState<string | null>(null);

  const formatearFecha = (fecha: Date) =>
    fecha.toLocaleString("es-MX", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  const renderOrden = (orden: any) => (
    <div
      key={orden.id}
      className="bg-white/90 backdrop-blur-md border border-pink-100 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Imagen */}
      <div
        className="w-full aspect-video bg-pink-50 flex items-center justify-center overflow-hidden cursor-pointer group"
        onClick={() => setImagenSeleccionada(orden.foto)}
      >
        <img
          src={
            orden.foto ||
            "https://img.icons8.com/?size=100&id=nuCnmMca3VCN&format=png&color=000000"
          }
          alt={orden.pastel}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src =
              "https://img.icons8.com/?size=100&id=nuCnmMca3VCN&format=png&color=000000";
          }}
        />
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {orden.cliente}
          </h3>
          <span
            className={`px-2 py-1 rounded-full text-xs sm:text-sm font-bold ${
              orden.estatus === 0
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {orden.estatus === 0 ? "Pendiente" : "Listo 🎉"}
          </span>
        </div>
        <div className="text-sm text-gray-700 space-y-1">
          <p>
            🎂 <span className="font-medium">{orden.pastel}</span>
          </p>
          <p>
            💰 <span className="font-medium">${orden.total}</span>
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            🕒 Entrega: {formatearFecha(orden.fechaEntrega)}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-50 to-pink-100 pb-10 px-4 sm:px-6 lg:px-10">
      {/* Encabezado */}
      <header className="relative overflow-hidden rounded-3xl shadow-lg mb-12 mt-6 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-300 text-white p-10 text-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circles-and-roundabouts.png')] opacity-20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 drop-shadow-lg">
            🎂 Bienvenido a la Pastelería
          </h1>
          <p className="text-lg sm:text-xl opacity-90">
            Organiza tus pedidos y endulza el día 🍰
          </p>
        </div>
      </header>

      {/* Estados */}
      {loading && (
        <p className="text-gray-600 text-center italic">Cargando pedidos...</p>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Pedidos */}
      {!loading && !error && (
        <>
          {/* Hoy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-rose-700 mb-6 flex items-center gap-2">
              <span>📅</span> Pedidos de Hoy
            </h2>
            {ordenesHoy.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                {ordenesHoy.map(renderOrden)}
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                No hay pedidos para hoy.
              </p>
            )}
          </section>

          {/* Mañana */}
          <section>
            <h2 className="text-2xl font-bold text-rose-700 mb-6 flex items-center gap-2">
              <span>📅</span> Pedidos de Mañana
            </h2>
            {ordenesManana.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                {ordenesManana.map(renderOrden)}
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                No hay pedidos para mañana.
              </p>
            )}
          </section>
        </>
      )}

      {/* Modal para ver imagen grande */}
      {imagenSeleccionada && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn"
          onClick={() => setImagenSeleccionada(null)}
        >
          <img
            src={imagenSeleccionada}
            alt="Vista previa"
            className="max-w-[90%] max-h-[85%] rounded-lg shadow-2xl object-contain border border-white/20"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
