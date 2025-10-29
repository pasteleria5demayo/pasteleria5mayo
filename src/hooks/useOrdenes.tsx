import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

export interface Orden {
  id: string;
  cliente: string;
  pastel: string;
  fechaEntrega: Date;
  estatus: number;
  total: number;
}

export const useOrdenes = () => {
  const [ordenesHoy, setOrdenesHoy] = useState<Orden[]>([]);
  const [ordenesManana, setOrdenesManana] = useState<Orden[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        setLoading(true);
        const ordenesRef = collection(db, "ordenes");
        const q = query(ordenesRef, orderBy("fechaEntrega", "asc"));
        const snapshot = await getDocs(q);

        const hoy = new Date();
        const manana = new Date();
        manana.setDate(hoy.getDate() + 1);

        const hoyList: Orden[] = [];
        const mananaList: Orden[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (!data.fechaEntrega) return;

          const fecha =
            data.fechaEntrega instanceof Timestamp
              ? data.fechaEntrega.toDate()
              : new Date(data.fechaEntrega);

          const f = new Date(fecha);

          const esHoy =
            f.getDate() === hoy.getDate() &&
            f.getMonth() === hoy.getMonth() &&
            f.getFullYear() === hoy.getFullYear();

          const esManana =
            f.getDate() === manana.getDate() &&
            f.getMonth() === manana.getMonth() &&
            f.getFullYear() === manana.getFullYear();

          const orden: Orden = {
            id: doc.id,
            cliente: data.cliente || "Sin nombre",
            pastel: data.pastel || "Sin descripción",
            fechaEntrega: f,
            estatus: data.estatus ?? 0,
            total: data.total ?? 0,
          };

          if (esHoy) hoyList.push(orden);
          if (esManana) mananaList.push(orden);
        });

        setOrdenesHoy(hoyList);
        setOrdenesManana(mananaList);
      } catch (err: any) {
        console.error("🔥 Error al cargar pedidos:", err);
        setError("Error al cargar pedidos");
      } finally {
        setLoading(false);
      }
    };

    fetchOrdenes();
    console.log(ordenesHoy, ordenesManana)
    
  }, []);

  return { ordenesHoy, ordenesManana, loading, error };
};
