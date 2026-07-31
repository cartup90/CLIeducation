import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function VictoryModal({
  isOpen,
  mission,
  nextMission,
  onNextMission,
  onClose
}) {
  useEffect(() => {
    if (isOpen) {
      soundFx.playSuccess();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.warn("Confetti error", e);
      }
    }
  }, [isOpen]);

  if (!isOpen || !mission) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-emerald-500/50 rounded-3xl w-full max-w-md p-6 text-center shadow-2xl shadow-emerald-950/50 relative overflow-hidden">
        
        {/* Glow Background Accent */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Icon & Fanfare */}
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-emerald-950/60 animate-bounce">
          <Trophy className="w-8 h-8 text-slate-950 stroke-[2.5]" />
        </div>

        <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider">
          ¡MISIÓN CUMPLIDA!
        </span>

        <h2 className="text-xl font-black text-slate-100 mt-2 mb-1">{mission.title}</h2>
        <p className="text-xs text-slate-300 mb-4 px-2">{mission.successMsg}</p>

        {/* Reward Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 mb-6 flex items-center justify-center space-x-2 text-amber-400 font-extrabold text-sm">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>+{mission.xp} XP Recompensa Obtenida</span>
        </div>

        {/* Next Mission Button */}
        <div className="space-y-2">
          {nextMission ? (
            <button
              onClick={() => {
                soundFx.playClick();
                onNextMission(nextMission.id);
              }}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-sm py-3 rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center space-x-2 transition-all active:scale-95"
            >
              <span>Siguiente Misión: {nextMission.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm py-3 rounded-xl shadow-lg transition-all active:scale-95"
            >
              ¡Volver al Mapa de Mundos!
            </button>
          )}

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="w-full text-xs font-semibold text-slate-400 hover:text-slate-200 py-2 transition-colors"
          >
            Permanecer en esta consola
          </button>
        </div>

      </div>
    </div>
  );
}
