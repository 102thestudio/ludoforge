'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { useUIStore } from '@/store/useUIStore';
import { useThemeStore } from '@/store/useThemeStore';
import { GAME_TEMPLATES } from '@/lib/templates';
import { THEMES } from '@/lib/themes';

export function SidebarLeft() {
  const { items, templateId, addItem, duplicateItem, deleteItem } = useGameStore();
  const { selectedItemId, setSelectedItemId } = useUIStore();
  const themeState = useThemeStore();
  const theme = THEMES[themeState.themeId] || THEMES.fantasy;

  const tpl = GAME_TEMPLATES[templateId] || GAME_TEMPLATES[Object.keys(GAME_TEMPLATES)[0]];

  return (
    <aside className="w-80 h-full bg-[#111115] border-r border-[#222228] text-white flex flex-col no-print z-10">
      <div className="p-5 font-black text-lg border-b border-[#222228] tracking-wider uppercase text-zinc-100 flex items-center justify-between">
        <span>Cartas del Juego</span>
        <span className="text-xs bg-[#2f6f8f]/30 text-[#2f6f8f] font-mono px-2 py-0.5 rounded border border-[#2f6f8f]/20">
          {items.length}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2 overflow-y-auto flex-1 custom-scrollbar">
        {/* Global Settings item */}
        <div
          onClick={() => setSelectedItemId(null)}
          className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-all duration-200 ${
            selectedItemId === null
              ? 'bg-[#4f46e5]/10 border-[#4f46e5] text-white shadow-[0_4px_12px_rgba(79,70,229,0.15)]'
              : 'bg-[#18181f]/40 border-transparent hover:border-[#222228] hover:bg-[#18181f] text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <div className="text-zinc-400 group-hover:text-zinc-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="font-semibold text-sm">Ajustes Globales</div>
            <div className="text-xs opacity-70">Portada y Tema</div>
          </div>
        </div>

        {templateId === 'monopoly' && (
          <div
            onClick={() => setSelectedItemId('board_editor')}
            className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-all duration-200 mt-2 ${
              selectedItemId === 'board_editor'
                ? 'bg-[#4f46e5]/10 border-[#4f46e5] text-white shadow-[0_4px_12px_rgba(79,70,229,0.15)]'
                : 'bg-[#18181f]/40 border-transparent hover:border-[#222228] hover:bg-[#18181f] text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <div className="text-zinc-400 group-hover:text-zinc-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="font-semibold text-sm">Modificar Tablero</div>
              <div className="text-xs opacity-70">Esquinas, casillas y colores</div>
            </div>
          </div>
        )}

        <hr className="border-[#222228] my-2" />

        {items.map((item, index) => {
          const isSelected = selectedItemId === item.id;
          const itemTpl = tpl && tpl.itemTemplates ? tpl.itemTemplates[item.type] : null;
          let icon = '📄';
          if (itemTpl && itemTpl.defaultCategory) {
            const catStyle = theme.categories[item.type] || theme.categories[itemTpl.defaultCategory] || {};
            icon = catStyle.icon || '📄';
          }

          return (
            <div
              key={item.id}
              onClick={() => setSelectedItemId(item.id)}
              className={`group flex items-center justify-between gap-2 p-3 rounded-lg cursor-pointer border transition-all duration-200 ${
                isSelected
                  ? 'bg-[#4f46e5]/10 border-[#4f46e5] text-white shadow-[0_4px_12px_rgba(79,70,229,0.15)]'
                  : 'bg-[#18181f]/40 border-transparent hover:border-[#222228] hover:bg-[#18181f] text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden flex-1">
                <div className="text-zinc-400 group-hover:text-zinc-200 transition-colors flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <div className="overflow-hidden">
                  <div className="font-semibold text-sm truncate">
                    {item.title || `Carta ${index + 1}`}
                  </div>
                  <div className="text-xs opacity-70">
                    {itemTpl ? itemTpl.name : 'Carta'}
                  </div>
                </div>
              </div>

              {/* Hover Quick Actions */}
              <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity duration-150">
                <button
                  title="Duplicar"
                  onClick={(e) => {
                    e.stopPropagation();
                    duplicateItem(item.id);
                  }}
                  className="p-1 hover:bg-zinc-700/50 rounded text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                </button>
                <button
                  title="Borrar"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(item.id);
                    if (isSelected) setSelectedItemId(null);
                  }}
                  className="p-1 hover:bg-red-950/40 rounded text-red-500 hover:text-red-400 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-[#222228] bg-[#111115] flex flex-col gap-3">
        <button
          onClick={() => {
            const defaultType = Object.keys(tpl.itemTemplates)[0];
            addItem(defaultType);
          }}
          className="w-full py-3 px-4 bg-[#18181f] hover:bg-[#222228] border border-dashed border-[#33333f] hover:border-[#444455] rounded-xl text-zinc-300 font-semibold text-sm transition-all duration-200 shadow-sm cursor-pointer"
        >
          + Añadir Carta
        </button>

        {/* Profile / Auth Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/40 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <div className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-bold font-mono">
              J
            </div>
            <span className="font-semibold text-zinc-300">Josema</span>
          </div>
          <a href="/login" className="text-zinc-500 hover:text-zinc-300 transition-colors font-medium">
            Cerrar Sesión
          </a>
        </div>
      </div>
    </aside>
  );
}
