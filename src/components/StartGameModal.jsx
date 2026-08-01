import React, { useState } from 'react';
import { Terminal, Monitor, Compass, Play, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { OS_MODES } from '../data/osConfig';
import { WORLDS } from '../data/missions';
import { soundFx } from '../utils/audio';

export default function StartGameModal({
  isOpen,
  onClose,
  currentWorldId,
  currentOSId,
  onStartGame
}) {
  const [selectedWorldId, setSelectedWorldId] = useState(currentWorldId || WORLDS[0].id);
  const [selectedOSId, setSelectedOSId] = useState(currentOSId || OS_MODES[0].id);

  if (!isOpen) return null;

  const handleConfirm = () => {
    soundFx.playSuccess();
    onStartGame({ worldId: selectedWorldId, osId: selectedOSId });
    onClose();
  };

  const selectedOS = OS_MODES.find(o => o.id === selectedOSId) || OS_MODES[0];
  const selectedWorld = WORLDS.find(w => w.id === selectedWorldId) || WORLDS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl shadow-emerald-950/30 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-xl shadow-lg text-slate-950">
              <Terminal className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                🎮 Configurar Partida CLI
              </h2>
              <p className="text-xs text-slate-400">
                Selecciona tu Sistema Operativo y el Mundo de aventuras para empezar.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
          
          {/* Step 1: Select Operating System */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
              <Monitor className="w-4 h-4" />
              <span>1. Selecciona el Sistema Operativo</span>
            </div>
            <p className="text-xs text-slate-400">
              Los comandos que utilizarás en la consola se adaptarán al sistema operativo que elijas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {OS_MODES.map((os) => {
                const isSelected = os.id === selectedOSId;
                return (
                  <button
                    key={os.id}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedOSId(os.id);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-lg shadow-emerald-950/50 scale-[1.02]'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 absolute top-3 right-3 animate-pulse" />
                    )}
                    <div>
                      <div className="text-3xl mb-2">{os.icon}</div>
                      <h3 className="font-bold text-sm text-slate-100">{os.name}</h3>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Shell: <code className="text-emerald-300 font-mono bg-slate-900 px-1 py-0.5 rounded">{os.shellName}</code>
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 space-y-0.5">
                      <div>Listar: <span className="text-emerald-400 font-bold">{os.commands.ls}</span></div>
                      <div>Ruta: <span className="text-emerald-400 font-bold">{os.commands.pwd}</span></div>
                      <div>Limpiar: <span className="text-emerald-400 font-bold">{os.commands.clear}</span></div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select World */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>2. Selecciona el Mundo de Aventuras</span>
            </div>
            <p className="text-xs text-slate-400">
              Cada mundo contiene misiones temáticas con retos narrativos progresivos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {WORLDS.map((world) => {
                const isSelected = world.id === selectedWorldId;
                return (
                  <button
                    key={world.id}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedWorldId(world.id);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500 text-white shadow-lg shadow-cyan-950/50 scale-[1.02]'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 absolute top-3 right-3 animate-pulse" />
                    )}
                    <div>
                      <div className="text-3xl mb-2">{world.icon}</div>
                      <h3 className="font-bold text-sm text-slate-100">{world.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{world.description}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-cyan-300 font-semibold bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                      <span>{world.missions.length} Misiones</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Summary Box */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{selectedOS.icon}</span>
              <div>
                <div className="text-xs text-slate-400">Modo Seleccionado</div>
                <div className="font-bold text-sm text-slate-200">
                  {selectedWorld.title} en <span className="text-emerald-400">{selectedOS.name}</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-400 text-right">
              Aprenderás comandos reales de <span className="text-white font-medium">{selectedOS.shortName}</span>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Cancelar / Mantener actual
          </button>
          
          <button
            onClick={handleConfirm}
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-950/60 active:scale-95 transition-all"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>¡Iniciar Aventura!</span>
          </button>
        </div>

      </div>
    </div>
  );
}
