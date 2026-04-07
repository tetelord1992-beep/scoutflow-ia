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
      const response = await fetch('https://cs7.app.n8n.cloud/webhook-test/nuevo-caso', {
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
    <main className="min-h-screen bg-[#f8fafc] p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-2xl mx-auto">
        
        {/* Header con navegación rápida */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              ScoutFlow <span className="text-blue-600">IA</span>
            </h1>
            <p className="text-slate-600 font-medium">Diagnóstico y propuesta digital inmediata</p>
          </div>
          <a href="/historial" className="text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors">
            Ver Historial →
          </a>
        </div>

        <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 border border-slate-200">
          <form onSubmit={enviarAN8N} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Campo: Área */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2 uppercase tracking-wide">
                  Área afectada
                </label>
                <input 
                  required 
                  type="text" 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400" 
                  placeholder="Ej: Almacén, Producción, Logística"
                  onChange={(e) => setFormData({...formData, area: e.target.value})} 
                />
              </div>

              {/* Campo: Contexto */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2 uppercase tracking-wide">
                  Contexto del problema
                </label>
                <textarea 
                  required 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl h-32 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400" 
                  placeholder="Describe detalladamente qué está ocurriendo..."
                  onChange={(e) => setFormData({...formData, contexto: e.target.value})} 
                />
              </div>

              {/* Campo: Impacto */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2 uppercase tracking-wide">
                  Impacto u Obstáculos
                </label>
                <input 
                  type="text" 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400" 
                  placeholder="¿Cómo afecta esto la productividad o los costos?"
                  onChange={(e) => setFormData({...formData, impacto: e.target.value})} 
                />
              </div>
            </div>

            {/* Botón Principal */}
            <button 
              type="submit" 
              disabled={cargando}
              className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-5 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-900/10 disabled:bg-slate-300 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
            >
              {cargando ? (
                <>
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
                  Analizando...
                </>
              ) : (
                "Generar Diagnóstico Digital"
              )}
            </button>
          </form>

          {/* Resultado Mejorado */}
          {resultado && (
            <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-blue-50/50 border-2 border-blue-100 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg className="w-20 h-20 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L1 21h22L12 2zm0 3.45L19.53 19H4.47L12 5.45zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z"/>
                  </svg>
                </div>
                <h2 className="text-xl font-black text-blue-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                  Propuesta Generada
                </h2>
                <div className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-lg p-4">
                  <pre className="text-sm text-slate-800 whitespace-pre-wrap font-mono leading-relaxed">
                    {JSON.stringify(resultado, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
