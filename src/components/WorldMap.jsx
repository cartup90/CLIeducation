import React from 'react';
import { WORLDS } from '../data/missions';
import { Lock, CheckCircle2, Play, Compass, FolderTree, FileCode, ShieldAlert, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

const ICON_MAP = {
  Compass,
  FolderTree,
  FileCode,
  ShieldAlert
};

export default function WorldMap({
  activeWorldId,
  onSelectWorld,
  activeMissionId,
  onSelectMission,
  completedMissionIds
}) {
  const activeWorld = WORLDS.find(w => w.id === activeWorldId) || WORLDS[0];

  // Helper to check if a world is unlocked
  const isWorldUnlocked = (world) => {
    if (world.number === 1) return true;
    const prevWorld = WORLDS.find(w => w.number === world.number - 1);
    if (!prevWorld) return false;
    // Check if at least all missions of previous world are completed
    return prevWorld.missions.every(m => completedMissionIds.includes(m.id));
  };

  // Helper to check if a mission is unlocked
  const isMissionUnlocked = (world, missionIndex) => {
    if (!isWorldUnlocked(world)) return false;
    if (missionIndex === 0) return true;
    const prevMission = world.missions[missionIndex - 1];
    return completedMissionIds.includes(prevMission.id);
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-6 backdrop-blur-md shadow-xl">
      
      {/* World Selector Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {WORLDS.map((world) => {
          const unlocked = isWorldUnlocked(world);
          const active = world.id === activeWorldId;
          const IconComponent = ICON_MAP[world.icon] || Compass;
          const worldCompletedMissions = world.missions.filter(m => completedMissionIds.includes(m.id)).length;
          const totalWorldMissions = world.missions.length;
          const isWorldFullyDone = worldCompletedMissions === totalWorldMissions;

          return (
            <button
              key={world.id}
              disabled={!unlocked}
              onClick={() => {
                soundFx.playClick();
                onSelectWorld(world.id);
              }}
              className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-xl border text-sm font-semibold whitespace-nowrap transition-all ${
                active
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/50 scale-[1.02]'
                  : unlocked
                  ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700/80'
                  : 'bg-slate-950/50 border-slate-900 text-slate-600 cursor-not-allowed opacity-60'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-900 text-slate-400'}`}>
                {!unlocked ? <Lock className="w-4 h-4" /> : <IconComponent className="w-4 h-4" />}
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-1.5">
                  <span>Mundo {world.number}</span>
                  {isWorldFullyDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="text-[10px] opacity-75 font-normal">
                  {unlocked ? `${worldCompletedMissions}/${totalWorldMissions} completadas` : 'Bloqueado'}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected World Header */}
      <div className="mb-6 bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950 border border-emerald-800/80 px-2.5 py-0.5 rounded-full">
              Mundo {activeWorld.number}
            </span>
            <h2 className="text-xl font-bold text-slate-100">{activeWorld.title}</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">{activeWorld.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full md:w-64 bg-slate-900 border border-slate-800 rounded-lg p-2.5">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-slate-400">Progreso del Mundo</span>
            <span className="text-emerald-400">
              {Math.round((activeWorld.missions.filter(m => completedMissionIds.includes(m.id)).length / activeWorld.missions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
              style={{
                width: `${(activeWorld.missions.filter(m => completedMissionIds.includes(m.id)).length / activeWorld.missions.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* Mission Nodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {activeWorld.missions.map((mission, idx) => {
          const isUnlocked = isMissionUnlocked(activeWorld, idx);
          const isCompleted = completedMissionIds.includes(mission.id);
          const isActive = mission.id === activeMissionId;

          return (
            <div
              key={mission.id}
              onClick={() => {
                if (isUnlocked) {
                  soundFx.playClick();
                  onSelectMission(mission.id);
                }
              }}
              className={`relative rounded-xl border p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-800 border-emerald-400 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-400 scale-[1.02]'
                  : isCompleted
                  ? 'bg-emerald-950/20 border-emerald-800/80 hover:bg-emerald-950/40'
                  : isUnlocked
                  ? 'bg-slate-800/60 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                  : 'bg-slate-950/40 border-slate-900 opacity-50 cursor-not-allowed'
              }`}
            >
              {/* Type Badge & XP */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  mission.type === 'boss'
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : mission.type === 'detective'
                    ? 'bg-rose-950 text-rose-400 border border-rose-800'
                    : mission.type === 'practica'
                    ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}>
                  {mission.typeLabel}
                </span>
                
                <div className="flex items-center space-x-1 text-xs font-bold text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>+{mission.xp} XP</span>
                </div>
              </div>

              {/* Mission Title */}
              <div>
                <h3 className="font-bold text-sm text-slate-100 mb-1 line-clamp-1">{mission.title}</h3>
                <p className="text-[11px] text-slate-400 line-clamp-2">{mission.objective}</p>
              </div>

              {/* Status Indicator */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                {isCompleted ? (
                  <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Completada</span>
                  </span>
                ) : isUnlocked ? (
                  <span className={`font-semibold flex items-center space-x-1 ${isActive ? 'text-emerald-400' : 'text-slate-300'}`}>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isActive ? 'En Curso' : 'Comenzar'}</span>
                  </span>
                ) : (
                  <span className="text-slate-600 font-medium flex items-center space-x-1">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Bloqueada</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
