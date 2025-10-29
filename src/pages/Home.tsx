import React from "react";
import { useOrdenes } from "../hooks/useOrdenes";

const Home: React.FC = () => {
  const { ordenesHoy, ordenesManana, loading, error } = useOrdenes();

  const formatearFecha = (fecha: Date) =>
    fecha.toLocaleString("es-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const renderOrden = (orden: any) => (
    <div
      key={orden.id}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl border border-gray-200"
    >
      {/* Imagen del pastel */}
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
        <img
          src={orden.foto || "/default-pastel.png"}
          alt={orden.pastel}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{orden.cliente}</h3>
          <span
            className={`px-2 py-1 rounded-full text-sm font-bold ${
              orden.estatus === 0 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
            }`}
          >
            {orden.estatus === 0 ? "Pendiente" : "Realizado"}
          </span>
        </div>

        <p className="text-gray-700 mb-1">🎂 {orden.pastel}</p>
        <p className="text-gray-600 mb-1">💰 Total: ${orden.total}</p>
        <p className="text-gray-500 text-sm">🕒 Entrega: {formatearFecha(orden.fechaEntrega)}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-pink-600 mb-4">🎂 Bienvenido a la Pastelería</h1>
      <p className="text-gray-600 mb-10">¡Aquí verás tus pedidos y podrás organizar el día!</p>

      {loading && <p className="text-gray-500">Cargando pedidos...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {/* Pedidos de Hoy */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-purple-700 mb-6">📅 Pedidos de Hoy</h2>
            {ordenesHoy.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ordenesHoy.map(renderOrden)}
              </div>
            ) : (
              <p className="text-gray-500">No hay pedidos para hoy.</p>
            )}
          </section>

          {/* Pedidos de Mañana */}
          <section>
            <h2 className="text-2xl font-semibold text-purple-700 mb-6">📅 Pedidos de Mañana</h2>
            {ordenesManana.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ordenesManana.map(renderOrden)}
              </div>
            ) : (
              <p className="text-gray-500">No hay pedidos para mañana.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
