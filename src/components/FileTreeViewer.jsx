import React from 'react';
import { Folder, FolderOpen, FileText, HardDrive, MapPin, Info } from 'lucide-react';

export default function FileTreeViewer({ fs, currentPath }) {
  const rootNode = fs.root;

  // Recursive Tree Node Renderer
  const renderNode = (node, pathSoFar = '', level = 0) => {
    if (!node) return null;

    const fullPath = pathSoFar === '/' ? `/${node.name}` : `${pathSoFar}/${node.name}`;
    const isCurrentDir = currentPath === fullPath || (fullPath === '/root' && currentPath === '/');
    const isDirectory = node.type === 'directory';

    return (
      <div key={fullPath} className="select-none font-mono text-xs">
        <div
          className={`flex items-center space-x-1.5 py-1 px-2 rounded-lg transition-colors ${
            isCurrentDir
              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/80 font-bold'
              : 'hover:bg-slate-800/60 text-slate-300'
          }`}
          style={{ paddingLeft: `${Math.max(level * 14 + 8, 8)}px` }}
        >
          {isDirectory ? (
            isCurrentDir ? (
              <FolderOpen className="w-4 h-4 text-amber-400 flex-shrink-0" />
            ) : (
              <Folder className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            )
          ) : (
            <FileText className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
          )}

          <span className="truncate">{node.name}</span>

          {isCurrentDir && (
            <span className="ml-auto text-[9px] bg-emerald-500 text-black font-extrabold px-1.5 py-0.2 rounded uppercase tracking-wider">
              AQUÍ
            </span>
          )}
        </div>

        {/* Children Render */}
        {isDirectory && node.children && (
          <div className="space-y-0.5 border-l border-slate-800 ml-3 my-0.5">
            {Object.values(node.children).map((child) =>
              renderNode(child, fullPath, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-md shadow-xl flex flex-col h-full min-h-[300px]">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center space-x-2">
          <HardDrive className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">
            Explorador de Archivos (En Vivo)
          </h3>
        </div>
        <div className="flex items-center space-x-1 text-[11px] text-slate-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-md">
          <MapPin className="w-3 h-3 text-emerald-400" />
          <span className="font-mono text-emerald-300 font-semibold">{currentPath}</span>
        </div>
      </div>

      {/* Live Tree Container */}
      <div className="flex-1 overflow-y-auto max-h-[320px] pr-1 space-y-1">
        {renderNode(rootNode, '', 0)}
      </div>

      {/* Footer Info */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center space-x-1.5 text-[11px] text-slate-500">
        <Info className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
        <span>El árbol se actualiza automáticamente con tus comandos.</span>
      </div>

    </div>
  );
}
