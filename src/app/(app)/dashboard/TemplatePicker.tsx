'use client';

import { useState } from 'react';
import { GAME_TEMPLATES } from '@/lib/templates';

const TEMPLATE_META: Record<string, { icon: string; desc: string }> = {
  poker: { icon: '🃏', desc: '52 cartas francesas personalizables con tus fotos' },
  spanish_deck: { icon: '🃀', desc: '48 cartas españolas personalizables con tus fotos' },
  sticker_collection: { icon: '📖', desc: 'Cromos ilimitados con álbum de colección automático' },
  fiasco: { icon: '🎭', desc: 'Cartas party de preguntas y respuestas' },
  battle_cards: { icon: '⚔️', desc: 'TCG con personajes, hechizos y trampas' },
  hidden_roles: { icon: '🕵️', desc: 'Juego de roles ocultos y facciones' },
  monopoly: { icon: '🎲', desc: 'Tablero de casillas tipo monopoly' },
  drinking_game: { icon: '🍻', desc: 'Party de retos y bebidas' },
  couples_game: { icon: '❤️', desc: 'Verdades, retos e intimidad' },
  friends_game: { icon: '💬', desc: 'Confesiones y votaciones de amigos' },
};

export function TemplatePicker({ onSelect, onCancel }: { onSelect: (templateId: string) => void; onCancel: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onCancel}>
      <div
        className="bg-[#111115] border border-[#222228] rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 pb-4 border-b border-[#222228]">
          <h2 className="text-xl font-black text-zinc-100 uppercase tracking-wider">Tipo de Juego</h2>
          <p className="text-sm text-zinc-500 mt-1">Elige la plantilla para tu proyecto</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(GAME_TEMPLATES).map(([id, tpl]: [string, any]) => {
              const meta = TEMPLATE_META[id] || { icon: '📄', desc: '' };
              const isActive = selected === id;
              return (
                <button
                  key={id}
                  onClick={() => setSelected(id)}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600/10 border-indigo-500 shadow-md shadow-indigo-500/10'
                      : 'bg-[#18181f]/60 border-[#222228] hover:border-[#33333f] hover:bg-[#18181f]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{meta.icon}</span>
                    <span className={`font-bold text-sm ${isActive ? 'text-indigo-400' : 'text-zinc-200'}`}>{tpl.name}</span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">{meta.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6 pt-4 border-t border-[#222228] flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-4 bg-[#18181f] hover:bg-[#222228] border border-[#222228] text-zinc-300 rounded-xl font-semibold text-sm transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button
            disabled={!selected}
            onClick={() => selected && onSelect(selected)}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-[#4f46e5] to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl font-bold text-sm transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Crear Proyecto
          </button>
        </div>
      </div>
    </div>
  );
}
