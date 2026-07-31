import React from 'react';
import { TERMINAL_THEMES, MASCOT_AVATARS } from '../data/cosmetics';
import { X, ShoppingBag, Check, Lock, Sparkles, Palette, User } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function ShopModal({
  isOpen,
  onClose,
  xp,
  unlockedThemes,
  activeTheme,
  onSelectTheme,
  onBuyTheme,
  unlockedAvatars,
  activeAvatar,
  onSelectAvatar,
  onBuyAvatar
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-purple-950 border border-purple-800 text-purple-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Tienda de Aspectos y Cosméticos</h2>
              <p className="text-xs text-slate-400">
                Canjea tu XP ganado para desbloquear skins de terminal y avatares para Byte
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-400">
              <Sparkles className="w-4 h-4 mr-1.5" />
              <span>{xp} XP Disponibles</span>
            </div>
            <button
              onClick={() => { soundFx.playClick(); onClose(); }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Shop Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Terminal Skins Section */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Palette className="w-4 h-4 text-purple-400" />
              <h3 className="font-bold text-sm text-slate-200 uppercase tracking-wider">
                Skins de Terminal Simulada
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {TERMINAL_THEMES.map((theme) => {
                const isUnlocked = unlockedThemes.includes(theme.id);
                const isActive = activeTheme === theme.id;
                const canAfford = xp >= theme.price;

                return (
                  <div
                    key={theme.id}
                    className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                      isActive
                        ? 'bg-purple-950/30 border-purple-500 ring-1 ring-purple-500'
                        : isUnlocked
                        ? 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                        : 'bg-slate-950/40 border-slate-900 opacity-80'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-slate-100">{theme.name}</span>
                        <div
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: theme.previewColor }}
                        />
                      </div>
                      <p className="text-xs text-slate-400 mb-4">{theme.description}</p>
                    </div>

                    <div>
                      {isActive ? (
                        <div className="bg-purple-950 text-purple-300 border border-purple-800 text-xs font-bold py-1.5 rounded-lg text-center flex items-center justify-center space-x-1">
                          <Check className="w-4 h-4" />
                          <span>Equipado</span>
                        </div>
                      ) : isUnlocked ? (
                        <button
                          onClick={() => { soundFx.playClick(); onSelectTheme(theme.id); }}
                          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-1.5 rounded-lg border border-slate-700 transition-all active:scale-95"
                        >
                          Equipar
                        </button>
                      ) : (
                        <button
                          disabled={!canAfford}
                          onClick={() => {
                            if (canAfford) {
                              soundFx.playBadge();
                              onBuyTheme(theme);
                            }
                          }}
                          className={`w-full text-xs font-bold py-1.5 rounded-lg transition-all flex items-center justify-center space-x-1 ${
                            canAfford
                              ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-950/50 active:scale-95'
                              : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                          }`}
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>Comprar ({theme.price} XP)</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mascot Avatars Section */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <User className="w-4 h-4 text-indigo-400" />
              <h3 className="font-bold text-sm text-slate-200 uppercase tracking-wider">
                Avatares de Mascota
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {MASCOT_AVATARS.map((avatar) => {
                const isUnlocked = unlockedAvatars.includes(avatar.id);
                const isActive = activeAvatar === avatar.id;
                const canAfford = xp >= avatar.price;

                return (
                  <div
                    key={avatar.id}
                    className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                      isActive
                        ? 'bg-indigo-950/30 border-indigo-500 ring-1 ring-indigo-500'
                        : isUnlocked
                        ? 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                        : 'bg-slate-950/40 border-slate-900 opacity-80'
                    }`}
                  >
                    <div className="text-center mb-3">
                      <div className="text-4xl mb-2">{avatar.icon}</div>
                      <span className="font-bold text-sm text-slate-100 block">{avatar.name}</span>
                      <p className="text-xs text-slate-400 mt-1">{avatar.description}</p>
                    </div>

                    <div>
                      {isActive ? (
                        <div className="bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-bold py-1.5 rounded-lg text-center flex items-center justify-center space-x-1">
                          <Check className="w-4 h-4" />
                          <span>Equipado</span>
                        </div>
                      ) : isUnlocked ? (
                        <button
                          onClick={() => { soundFx.playClick(); onSelectAvatar(avatar.id); }}
                          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-1.5 rounded-lg border border-slate-700 transition-all active:scale-95"
                        >
                          Equipar
                        </button>
                      ) : (
                        <button
                          disabled={!canAfford}
                          onClick={() => {
                            if (canAfford) {
                              soundFx.playBadge();
                              onBuyAvatar(avatar);
                            }
                          }}
                          className={`w-full text-xs font-bold py-1.5 rounded-lg transition-all flex items-center justify-center space-x-1 ${
                            canAfford
                              ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-md active:scale-95'
                              : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                          }`}
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>Comprar ({avatar.price} XP)</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
