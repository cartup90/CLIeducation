import React from 'react';
import { BADGES } from '../data/badges';
import { X, Trophy, Lock, CheckCircle2, Terminal, Compass, FolderTree, FileCode, Zap, Award } from 'lucide-react';
import { soundFx } from '../utils/audio';

const ICON_MAP = {
  Terminal,
  Compass,
  FolderTree,
  FileCode,
  Trophy,
  Zap,
  Award,
  CheckCircle2
};

export default function BadgeModal({ isOpen, onClose, unlockedBadgeIds = [] }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-950 border border-amber-800 text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Galería de Insignias y Logros</h2>
              <p className="text-xs text-slate-400">
                Desbloquea medallas demostrando tu dominio de la línea de comandos
              </p>
            </div>
          </div>
          <button
            onClick={() => { soundFx.playClick(); onClose(); }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges Grid */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BADGES.map((badge) => {
            const isUnlocked = unlockedBadgeIds.includes(badge.id);
            const IconComponent = ICON_MAP[badge.icon] || Trophy;

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border transition-all flex items-start space-x-3.5 ${
                  isUnlocked
                    ? 'bg-amber-950/20 border-amber-500/50 shadow-lg shadow-amber-950/20'
                    : 'bg-slate-950/50 border-slate-800 opacity-60'
                }`}
              >
                <div
                  className={`p-3 rounded-xl flex-shrink-0 flex items-center justify-center ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-600 border border-slate-800'
                  }`}
                >
                  {isUnlocked ? <IconComponent className="w-6 h-6 stroke-[2.5]" /> : <Lock className="w-6 h-6" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold text-sm ${isUnlocked ? 'text-amber-300' : 'text-slate-400'}`}>
                      {badge.title}
                    </h3>
                    {isUnlocked && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 text-center text-xs text-slate-400">
          Insignias desbloqueadas: <span className="font-bold text-amber-400">{unlockedBadgeIds.length} / {BADGES.length}</span>
        </div>

      </div>
    </div>
  );
}
