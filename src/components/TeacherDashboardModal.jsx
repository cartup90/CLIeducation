import React, { useState } from 'react';
import { WORLDS } from '../data/missions';
import { X, GraduationCap, Trophy, Terminal, CheckCircle2, RotateCcw, AlertTriangle, Download, Upload } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function TeacherDashboardModal({
  isOpen,
  onClose,
  completedMissions,
  totalCommandsCount,
  successfulCommandsCount,
  hintsUsedCount,
  unlockedBadgesCount,
  onResetProgress
}) {
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const totalMissionsCount = WORLDS.reduce((acc, w) => acc + w.missions.length, 0);
  const completionPercentage = Math.round((completedMissions.length / totalMissionsCount) * 100);
  const accuracyPercentage = totalCommandsCount > 0 ? Math.round((successfulCommandsCount / totalCommandsCount) * 100) : 100;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Panel Docente / Tutor</h2>
              <p className="text-xs text-slate-400">
                Métricas de desempeño y progreso pedagógico del estudiante
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

        {/* Stats Grid */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-center">
              <div className="text-2xl font-black text-emerald-400 mb-0.5">{completionPercentage}%</div>
              <div className="text-[11px] font-semibold text-slate-400">Progreso Total</div>
              <div className="text-[10px] text-slate-500 mt-1">{completedMissions.length} de {totalMissionsCount} misiones</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-center">
              <div className="text-2xl font-black text-cyan-400 mb-0.5">{accuracyPercentage}%</div>
              <div className="text-[11px] font-semibold text-slate-400">Precisión CLI</div>
              <div className="text-[10px] text-slate-500 mt-1">{successfulCommandsCount} de {totalCommandsCount} comandos</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-center">
              <div className="text-2xl font-black text-amber-400 mb-0.5">{hintsUsedCount}</div>
              <div className="text-[11px] font-semibold text-slate-400">Pistas Solicitadas</div>
              <div className="text-[10px] text-slate-500 mt-1">Nivel de asistencia</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-center">
              <div className="text-2xl font-black text-purple-400 mb-0.5">{unlockedBadgesCount}</div>
              <div className="text-[11px] font-semibold text-slate-400">Insignias Logradas</div>
              <div className="text-[10px] text-slate-500 mt-1">Recompensas activadas</div>
            </div>
          </div>

          {/* Detailed Missions Progress Matrix */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">
              Desglose por Mundos y Misiones
            </h3>

            <div className="space-y-3">
              {WORLDS.map((world) => (
                <div key={world.id} className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-slate-200">
                      Mundo {world.number}: {world.title}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400">
                      {world.missions.filter((m) => completedMissions.includes(m.id)).length}/{world.missions.length} completadas
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {world.missions.map((mission) => {
                      const isDone = completedMissions.includes(mission.id);
                      return (
                        <div
                          key={mission.id}
                          className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                            isDone
                              ? 'bg-emerald-950/30 border-emerald-800 text-emerald-300'
                              : 'bg-slate-900/40 border-slate-800 text-slate-500'
                          }`}
                        >
                          <span className="truncate pr-2 font-medium">{mission.title}</span>
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          ) : (
                            <span className="text-[10px] font-semibold uppercase opacity-60">Pendiente</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reset / Management Section */}
          <div className="bg-rose-950/20 border border-rose-900/50 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span>Zona de Administración de Clase</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Permite reiniciar todo el progreso del alumno para iniciar un nuevo ciclo lectivo.
            </p>

            {confirmReset ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onResetProgress();
                    setConfirmReset(false);
                    onClose();
                  }}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all"
                >
                  Sí, Borrar Todo el Progreso
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs px-3 py-2 rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmReset(true)}
                className="flex items-center space-x-1.5 bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 font-semibold text-xs px-3 py-2 rounded-lg transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar Progreso del Estudiante</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
