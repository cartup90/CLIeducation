import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WorldMap from './components/WorldMap';
import Terminal from './components/Terminal';
import MascotGuide from './components/MascotGuide';
import FileTreeViewer from './components/FileTreeViewer';
import CommandCheatSheet from './components/CommandCheatSheet';
import BadgeModal from './components/BadgeModal';
import ShopModal from './components/ShopModal';
import TeacherDashboardModal from './components/TeacherDashboardModal';
import VictoryModal from './components/VictoryModal';
import StartGameModal from './components/StartGameModal';

import { WORLDS } from './data/missions';
import { BADGES } from './data/badges';
import { TERMINAL_THEMES, MASCOT_AVATARS } from './data/cosmetics';
import { OS_MODES } from './data/osConfig';
import { VirtualFS } from './utils/filesystem';
import { soundFx } from './utils/audio';

const STORAGE_KEY = 'cli_teacher_progress_v2';

export default function App() {
  // Operating System Selection state ('linux', 'windows', 'macos')
  const [selectedOS, setSelectedOS] = useState(() => {
    return localStorage.getItem(`${STORAGE_KEY}_os`) || 'linux';
  });

  // XP state
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_xp`);
    return saved ? parseInt(saved, 10) : 0;
  });

  const [activeWorldId, setActiveWorldId] = useState('world-1');
  const [activeMissionId, setActiveMissionId] = useState('m1-1');
  
  const [completedMissionIds, setCompletedMissionIds] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_completed_missions`);
    return saved ? JSON.parse(saved) : [];
  });

  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_unlocked_badges`);
    return saved ? JSON.parse(saved) : [];
  });

  // Cosmetics state
  const [unlockedThemes, setUnlockedThemes] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_themes`);
    return saved ? JSON.parse(saved) : ['matrix'];
  });

  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem(`${STORAGE_KEY}_active_theme`) || 'matrix';
  });

  const [unlockedAvatars, setUnlockedAvatars] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_avatars`);
    return saved ? JSON.parse(saved) : ['owl-default'];
  });

  const [activeAvatar, setActiveAvatar] = useState(() => {
    return localStorage.getItem(`${STORAGE_KEY}_active_avatar`) || 'owl-default';
  });

  const [soundEnabled, setSoundEnabled] = useState(true);

  // Modals visibility state
  const [isStartGameOpen, setIsStartGameOpen] = useState(() => {
    // Show start game modal automatically on first visit if no completed missions
    const savedMissions = localStorage.getItem(`${STORAGE_KEY}_completed_missions`);
    return !savedMissions;
  });
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isTeacherOpen, setIsTeacherOpen] = useState(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);

  // Stats tracking for teacher dashboard
  const [totalCommandsCount, setTotalCommandsCount] = useState(0);
  const [successfulCommandsCount, setSuccessfulCommandsCount] = useState(0);
  const [hintsUsedCount, setHintsUsedCount] = useState(0);

  // Active mission resolution
  const currentWorld = WORLDS.find(w => w.id === activeWorldId) || WORLDS[0];
  const currentMission = currentWorld.missions.find(m => m.id === activeMissionId) || currentWorld.missions[0];

  // Virtual Filesystem & Command History state
  const [fs, setFs] = useState(() => new VirtualFS(currentMission.initialFS, currentMission.initialPath));
  const [currentPath, setCurrentPath] = useState(currentMission.initialPath);
  const [commandHistory, setCommandHistory] = useState([]);

  const activeOSObj = OS_MODES.find(o => o.id === selectedOS) || OS_MODES[0];

  // Reset sandbox when switching mission or OS
  useEffect(() => {
    const newFs = new VirtualFS(currentMission.initialFS, currentMission.initialPath);
    setFs(newFs);
    setCurrentPath(newFs.currentPath);
    setCommandHistory([
      {
        type: 'system',
        text: `--- Inicio de Misión: ${currentMission.title} [Modo ${activeOSObj.name}] ---`
      }
    ]);
  }, [activeMissionId, selectedOS]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_os`, selectedOS);
    localStorage.setItem(`${STORAGE_KEY}_xp`, xp.toString());
    localStorage.setItem(`${STORAGE_KEY}_completed_missions`, JSON.stringify(completedMissionIds));
    localStorage.setItem(`${STORAGE_KEY}_unlocked_badges`, JSON.stringify(unlockedBadgeIds));
    localStorage.setItem(`${STORAGE_KEY}_themes`, JSON.stringify(unlockedThemes));
    localStorage.setItem(`${STORAGE_KEY}_active_theme`, activeTheme);
    localStorage.setItem(`${STORAGE_KEY}_avatars`, JSON.stringify(unlockedAvatars));
    localStorage.setItem(`${STORAGE_KEY}_active_avatar`, activeAvatar);
  }, [selectedOS, xp, completedMissionIds, unlockedBadgeIds, unlockedThemes, activeTheme, unlockedAvatars, activeAvatar]);

  // Level calculation
  const level = Math.floor(xp / 150) + 1;

  // Helper to unlock badge
  const triggerBadgeUnlock = (badgeId) => {
    if (!unlockedBadgeIds.includes(badgeId)) {
      const badge = BADGES.find(b => b.id === badgeId);
      if (badge) {
        soundFx.playBadge();
        setUnlockedBadgeIds(prev => [...prev, badgeId]);
      }
    }
  };

  // Process Command Execution
  const handleExecuteCommand = (rawInput) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    setTotalCommandsCount(prev => prev + 1);

    const activePrompt = activeOSObj.promptTemplate(currentPath);

    // Save input entry
    const inputEntry = {
      type: 'input',
      prompt: activePrompt,
      path: currentPath,
      text: rawInput,
      raw: rawInput
    };
    const updatedHistory = [...commandHistory, inputEntry];

    const parts = trimmed.split(' ').filter(Boolean);
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let result = { success: false, output: '' };

    // 1. PWD / dónde estoy / cd (Windows)
    if (
      mainCmd === 'pwd' ||
      mainCmd === 'dónde_estoy' ||
      mainCmd === 'donde_estoy' ||
      (selectedOS === 'windows' && mainCmd === 'cd' && args.length === 0)
    ) {
      result = { success: true, output: fs.pwddondeEstoy() };
    }
    // 2. LS / DIR / listar
    else if (mainCmd === 'ls' || mainCmd === 'dir' || mainCmd === 'listar') {
      result = fs.listar(args[0]);
    }
    // 3. CD / entrar
    else if (mainCmd === 'cd' || mainCmd === 'entrar' || mainCmd === 'chdir') {
      result = fs.entrar(args[0]);
      if (result.success) {
        setCurrentPath(fs.currentPath);
      }
    }
    // 4. MKDIR / MD / crear_carpeta
    else if (mainCmd === 'mkdir' || mainCmd === 'md' || mainCmd === 'crear_carpeta') {
      result = fs.crearCarpeta(args[0]);
    }
    // 5. TOUCH / crear_archivo / TYPE nul >
    else if (mainCmd === 'touch' || mainCmd === 'crear_archivo' || (selectedOS === 'windows' && mainCmd === 'type' && args.length > 1)) {
      const fileName = args[0] === 'nul' || args[0] === 'nul>' ? args[1] : args[0];
      result = fs.crearArchivo(fileName);
    }
    // 6. CAT / TYPE / leer_archivo
    else if (mainCmd === 'cat' || mainCmd === 'type' || mainCmd === 'leer_archivo') {
      result = fs.leerArchivo(args[0]);
    }
    // 7. REN / RENAME / RENOMBRAR
    else if (mainCmd === 'ren' || mainCmd === 'rename' || mainCmd === 'renombrar') {
      result = fs.renombrar(args[0], args[1]);
    }
    // 8. MV / MOVE / mover
    else if (mainCmd === 'mv' || mainCmd === 'move' || mainCmd === 'mover') {
      // If moving to existing dir or renaming
      if (fs.getNode(fs.partsToPath(fs.resolvePathParts(args[1])))?.type === 'directory') {
        result = fs.mover(args[0], args[1]);
      } else {
        result = fs.renombrar(args[0], args[1]);
      }
    }
    // 9. CP / COPY / copiar
    else if (mainCmd === 'cp' || mainCmd === 'copy' || mainCmd === 'copiar') {
      result = fs.copiar(args[0], args[1]);
    }
    // 10. RM / DEL / REMOVE / ELIMINAR / RMDIR
    else if (mainCmd === 'rm' || mainCmd === 'del' || mainCmd === 'erase' || mainCmd === 'rmdir' || mainCmd === 'eliminar') {
      result = fs.eliminar(args[0]);
    }
    // 11. HELP / ayuda
    else if (mainCmd === 'help' || mainCmd === 'ayuda' || mainCmd === '?') {
      result = {
        success: true,
        output: selectedOS === 'windows' ? `📋 COMANDOS DE WINDOWS (CMD / PowerShell):
• cd - Muestra la ruta actual
• dir - Muestra la lista de archivos y carpetas
• cd <carpeta> - Cambia de carpeta (o cd .. para salir)
• mkdir <nombre> / md <nombre> - Crea una carpeta
• touch <nombre> - Crea un archivo vacio
• type <nombre> - Lee el contenido de un archivo
• ren <actual> <nuevo> - Renombra archivo o carpeta
• move <archivo> <carpeta> - Mueve un elemento
• copy <archivo> <carpeta> - Copia un archivo
• del <nombre> - Elimina un archivo
• cls - Limpia la consola
• help - Muestra este manual` : `📋 COMANDOS DE ${activeOSObj.name.toUpperCase()}:
• pwd - Print Working Directory (Muestra carpeta actual)
• ls - List directory contents (Muestra archivos)
• cd <carpeta> - Change Directory (cd .. para salir)
• mkdir <nombre> - Make Directory (Crea carpeta)
• touch <nombre> - Create empty file (Crea archivo)
• cat <nombre> - Concatenate & Print (Lee archivo)
• mv <origen> <destino> - Move / Rename file
• cp <origen> <destino> - Copy file
• rm <nombre> - Remove file / dir
• clear - Clear screen
• help - Muestra esta ayuda`
      };
    }
    // 12. CLEAR / CLS / limpiar
    else if (mainCmd === 'clear' || mainCmd === 'cls' || mainCmd === 'limpiar') {
      setCommandHistory([]);
      return;
    }
    else {
      result = {
        success: false,
        output: `Comando no reconocido: "${mainCmd}". Revisa la ortografía o escribe 'help' para ver los comandos de ${activeOSObj.shortName}.`
      };
    }

    if (result.success) {
      soundFx.playKeypress();
      setSuccessfulCommandsCount(prev => prev + 1);
      triggerBadgeUnlock('primer_paso');
    } else {
      soundFx.playError();
    }

    const outputEntry = {
      type: result.success ? 'output' : 'error',
      text: result.output
    };

    const finalHistory = [...updatedHistory, outputEntry];
    setCommandHistory(finalHistory);

    // Validate mission completion
    if (currentMission && currentMission.validation) {
      const isComplete = currentMission.validation({
        fs,
        currentPath: fs.currentPath,
        commandHistory: finalHistory
      });

      if (isComplete && !completedMissionIds.includes(currentMission.id)) {
        setCompletedMissionIds(prev => [...prev, currentMission.id]);
        setXp(prev => prev + currentMission.xp);

        const worldMissions = currentWorld.missions.map(m => m.id);
        const willBeAllWorldComplete = worldMissions.every(id => id === currentMission.id || completedMissionIds.includes(id));
        if (willBeAllWorldComplete && currentWorld.badgeId) {
          triggerBadgeUnlock(currentWorld.badgeId);
        }

        if (xp + currentMission.xp >= 500) {
          triggerBadgeUnlock('coleccionista_xp');
        }

        setIsVictoryOpen(true);
      }
    }
  };

  const handleResetSandbox = () => {
    const newFs = new VirtualFS(currentMission.initialFS, currentMission.initialPath);
    setFs(newFs);
    setCurrentPath(newFs.currentPath);
    setCommandHistory(prev => [
      ...prev,
      { type: 'system', text: '🔄 Misión e inventario restablecidos al estado inicial.' }
    ]);
  };

  const handleClearHistory = () => {
    setCommandHistory([]);
  };

  const allMissions = WORLDS.flatMap(w => w.missions);
  const currentIdx = allMissions.findIndex(m => m.id === activeMissionId);
  const nextMission = currentIdx >= 0 && currentIdx < allMissions.length - 1 ? allMissions[currentIdx + 1] : null;

  const activeThemeObj = TERMINAL_THEMES.find(t => t.id === activeTheme) || TERMINAL_THEMES[0];
  const activeAvatarObj = MASCOT_AVATARS.find(a => a.id === activeAvatar) || MASCOT_AVATARS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Header Bar */}
      <Header
        xp={xp}
        level={level}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(soundFx.toggleSound())}
        onOpenStartGame={() => setIsStartGameOpen(true)}
        onOpenBadges={() => setIsBadgesOpen(true)}
        onOpenShop={() => setIsShopOpen(true)}
        onOpenTeacher={() => setIsTeacherOpen(true)}
        onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
        unlockedBadgesCount={unlockedBadgeIds.length}
        totalBadgesCount={BADGES.length}
        selectedOS={selectedOS}
        onSelectOS={(osId) => setSelectedOS(osId)}
      />

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        
        {/* World Map Node Explorer */}
        <WorldMap
          activeWorldId={activeWorldId}
          onSelectWorld={(wId) => {
            setActiveWorldId(wId);
            const targetWorld = WORLDS.find(w => w.id === wId);
            if (targetWorld && targetWorld.missions.length > 0) {
              setActiveMissionId(targetWorld.missions[0].id);
            }
          }}
          activeMissionId={activeMissionId}
          onSelectMission={(mId) => {
            setActiveMissionId(mId);
          }}
          completedMissionIds={completedMissionIds}
        />

        {/* Game Active Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Mascot & Interactive File Tree */}
          <div className="lg:col-span-5 space-y-6">
            <MascotGuide
              mission={currentMission}
              hintsUsedCount={hintsUsedCount}
              onUseHint={() => setHintsUsedCount(prev => prev + 1)}
              mascotAvatar={activeAvatarObj.icon}
              selectedOS={selectedOS}
            />

            <FileTreeViewer
              fs={fs}
              currentPath={currentPath}
            />
          </div>

          {/* Right Column: Simulated Sandbox Terminal */}
          <div className="lg:col-span-7">
            <Terminal
              currentPath={currentPath}
              history={commandHistory}
              onExecuteCommand={handleExecuteCommand}
              onResetSandbox={handleResetSandbox}
              onClearHistory={handleClearHistory}
              themeClass={activeThemeObj.className}
              onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
              selectedOS={selectedOS}
            />
          </div>

        </div>

      </main>

      {/* Modals */}
      <StartGameModal
        isOpen={isStartGameOpen}
        onClose={() => setIsStartGameOpen(false)}
        currentWorldId={activeWorldId}
        currentOSId={selectedOS}
        onStartGame={({ worldId, osId }) => {
          setSelectedOS(osId);
          setActiveWorldId(worldId);
          const targetWorld = WORLDS.find(w => w.id === worldId);
          if (targetWorld && targetWorld.missions.length > 0) {
            setActiveMissionId(targetWorld.missions[0].id);
          }
        }}
      />

      <CommandCheatSheet
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
        onInsertCommand={(cmdStr) => handleExecuteCommand(cmdStr)}
        selectedOS={selectedOS}
      />

      <BadgeModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
        unlockedBadgeIds={unlockedBadgeIds}
      />

      <ShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        xp={xp}
        unlockedThemes={unlockedThemes}
        activeTheme={activeTheme}
        onSelectTheme={(tId) => setActiveTheme(tId)}
        onBuyTheme={(theme) => {
          setXp(prev => prev - theme.price);
          setUnlockedThemes(prev => [...prev, theme.id]);
          setActiveTheme(theme.id);
        }}
        unlockedAvatars={unlockedAvatars}
        activeAvatar={activeAvatar}
        onSelectAvatar={(aId) => setActiveAvatar(aId)}
        onBuyAvatar={(avatar) => {
          setXp(prev => prev - avatar.price);
          setUnlockedAvatars(prev => [...prev, avatar.id]);
          setActiveAvatar(avatar.id);
        }}
      />

      <TeacherDashboardModal
        isOpen={isTeacherOpen}
        onClose={() => setIsTeacherOpen(false)}
        completedMissions={completedMissionIds}
        totalCommandsCount={totalCommandsCount}
        successfulCommandsCount={successfulCommandsCount}
        hintsUsedCount={hintsUsedCount}
        unlockedBadgesCount={unlockedBadgeIds.length}
        onResetProgress={() => {
          setXp(0);
          setCompletedMissionIds([]);
          setUnlockedBadgeIds([]);
          setUnlockedThemes(['matrix']);
          setActiveTheme('matrix');
          setUnlockedAvatars(['owl-default']);
          setActiveAvatar('owl-default');
          setTotalCommandsCount(0);
          setSuccessfulCommandsCount(0);
          setHintsUsedCount(0);
          localStorage.clear();
        }}
      />

      <VictoryModal
        isOpen={isVictoryOpen}
        mission={currentMission}
        nextMission={nextMission}
        onNextMission={(nextId) => {
          setIsVictoryOpen(false);
          const targetWorld = WORLDS.find(w => w.missions.some(m => m.id === nextId));
          if (targetWorld) {
            setActiveWorldId(targetWorld.id);
          }
          setActiveMissionId(nextId);
        }}
        onClose={() => setIsVictoryOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 px-6 text-center text-xs text-slate-500">
        Command Line Interface Teacher — Entorno Educativo Simulado para Linux, Windows y macOS
      </footer>

    </div>
  );
}
