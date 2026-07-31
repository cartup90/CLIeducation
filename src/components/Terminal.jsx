import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, RotateCcw, Trash2, CornerDownLeft } from 'lucide-react';
import { OS_COMMANDS_DATA } from '../data/commands';
import { OS_MODES } from '../data/osConfig';
import { soundFx } from '../utils/audio';

export default function Terminal({
  currentPath,
  history,
  onExecuteCommand,
  onResetSandbox,
  onClearHistory,
  themeClass = 'theme-matrix',
  onOpenCheatSheet,
  selectedOS = 'linux'
}) {
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const activeOSObj = OS_MODES.find(o => o.id === selectedOS) || OS_MODES[0];
  const promptText = activeOSObj.promptTemplate(currentPath);

  // Auto-scroll to bottom of terminal output
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Handle Tab completion & Suggestions
  useEffect(() => {
    const trimmed = inputVal.trimStart().toLowerCase();
    if (!trimmed) {
      setSuggestions([]);
      return;
    }

    const firstWord = trimmed.split(' ')[0];
    const availableCmds = [];

    OS_COMMANDS_DATA.forEach(cmd => {
      const osDetail = cmd.osDetails[selectedOS] || cmd.osDetails.linux;
      if (osDetail.cmd.startsWith(firstWord)) availableCmds.push(osDetail.cmd);
      // Include common aliases
      if (cmd.id.startsWith(firstWord)) availableCmds.push(cmd.id);
    });

    const uniqueMatches = Array.from(new Set(availableCmds));
    setSuggestions(uniqueMatches);
    setActiveSuggestionIndex(0);
  }, [inputVal, selectedOS]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    soundFx.playKeypress();
    onExecuteCommand(inputVal);
    setInputVal('');
    setHistoryIndex(-1);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    // Up Arrow (Navigate previous history)
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const userHistory = history.filter(item => item.type === 'input');
      if (userHistory.length === 0) return;

      const nextIndex = historyIndex + 1;
      if (nextIndex < userHistory.length) {
        setHistoryIndex(nextIndex);
        setInputVal(userHistory[userHistory.length - 1 - nextIndex].text);
      }
    }

    // Down Arrow (Navigate next history)
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const userHistory = history.filter(item => item.type === 'input');
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInputVal(userHistory[userHistory.length - 1 - nextIndex].text);
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }

    // Tab Key (Auto-complete)
    else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        const chosen = suggestions[activeSuggestionIndex];
        const parts = inputVal.trimStart().split(' ');
        parts[0] = chosen;
        setInputVal(parts.join(' ') + ' ');
        setSuggestions([]);
      }
    }
  };

  return (
    <div
      className={`rounded-2xl border shadow-2xl overflow-hidden flex flex-col font-mono text-sm transition-all duration-300 ${themeClass}`}
      style={{ height: '440px' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Window Header Bar */}
      <div className="bg-black/40 border-b border-white/10 px-4 py-2.5 flex items-center justify-between select-none">
        
        {/* Window Controls */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-600 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-600 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-600 transition-colors cursor-pointer" />
          
          <div className="ml-3 flex items-center space-x-1.5 text-xs opacity-75 font-semibold">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>{activeOSObj.icon} {activeOSObj.shellName} — {activeOSObj.name}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2 text-xs">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              soundFx.playClick();
              onResetSandbox();
            }}
            className="flex items-center space-x-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-white/80"
            title="Restablecer el estado de la misión"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reiniciar Misión</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              soundFx.playClick();
              onClearHistory();
            }}
            className="flex items-center space-x-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-white/80"
            title="Limpiar pantalla"
          >
            <Trash2 className="w-3 h-3" />
            <span className="hidden sm:inline">Limpiar</span>
          </button>
        </div>
      </div>

      {/* Terminal Output Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2 relative scanline">
        
        {/* Welcome Header in Terminal */}
        <div className="opacity-60 text-xs border-b border-white/10 pb-2 mb-3">
          CLI Teacher Simulator — Modo {activeOSObj.name} [{activeOSObj.shellName}]
          <br />
          Escribe <span className="font-bold underline">help</span> para ver comandos. Usa <span className="font-bold underline">TAB</span> para autocompletar.
        </div>

        {/* History Log */}
        {history.map((item, idx) => (
          <div key={idx} className="leading-relaxed">
            {item.type === 'input' ? (
              <div className="flex items-start space-x-2 font-semibold">
                <span className="opacity-60 select-none">{item.prompt || promptText}</span>
                <span className="text-white">{item.text}</span>
              </div>
            ) : item.type === 'error' ? (
              <div className="bg-rose-950/40 border-l-2 border-rose-500 pl-3 py-1.5 my-1 text-rose-300 font-sans text-xs rounded-r">
                💡 <span className="font-semibold">{item.text}</span>
              </div>
            ) : item.type === 'success' ? (
              <div className="bg-emerald-950/40 border-l-2 border-emerald-500 pl-3 py-1.5 my-1 text-emerald-300 font-sans text-xs rounded-r">
                {item.text}
              </div>
            ) : (
              <div className="whitespace-pre-wrap opacity-90 pl-4 border-l border-white/10 my-1">
                {item.text}
              </div>
            )}
          </div>
        ))}

        <div ref={terminalEndRef} />
      </div>

      {/* Tab Suggestions Popup Bar */}
      {suggestions.length > 0 && (
        <div className="bg-slate-900/90 border-t border-white/10 px-4 py-1.5 flex items-center space-x-2 text-xs overflow-x-auto">
          <span className="opacity-50 text-[10px] uppercase font-bold tracking-wider">Sugerencias (TAB):</span>
          {suggestions.map((sug, idx) => (
            <button
              key={sug}
              type="button"
              onClick={() => {
                const parts = inputVal.trimStart().split(' ');
                parts[0] = sug;
                setInputVal(parts.join(' ') + ' ');
                setSuggestions([]);
                inputRef.current?.focus();
              }}
              className={`px-2 py-0.5 rounded text-xs font-semibold border transition-all ${
                idx === activeSuggestionIndex
                  ? 'bg-emerald-500/30 text-emerald-300 border-emerald-500'
                  : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
              }`}
            >
              {sug}
            </button>
          ))}
        </div>
      )}

      {/* Terminal Input Line */}
      <form onSubmit={handleSubmit} className="bg-black/60 border-t border-white/10 px-4 py-3 flex items-center space-x-2">
        <span className="opacity-75 font-semibold text-xs select-none">{promptText}</span>
        <div className="flex-1 relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              soundFx.playKeypress();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Escribe un comando aquí..."
            className="w-full bg-transparent border-none outline-none font-mono text-white placeholder-white/20 focus:ring-0"
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          disabled={!inputVal.trim()}
          className="p-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500 hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Ejecutar"
        >
          <CornerDownLeft className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
