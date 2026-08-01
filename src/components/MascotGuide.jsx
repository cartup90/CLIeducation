import React, { useState } from 'react';
import { Lightbulb, ChevronRight, Sparkles, BookOpen, HelpCircle, Info } from 'lucide-react';
import { getMissionNarrative } from '../data/missions';
import { OS_MODES } from '../data/osConfig';
import { soundFx } from '../utils/audio';

export default function MascotGuide({
  mission,
  hintsUsedCount,
  onUseHint,
  mascotAvatar = '🦉',
  selectedOS = 'linux'
}) {
  const [hintLevel, setHintLevel] = useState(0);

  const narrative = getMissionNarrative(mission, selectedOS);
  const hints = narrative.hints || [];
  const activeOSObj = OS_MODES.find(o => o.id === selectedOS) || OS_MODES[0];
  const isWindows = selectedOS === 'windows';

  const handleNextHint = () => {
    if (hintLevel < hints.length) {
      const nextLevel = hintLevel + 1;
      setHintLevel(nextLevel);
      soundFx.playClick();
      onUseHint();
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 md:p-5 backdrop-blur-md shadow-xl flex flex-col justify-between space-y-4">
      
      {/* Mascot & Story Bubble Header */}
      <div className="flex items-start space-x-3.5">
        {/* Animated Mascot Avatar */}
        <div className="relative group flex-shrink-0">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-0.5 shadow-lg shadow-indigo-950/60 flex items-center justify-center text-3xl animate-float">
            <span>{mascotAvatar}</span>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-black text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
            AI GUIDE
          </div>
        </div>

        {/* Speech Bubble / Storyline */}
        <div className="flex-1 bg-slate-950/90 border border-slate-800 rounded-2xl p-3.5 relative shadow-inner">
          <div className="flex items-center justify-between mb-1">
            <span className="font-extrabold text-xs text-indigo-400">Byte dice:</span>
            <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Instrucciones</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-sans font-medium">
            "{narrative.story}"
          </p>

          {/* Goal Box */}
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-start space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-amber-300">Objetivo actual: </span>
              <span className="text-slate-300 font-medium">{narrative.objective}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Commands Primer Card (Tutorial para principiantes) */}
      <div className="bg-slate-950/80 border border-indigo-900/40 rounded-xl p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-300">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Guía de Comandos Básicos ({activeOSObj.name})</span>
          </div>
          <span className="text-[10px] text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/50 font-medium">
            Primeros Pasos
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] font-sans">
          <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[10px]">1. Dónde estoy:</span>
            <code className="text-emerald-400 font-mono font-bold">{isWindows ? 'cd' : 'pwd'}</code>
            <span className="text-slate-500 text-[10px] block">Muestra tu carpeta</span>
          </div>

          <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[10px]">2. Ver contenido:</span>
            <code className="text-emerald-400 font-mono font-bold">{isWindows ? 'dir' : 'ls'}</code>
            <span className="text-slate-500 text-[10px] block">Lista los archivos</span>
          </div>

          <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[10px]">3. Entrar a carpeta:</span>
            <code className="text-emerald-400 font-mono font-bold">cd &lt;nombre&gt;</code>
            <span className="text-slate-500 text-[10px] block">Usa <code className="text-slate-300">cd ..</code> para salir</span>
          </div>

          <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[10px]">4. Crear carpeta:</span>
            <code className="text-emerald-400 font-mono font-bold">mkdir &lt;nombre&gt;</code>
            <span className="text-slate-500 text-[10px] block">Crea nuevo directorio</span>
          </div>
        </div>

        {/* ALWAYS VISIBLE HELP REMINDER */}
        <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-800/50 rounded-lg p-2.5 flex items-center space-x-2 text-xs">
          <HelpCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 animate-pulse" />
          <div className="text-[11px] text-emerald-200">
            <span className="font-extrabold text-emerald-400">💡 Recordatorio clave:</span> Escribe <code className="bg-slate-900 px-1 py-0.5 rounded font-mono font-bold text-emerald-300 border border-emerald-700/50">help</code> en la consola para desplegar todos los comandos y su función.
          </div>
        </div>
      </div>

      {/* Hints System Drawer */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-300">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Sistema de Pistas ({hintLevel}/{hints.length})</span>
          </div>
          
          {hintLevel < hints.length && (
            <button
              onClick={handleNextHint}
              className="flex items-center space-x-1 text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-lg transition-all active:scale-95"
            >
              <span>{hintLevel === 0 ? 'Pedir Pista 1' : hintLevel === 1 ? 'Pedir Pista 2' : 'Ver Solución'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Display Current Unlocked Hints */}
        {hintLevel === 0 ? (
          <p className="text-[11px] text-slate-500 italic">
            ¿Te trabaste? Byte puede darte pistas paso a paso. Recuerda que también puedes escribir <code className="text-amber-400 font-mono">help</code> en la consola.
          </p>
        ) : (
          <div className="space-y-2 mt-2">
            {hints.slice(0, hintLevel).map((hintText, index) => (
              <div
                key={index}
                className={`p-2.5 rounded-lg border text-xs font-sans animate-fadeIn ${
                  index === 2
                    ? 'bg-rose-950/40 border-rose-800 text-rose-200'
                    : index === 1
                    ? 'bg-amber-950/40 border-amber-800 text-amber-200'
                    : 'bg-indigo-950/40 border-indigo-800 text-indigo-200'
                }`}
              >
                <div className="font-bold text-[10px] uppercase tracking-wider mb-0.5 opacity-80">
                  {index === 2 ? '🔑 Solución Final' : `💡 Pista ${index + 1}`}
                </div>
                <div>{hintText}</div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
