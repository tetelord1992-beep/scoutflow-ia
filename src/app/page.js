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
      // AQUÍ PEGARÁS TU URL DE N8N EN EL SIGUIENTE PASO
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
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <header className="border-b pb-4 mb-6">
          <h1 className="text-3xl font-extrabold text-slate-800">ScoutFlow <span className="text-blue-600">IA</span></h1>
          <p className="text-slate-500 text-sm">Simulador de diagnóstico y propuesta digital</p>
        </header>

        <form onSubmit={enviarAN8N} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Área afectada</label>
              <input required type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="Ej: Almacén, Ventas, RRHH"
                onChange={(e) => setFormData({...formData, area: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Contexto del problema</label>
              <textarea required className="w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="Describe qué está pasando..."
                onChange={(e) => setFormData({...formData, contexto: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Impacto u Obstáculos</label>
              <input type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="¿Cómo afecta esto a la empresa?"
                onChange={(e) => setFormData({...formData, impacto: e.target.value})} />
            </div>
          </div>

          <button type="submit" disabled={cargando}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg disabled:bg-slate-400">
            {cargando ? "Analizando con IA..." : "Generar Diagnóstico Digital"}
          </button>
        </form>

        {resultado && (
          <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-xl">
            <h2 className="text-xl font-bold text-blue-800 mb-2">Resultado del Análisis</h2>
            <pre className="text-sm text-slate-700 whitespace-pre-wrap">
              {JSON.stringify(resultado, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}