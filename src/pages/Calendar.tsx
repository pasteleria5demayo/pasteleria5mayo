import React, { useState } from "react";

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // Función para obtener los días del mes
  const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const days = getDaysInMonth(currentYear, currentMonth);

  return (
    <div>
      <h1>📅 Calendario</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
        {days.map((day) => (
          <button
            key={day.toDateString()}
            style={{
              padding: "10px",
              backgroundColor: selectedDate?.toDateString() === day.toDateString() ? "#4ade80" : "#e5e7eb",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedDate(day)}
          >
            {day.getDate()}
          </button>
        ))}
      </div>

      {selectedDate && (
        <div style={{ marginTop: "20px" }}>
          <h2>Pedidos para {selectedDate.toDateString()}</h2>
          <p>Aquí se mostrarán los pedidos y opciones para crear/editar.</p>
        </div>
      )}
    </div>
  );
};

export default Calendar;
