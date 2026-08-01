import React from 'react';
import { BookOpen, Folder, MapPin, Terminal, X, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function ConceptsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl shadow-lg text-white">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                📖 Glosario de Conceptos Clave
              </h2>
              <p className="text-xs text-indigo-300">
                Aprende qué es un directorio, qué es la ruta y cómo funciona la consola.
              </p>
            </div>
          </div>

          <button
            onClick={() => { soundFx.playClick(); onClose(); }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar text-sans">
          
          {/* Concept 1: Directorio */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-base">
              <Folder className="w-5 h-5" />
              <h3>1. ¿Qué es un Directorio?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Un <strong className="text-amber-300">Directorio</strong> es exactamente lo mismo que llamamos habitualmente <strong className="text-white">"Carpeta"</strong>. 
              Es un contenedor digital donde guardas archivos u otras subcarpetas para mantener organizada tu información.
            </p>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Ejemplo: La carpeta <code className="text-amber-300 font-mono">cueva</code> es un directorio.</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-semibold">Folder = Directorio</span>
            </div>
          </div>

          {/* Concept 2: Ruta (Path) */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-base">
              <MapPin className="w-5 h-5" />
              <h3>2. ¿Qué es la Ruta (Path)?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              La <strong className="text-emerald-300">Ruta</strong> (o <em>Path</em> en inglés) es la <strong className="text-white">dirección exacta</strong> o mapa que indica la ubicación precisa de una carpeta o archivo dentro de la computadora.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-[11px]">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">📍 ¿Dónde se ve la Ruta?</span>
                <ul className="space-y-1 text-slate-400 text-[10px]">
                  <li>• En el <strong>prompt de la consola</strong> (ej: <code className="text-emerald-300 font-mono">estudiante@isla:~/cueva$</code>).</li>
                  <li>• En el <strong>Explorador de Archivos</strong> a la izquierda de la pantalla.</li>
                  <li>• Al ejecutar el comando de ubicación (<code className="text-emerald-300 font-mono">pwd</code> en Linux/macOS o <code className="text-emerald-300 font-mono">cd</code> en Windows).</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">🗺️ Ejemplo de Ruta en la Isla:</span>
                <p className="text-[10px] text-slate-400 mb-1">Si estás dentro de la carpeta <code className="text-white font-mono">tesoro</code> dentro de <code className="text-white font-mono">cueva</code>:</p>
                <code className="text-cyan-300 font-mono bg-slate-950 px-2 py-1 rounded block text-center border border-slate-800">
                  /isla/cueva/tesoro
                </code>
              </div>
            </div>
          </div>

          {/* Concept 3: La Terminal / Consola */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-base">
              <Terminal className="w-5 h-5" />
              <h3>3. ¿Qué es la Terminal o Consola?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              La <strong className="text-cyan-300">Terminal</strong> es una pantalla de texto para comunicarte directamente con tu sistema operativo. En lugar de usar el mouse para hacer clics, le escribes instrucciones precisas llamadas <strong className="text-white">Comandos</strong>.
            </p>
          </div>

          {/* Golden Rule Box */}
          <div className="bg-gradient-to-r from-emerald-950/50 via-slate-900 to-teal-950/50 border border-emerald-700/50 rounded-xl p-4 flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <span className="font-extrabold text-emerald-400 text-sm block">💡 Regla de Oro del Hacker Estudiante:</span>
              <p>
                Nunca necesitas memorizar todos los comandos de memoria. Si alguna vez te sientes perdido o no sabes qué comando usar, solo escribe <code className="bg-slate-950 px-1.5 py-0.5 rounded text-amber-300 font-mono font-bold border border-amber-800/50">help</code> en la consola para desplegar la ayuda completa.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => { soundFx.playClick(); onClose(); }}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>¡Entendido! Volver al juego</span>
          </button>
        </div>

      </div>
    </div>
  );
}
