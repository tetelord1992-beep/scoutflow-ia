"use client";
import { useState, useEffect } from 'react';

export default function Historial() {
  const [casos, setCasos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // NOTA: Para el reto, puedes conectar esto a un nuevo Webhook de n8n 
  // que haga un "SELECT" en tu tabla de Supabase.
  const cargarDatos = async () => {
    try {
      // Sustituye con tu URL de n8n que consulta Supabase
      const response = await fetch('TU_URL_DE_N8N_PARA_CONSULTAR');
      const data = await response.json();
      setCasos(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Error al cargar:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 p-8 text-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold">Historial de <span className="text-blue-600">Casos</span></h1>
          <a href="/" className="text-blue-600 hover:underline font-medium">← Volver al Formulario</a>
        </div>

        {cargando ? (
          <p>Cargando registros de Supabase...</p>
        ) : (
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-100 border-b">
                <tr>
                  <th className="p-4 font-semibold">Área</th>
                  <th className="p-4 font-semibold">Problema</th>
                  <th className="p-4 font-semibold">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {casos.length > 0 ? casos.map((caso, i) => (
                  <tr key={i} className="border-b hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-blue-700">{caso.area_afectada || caso.area}</td>
                    <td className="p-4 text-sm text-slate-600">{caso.contexto?.substring(0, 50)}...</td>
                    <td className="p-4 text-xs text-slate-400">{new Date(caso.creado_el || Date.now()).toLocaleDateString()}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-slate-400">No hay casos registrados aún.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}