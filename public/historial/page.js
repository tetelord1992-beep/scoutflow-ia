"use client";
import { useState, useEffect } from 'react';

export default function Historial() {
  const [casos, setCasos] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  const cargarDatos = async () => {
    try {
      const response = await fetch('https://cs7.app.n8n.cloud/webhook/nuevo-caso');
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
    <main className="min-h-screen bg-[#f8fafc] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header con enlace mejorado */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Historial de <span className="text-blue-600">Casos</span>
            </h1>
            <p className="text-slate-600 mt-1 font-medium">Gestión y seguimiento de diagnósticos activos</p>
          </div>
          
          <a href="/" className="group flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-blue-900/10 font-semibold text-sm">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> 
            Nuevo Diagnóstico
          </a>
        </div>

        {cargando ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
              <div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin"></div>
            </div>
            <p className="mt-4 text-slate-700 font-bold tracking-wide uppercase text-xs">Sincronizando con Supabase</p>
          </div>
        ) : (
          <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-0">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-5 font-bold text-slate-800 text-sm uppercase tracking-wider">Área Afectada</th>
                    <th className="p-5 font-bold text-slate-800 text-sm uppercase tracking-wider">Severidad</th>
                    <th className="p-5 font-bold text-slate-800 text-sm uppercase tracking-wider">Solución Propuesta</th>
                    <th className="p-5 font-bold text-slate-800 text-sm uppercase tracking-wider text-right">Fecha de Registro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {casos.length > 0 ? casos.map((caso, i) => (
                    <tr key={i} className="hover:bg-blue-50/40 transition-colors group">
                      <td className="p-5">
                        <div className="font-bold text-slate-900">{caso.area_afectada || "General"}</div>
                        <div className="text-[11px] text-slate-500 font-medium uppercase mt-0.5">ID: {i + 100}</div>
                      </td>
                      <td className="p-5">
                        <span className={`inline-flex items-center px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider ${
                          caso.diagnostico_ia?.severidad === 'Crítica' || caso.diagnostico_ia?.severidad === 'Alta'
                            ? 'bg-red-100 text-red-700 border border-red-200' 
                            : 'bg-amber-100 text-amber-700 border border-amber-200'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse"></span>
                          {caso.diagnostico_ia?.severidad || 'Media'}
                        </span>
                      </td>
                      <td className="p-5">
                        {/* Texto gris fuerte mejorado */}
                        <p className="text-slate-700 font-medium leading-relaxed max-w-xs line-clamp-2">
                          {caso.propuesta_digital?.nombre_solucion || "Pendiente de revisión"}
                        </p>
                      </td>
                      <td className="p-5 text-right">
                        <span className="text-sm font-bold text-slate-800 block">
                          {new Date(caso.creado_el || Date.now()).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium uppercase">
                          {new Date(caso.creado_el || Date.now()).getFullYear()}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="p-24 text-center">
                        <div className="text-slate-300 mb-2 font-black text-5xl">!</div>
                        <p className="text-slate-500 font-bold text-lg">No se encontraron registros</p>
                        <p className="text-slate-400 text-sm">La base de datos está actualmente vacía.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
