import React from 'react';
import { Terminal, Volume2, VolumeX, Trophy, ShoppingBag, GraduationCap, Sparkles, BookOpen, Monitor } from 'lucide-react';
import { OS_MODES } from '../data/osConfig';
import { soundFx } from '../utils/audio';

export default function Header({
  xp,
  level,
  soundEnabled,
  onToggleSound,
  onOpenStartGame,
  onOpenConcepts,
  onOpenBadges,
  onOpenShop,
  onOpenTeacher,
  onOpenCheatSheet,
  unlockedBadgesCount,
  totalBadgesCount,
  selectedOS,
  onSelectOS
}) {
  return (
    <header className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-30 px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-700 p-2.5 rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center animate-float">
            <Terminal className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              CLI Teacher
            </h1>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Aprende la Línea de Comandos Real (Linux, Windows, macOS)
            </p>
          </div>
        </div>

        {/* OS Selector & Toolbar */}
        <div className="flex items-center flex-wrap gap-2.5">
          
          {/* OS Switcher Selector */}
          <div className="flex items-center bg-slate-950/90 border border-slate-800 rounded-xl p-1 space-x-1 shadow-inner">
            <Monitor className="w-3.5 h-3.5 text-slate-400 ml-1.5 hidden sm:block" />
            {OS_MODES.map((os) => {
              const active = os.id === selectedOS;
              return (
                <button
                  key={os.id}
                  onClick={() => {
                    soundFx.playClick();
                    onSelectOS(os.id);
                  }}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    active
                      ? 'bg-emerald-500 text-black shadow-md shadow-emerald-950/50 scale-[1.02]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                  title={`Cambiar a modo ${os.name}`}
                >
                  <span>{os.icon}</span>
                  <span className="hidden md:inline">{os.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* XP & Level Badge */}
          <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <div className="text-xs">
              <span className="text-slate-400 font-medium">Nivel {level}</span>
              <span className="mx-1.5 text-slate-700">|</span>
              <span className="font-bold text-amber-400">{xp} XP</span>
            </div>
          </div>

          {/* Cheat Sheet / Ayuda Rápida Button */}
          <button
            onClick={() => { soundFx.playClick(); onOpenStartGame(); }}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-xl transition-all shadow-md active:scale-95"
            title="Elegir Mundo y Sistema Operativo"
          >
            <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
            <span className="hidden sm:inline">Elegir Mundo y S.O.</span>
          </button>

          <button
            onClick={() => { soundFx.playClick(); onOpenConcepts(); }}
            className="flex items-center space-x-1.5 bg-indigo-950/80 hover:bg-indigo-900 text-indigo-200 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all border border-indigo-700/80 active:scale-95"
            title="Aprende qué es Ruta, Directorio y Consola"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Conceptos Clave</span>
          </button>

          <button
            onClick={() => { soundFx.playClick(); onOpenCheatSheet(); }}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all border border-slate-700 active:scale-95"
            title="Manual de Comandos del Sistema"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">Comandos</span>
          </button>

          {/* Achievements / Badges Button */}
          <button
            onClick={() => { soundFx.playClick(); onOpenBadges(); }}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all border border-slate-700 active:scale-95"
            title="Logos e Insignias"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">Insignias ({unlockedBadgesCount}/{totalBadgesCount})</span>
          </button>

          {/* Customization Shop Button */}
          <button
            onClick={() => { soundFx.playClick(); onOpenShop(); }}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all border border-slate-700 active:scale-95"
            title="Tienda de Aspectos"
          >
            <ShoppingBag className="w-4 h-4 text-purple-400" />
            <span className="hidden lg:inline">Tienda</span>
          </button>

          {/* Teacher Mode Button */}
          <button
            onClick={() => { soundFx.playClick(); onOpenTeacher(); }}
            className="flex items-center space-x-1.5 bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all border border-indigo-800/60 active:scale-95"
            title="Modo Docente / Tutor"
          >
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span className="hidden xl:inline">Docente</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-xl border transition-all ${
              soundEnabled
                ? 'bg-emerald-950/50 border-emerald-800/80 text-emerald-400 hover:bg-emerald-900/50'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:bg-slate-800'
            }`}
            title={soundEnabled ? 'Sonidos activados' : 'Sonidos desactivados'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

        </div>
      </div>
    </header>
  );
}
