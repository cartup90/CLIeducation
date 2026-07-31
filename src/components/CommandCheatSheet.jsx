import React, { useState } from 'react';
import { OS_COMMANDS_DATA } from '../data/commands';
import { OS_MODES } from '../data/osConfig';
import { X, Search, BookOpen, Terminal } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function CommandCheatSheet({ isOpen, onClose, onInsertCommand, selectedOS = 'linux' }) {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('Todos');

  if (!isOpen) return null;

  const categories = ['Todos', 'Navegación', 'Creación', 'Lectura', 'Manipulación', 'Utilidad'];

  const activeOSObj = OS_MODES.find(o => o.id === selectedOS) || OS_MODES[0];

  const filteredCommands = OS_COMMANDS_DATA.filter((cmd) => {
    const osDetail = cmd.osDetails[selectedOS] || cmd.osDetails.linux;
    const matchesSearch =
      osDetail.cmd.toLowerCase().includes(search.toLowerCase()) ||
      cmd.summary.toLowerCase().includes(search.toLowerCase()) ||
      cmd.id.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCat === 'Todos' || cmd.category === filterCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                Manual de Comandos — {activeOSObj.icon} {activeOSObj.name}
              </h2>
              <p className="text-xs text-slate-400">
                Sintaxis y ejemplos originales para la terminal de {activeOSObj.shortName}
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

        {/* Search & Category Filter */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Buscar comando de ${activeOSObj.shortName}...`}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex space-x-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { soundFx.playClick(); setFilterCat(cat); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filterCat === cat
                    ? 'bg-cyan-500 text-black shadow'
                    : 'bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Command Cards List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {filteredCommands.map((cmd) => {
            const osDetail = cmd.osDetails[selectedOS] || cmd.osDetails.linux;

            return (
              <div
                key={cmd.id}
                className="bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/50 rounded-xl p-4 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-mono font-bold text-sm text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800">
                      {osDetail.cmd}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">({cmd.summary})</span>
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md self-start sm:self-auto">
                    {cmd.category}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mb-3 leading-relaxed">{osDetail.desc}</p>

                {/* Usage & Example Box */}
                <div className="bg-slate-900 rounded-lg p-2.5 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="font-mono text-xs text-emerald-400">
                    <span className="text-slate-500">Uso: </span>
                    {osDetail.usage}
                  </div>

                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onInsertCommand(osDetail.example);
                      onClose();
                    }}
                    className="flex items-center space-x-1.5 bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-800 text-emerald-300 text-xs px-3 py-1 rounded-lg transition-all active:scale-95 self-start sm:self-auto"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Probar en Consola</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 text-center text-xs text-slate-500">
          Haz clic en "Probar en Consola" para ejecutar el comando en tu terminal de {activeOSObj.name}.
        </div>

      </div>
    </div>
  );
}
