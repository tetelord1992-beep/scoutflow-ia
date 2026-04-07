"use client";
import { useState, useEffect } from 'react';

export default function Historial() {
  const [casos, setCasos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarDatos = async () => {
    try {
      // Nota: Asegúrate de cambiar a la URL de PRODUCCIÓN de n8n cuando termines los tests
      const response = await fetch('https://cs7.app.n8n.cloud/webhook-test/obtener-casos');
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
    <main className="min-h-screen bg-slate-50 p-8 text-slate-800 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Historial de <span className="text-blue-600">Casos</span></h1>
          <a href="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium">
            ← Nuevo Diagnóstico
          </a>
        </div>

        {cargando ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-slate-500 font-medium">Consultando Supabase...</p>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="p-4 font-semibold text-slate-700">Área</th>
                  <th className="p-4 font-semibold text-slate-700">Severidad</th>
                  <th className="p-4 font-semibold text-slate-700">Solución Digital</th>
                  <th className="p-4 font-semibold text-slate-700">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {casos.length > 0 ? casos.map((caso, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-blue-50/50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{caso.area_afectada || "General"}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        caso.diagnostico_ia?.severidad === 'Crítica' || caso.diagnostico_ia?.severidad === 'Alta'
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {caso.diagnostico_ia?.severidad || 'Media'}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      {caso.propuesta_digital?.nombre_solucion || "Ver detalle"}
                    </td>
                    <td className="p-4 text-xs text-slate-400">
                      {new Date(caso.creado_el || Date.now()).toLocaleDateString()}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="p-20 text-center text-slate-400">
                      No hay registros en la base de datos.
                    </td>
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
