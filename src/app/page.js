"use client";
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    area: '',
    contexto: '',
    impacto: '',
    pasos: ''
  });
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);

  const enviarAN8N = async (e) => {
    e.preventDefault();
    setCargando(true);
    
    try {
      const response = await fetch('https://cs7.app.n8n.cloud/webhook/nuevo-caso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResultado(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al conectar con el cerebro de IA");
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans flex justify-center items-start">
      <div className="max-w-2xl w-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl p-8 md:p-10 border border-slate-100">
        
        <header className="mb-10 text-left">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            ScoutFlow <span className="text-blue-600">IA</span>
          </h1>
          <p className="text-slate-600 font-medium text-lg mt-1">
            Simulador de diagnóstico y propuesta digital
          </p>
          <div className="h-1 w-20 bg-blue-600 mt-4 rounded-full"></div>
        </header>

        <form onSubmit={enviarAN8N} className="space-y-8">
          <div className="space-y-6">
            {/* Campo: Área */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2 tracking-wide">
                Área afectada
              </label>
              <input 
                required 
                type="text" 
                className="w-full p-4 bg-white border-2 border-slate-100 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-slate-900 font-semibold placeholder:text-slate-500 placeholder:font-normal" 
                placeholder="Ej: Almacén, Ventas, RRHH"
                onChange={(e) => setFormData({...formData, area: e.target.value})} 
              />
            </div>

            {/* Campo: Contexto */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2 tracking-wide">
                Contexto del problema
              </label>
              <textarea 
                required 
                className="w-full p-4 bg-white border-2 border-slate-100 rounded-xl h-32 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-slate-900 font-semibold placeholder:text-slate-500 placeholder:font-normal resize-none" 
                placeholder="Describe qué está pasando..."
                onChange={(e) => setFormData({...formData, contexto: e.target.value})} 
              />
            </div>

            {/* Campo: Impacto */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2 tracking-wide">
                Impacto u Obstáculos
              </label>
              <input 
                type="text" 
                className="w-full p-4 bg-white border-2 border-slate-100 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-slate-900 font-semibold placeholder:text-slate-500 placeholder:font-normal" 
                placeholder="¿Cómo afecta esto a la empresa?"
                onChange={(e) => setFormData({...formData, impacto: e.target.value})} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={cargando}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-5 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-200 disabled:bg-slate-300 text-lg"
          >
            {cargando ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando datos...
              </span>
            ) : "Generar Diagnóstico Digital"}
          </button>
        </form>

        {resultado && (
          <div className="mt-10 p-6 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
              <h2 className="text-white font-bold text-lg">Análisis de IA Finalizado</h2>
            </div>
            <pre className="text-slate-300 text-sm overflow-x-auto font-mono bg-slate-800/50 p-4 rounded-xl border border-slate-700">
              {JSON.stringify(resultado, null, 2)}
            </pre>
          </div>
        )}

        <footer className="mt-8 text-center">
          <a href="/historial" className="text-slate-400 hover:text-blue-600 font-bold text-sm transition-all uppercase tracking-widest">
            Ir al historial de casos →
          </a>
        </footer>
      </div>
    </main>
  );
}
