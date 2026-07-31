import React, { useState } from 'react';
import { Lightbulb, ChevronRight, Sparkles } from 'lucide-react';
import { getMissionNarrative } from '../data/missions';
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

  const handleNextHint = () => {
    if (hintLevel < hints.length) {
      const nextLevel = hintLevel + 1;
      setHintLevel(nextLevel);
      soundFx.playClick();
      onUseHint();
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 md:p-5 backdrop-blur-md shadow-xl flex flex-col justify-between">
      
      {/* Mascot & Story Bubble Header */}
      <div className="flex items-start space-x-3.5 mb-4">
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
              <span className="font-bold text-amber-300">Objetivo: </span>
              <span className="text-slate-300">{narrative.objective}</span>
            </div>
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
            ¿Te trabaste con el comando? Byte puede darte pistas progresivas sin penalizar tu progreso.
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
