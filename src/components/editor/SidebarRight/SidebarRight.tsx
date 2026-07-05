'use client';

import React from 'react';
import { useGameStore, GameItem } from '@/store/useGameStore';
import { useUIStore } from '@/store/useUIStore';
import { useThemeStore } from '@/store/useThemeStore';
import { GAME_TEMPLATES } from '@/lib/templates';
import { THEMES } from '@/lib/themes';
import html2canvas from 'html2canvas';

export function SidebarRight() {
  const { items, templateId, cover, rules, setTemplate, updateCover, updateRules, updateItem, deleteItem } = useGameStore();
  const { selectedItemId, setSelectedItemId } = useUIStore();
  const { themeId, themeOverrides, backStyle, backColor, backDesign, showCropMarks, showBleed, setTheme, updateThemeSetting } = useThemeStore();

  const selectedItem = items.find((item) => item.id === selectedItemId);
  const tpl = GAME_TEMPLATES[templateId] || GAME_TEMPLATES[Object.keys(GAME_TEMPLATES)[0]];
  const activeTheme = THEMES[themeId] || THEMES.fantasy;

  const handlePrint = () => {
    const gameData = {
      items,
      templateId,
      cover,
      rules,
      themeState: { themeId, themeOverrides, backStyle, backColor, backDesign, showCropMarks, showBleed }
    };
    sessionStorage.setItem('ludoforge_print_data', JSON.stringify(gameData));
    window.open('/print', '_blank');
  };

  const handleSocialExport = async () => {
    const pageEl = document.querySelector('.page') as HTMLElement;
    if (!pageEl) {
      alert('No se encontró ninguna página para exportar.');
      return;
    }
    
    try {
      // Temporarily hide crop marks for the social preview image
      const svgMarks = pageEl.querySelector('svg');
      if (svgMarks) svgMarks.style.display = 'none';

      const canvas = await html2canvas(pageEl, {
        scale: 2, // High resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#0a0a0c',
      });

      if (svgMarks) svgMarks.style.display = ''; // Restore crop marks visibility

      const imgData = canvas.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${cover.title || 'ludoforge-game'}-preview.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error generating preview:', err);
      alert('Error al generar la imagen de vista previa.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isCover: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (isCover) {
          updateCover('image', dataUrl);
        } else if (selectedItem) {
          updateItem(selectedItem.id, { image: dataUrl });
        }
      };
      reader.readAsDataURL(file);
    }
  };



  // 1. BOARD EDITOR SIDEBAR
  if (selectedItemId === 'board_editor') {
    const handleCategoryColorChange = (catId: string, color: string) => {
      const currentOverrides = themeOverrides.categories || {};
      const newCategoryOverrides = {
        ...currentOverrides,
        [catId]: {
          ...currentOverrides[catId],
          background: color,
          textColor: '#ffffff'
        }
      };
      updateThemeSetting('themeOverrides', {
        ...themeOverrides,
        categories: newCategoryOverrides
      });
    };

    const getTypeColor = (type: string) => {
      if (type === 'property') return '#2E7D32';
      if (type === 'chance') return '#F57C00';
      if (type === 'community') return '#0288D1';
      return '#999';
    };

    return (
      <aside className="w-80 h-full bg-[#111115] border-l border-[#222228] text-white flex flex-col no-print z-10">
        <div className="p-5 font-black text-lg border-b border-[#222228] tracking-wider uppercase text-zinc-100">
          Ajustes de Tablero
        </div>

        <div className="p-6 flex flex-col gap-6 overflow-y-auto flex-1 custom-scrollbar">
          {/* Text scale slider */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>
              Escala de Texto de Casillas
            </h4>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0.8"
                max="2.0"
                step="0.1"
                value={cover.boardTextScale || 1.3}
                onChange={(e) => updateCover('boardTextScale', parseFloat(e.target.value))}
                className="flex-1 accent-[#4f46e5] h-1.5 bg-[#18181f] rounded-lg cursor-pointer"
              />
              <span className="text-xs font-mono font-bold bg-[#18181f] px-2 py-0.5 rounded border border-[#222228]">
                {cover.boardTextScale || 1.3}x
              </span>
            </div>
          </div>

          {/* Corners Configuration */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>
              Esquinas del Tablero
            </h4>
            <div className="flex flex-col gap-2.5">
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Casilla Salida (Inf. Der.)</label>
                <input
                  type="text"
                  value={cover.boardCorners?.salida || '🏁 SALIDA'}
                  onChange={(e) => {
                    const currentCorners = cover.boardCorners || { salida: '🏁 SALIDA', carcel: '🔒 CÁRCEL', parking: '🅿️ PARKING', irCarcel: '👮 IR A CÁRCEL' };
                    updateCover('boardCorners', { ...currentCorners, salida: e.target.value });
                  }}
                  className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Casilla Cárcel (Inf. Izq.)</label>
                <input
                  type="text"
                  value={cover.boardCorners?.carcel || '🔒 CÁRCEL'}
                  onChange={(e) => {
                    const currentCorners = cover.boardCorners || { salida: '🏁 SALIDA', carcel: '🔒 CÁRCEL', parking: '🅿️ PARKING', irCarcel: '👮 IR A CÁRCEL' };
                    updateCover('boardCorners', { ...currentCorners, carcel: e.target.value });
                  }}
                  className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Casilla Parking (Sup. Izq.)</label>
                <input
                  type="text"
                  value={cover.boardCorners?.parking || '🅿️ PARKING'}
                  onChange={(e) => {
                    const currentCorners = cover.boardCorners || { salida: '🏁 SALIDA', carcel: '🔒 CÁRCEL', parking: '🅿️ PARKING', irCarcel: '👮 IR A CÁRCEL' };
                    updateCover('boardCorners', { ...currentCorners, parking: e.target.value });
                  }}
                  className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Casilla Ir a Cárcel (Sup. Der.)</label>
                <input
                  type="text"
                  value={cover.boardCorners?.irCarcel || '👮 IR A CÁRCEL'}
                  onChange={(e) => {
                    const currentCorners = cover.boardCorners || { salida: '🏁 SALIDA', carcel: '🔒 CÁRCEL', parking: '🅿️ PARKING', irCarcel: '👮 IR A CÁRCEL' };
                    updateCover('boardCorners', { ...currentCorners, irCarcel: e.target.value });
                  }}
                  className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* List of 28 casillas */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              Casillas del Tablero ({items.length}/28)
            </h4>
            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1.5 custom-scrollbar">
              {items.map((item, i) => {
                const barColor = item.styleOverrides?.barColor || getTypeColor(item.type);
                return (
                  <div key={item.id} className="flex flex-col gap-2 p-3 bg-[#18181f] rounded-lg border border-[#222228] hover:border-[#33333f] transition-all">
                    <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                      <span>Casilla {i + 1}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-500">Color Barra:</span>
                        <input
                          type="color"
                          value={barColor}
                          onChange={(e) => updateItem(item.id, { 
                            styleOverrides: { ...item.styleOverrides, barColor: e.target.value } 
                          })}
                          className="w-5 h-5 rounded-full border border-zinc-700 cursor-pointer overflow-hidden bg-transparent"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      value={item.title || ''}
                      onChange={(e) => updateItem(item.id, { title: e.target.value })}
                      placeholder="Nombre de Casilla"
                      className="w-full p-2 bg-[#111115] text-zinc-200 border border-[#222228] rounded text-xs focus:outline-none"
                    />
                    <select
                      value={item.type}
                      onChange={(e) => updateItem(item.id, { type: e.target.value })}
                      className="w-full p-2 bg-[#111115] text-zinc-200 border border-[#222228] rounded text-xs focus:outline-none"
                    >
                      <option value="property">🏢 Propiedad</option>
                      <option value="chance">🍀 Suerte</option>
                      <option value="community">💼 Conserjería</option>
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // 2. GLOBAL SETTINGS SIDEBAR
  if (!selectedItem) {
    const handleCategoryColorChange = (catId: string, color: string) => {
      const currentOverrides = themeOverrides.categories || {};
      const newCategoryOverrides = {
        ...currentOverrides,
        [catId]: {
          ...currentOverrides[catId],
          background: color,
          borderColor: color
        }
      };
      updateThemeSetting('themeOverrides', {
        ...themeOverrides,
        categories: newCategoryOverrides
      });
    };

    return (
      <aside className="w-80 h-full bg-[#111115] border-l border-[#222228] text-white flex flex-col no-print z-10">
        <div className="p-5 font-black text-lg border-b border-[#222228] tracking-wider uppercase text-zinc-100">
          Ajustes Globales
        </div>
        
        <div className="p-6 flex flex-col gap-6 overflow-y-auto flex-1 custom-scrollbar">
          {/* Game Type (Template Selector) */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Tipo de Juego
            </h4>
            <select
              value={templateId}
              onChange={(e) => setTemplate(e.target.value)}
              className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none"
            >
              <option value="fiasco">🎭 Party Game (Fiasco)</option>
              <option value="battle_cards">⚔️ TCG (Juego de Cartas)</option>
              <option value="hidden_roles">🕵️ Roles Ocultos</option>
              <option value="monopoly">🎲 Casillas de Tablero</option>
              <option value="drinking_game">🍻 Juego de Beber (Party)</option>
              <option value="couples_game">❤️ Juego de Parejas</option>
              <option value="friends_game">💬 Juego de Amigos (Confesión)</option>
            </select>
          </div>

          {/* Visual Themes */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              Tema Visual
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(THEMES).map(([tid, t]) => {
                const isActive = themeId === tid;
                return (
                  <button
                    key={tid}
                    onClick={() => setTheme(tid)}
                    className={`py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#4f46e5] border-[#4f46e5] text-white shadow-md'
                        : 'bg-[#18181f]/40 border-[#222228] hover:border-[#33333f] text-zinc-300'
                    }`}
                  >
                    <span className="mr-1">{t.preview}</span> {t.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Colors */}
          {tpl && tpl.itemTemplates && (
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.63-.77 1.63-1.7 0-.44-.18-.85-.47-1.17-.29-.3-.46-.72-.46-1.18 0-.92.75-1.66 1.67-1.66H16c3.3 0 6-2.7 6-6 0-4.96-4.49-9-10-9z"/></svg>
                Colores de Categorías
              </h4>
              <div className="flex flex-col gap-3">
                {Object.entries(tpl.itemTemplates).map(([catId, catConfig]: [string, any]) => {
                  const defaultCat = catConfig.defaultCategory || 'question';
                  const catThemeOverrides = themeOverrides.categories?.[catId] || {};
                  const currentCatStyle = catThemeOverrides.background 
                    ? catThemeOverrides 
                    : (activeTheme.categories[catId] || activeTheme.categories[defaultCat] || {});
                  const currentBg = currentCatStyle.background || activeTheme.colors.primary;
                  const bgHex = currentBg.startsWith('#') ? currentBg : '#888888';

                  return (
                    <div key={catId} className="flex items-center justify-between gap-4">
                      <span className="text-sm text-zinc-300">{catConfig.name}</span>
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#33333f] cursor-pointer">
                        <input
                          type="color"
                          value={bgHex}
                          onChange={(e) => handleCategoryColorChange(catId, e.target.value)}
                          className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer opacity-0"
                          style={{ WebkitAppearance: 'none' }}
                        />
                        <div className="w-full h-full" style={{ background: bgHex }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Back Customization */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Configuración del Reverso
            </h4>
            
            <label className="text-xs text-zinc-400 block mb-1.5">Color del Reverso</label>
            <select
              value={backStyle}
              onChange={(e) => updateThemeSetting('backStyle', e.target.value)}
              className="w-full mb-3 p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none"
            >
              <option value="matching">Coincidir con color de carta (Dinámico)</option>
              <option value="static">Color de reverso único (Estático)</option>
            </select>

            {backStyle === 'static' && (
              <div className="mb-3">
                <label className="text-xs text-zinc-400 block mb-1.5">Color de Reverso Estático</label>
                <div className="relative w-full h-10 rounded-lg overflow-hidden border border-[#222228] cursor-pointer">
                  <input
                    type="color"
                    value={backColor}
                    onChange={(e) => updateThemeSetting('backColor', e.target.value)}
                    className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer opacity-0"
                  />
                  <div className="w-full h-full flex items-center justify-center text-xs font-semibold" style={{ background: backColor }}>
                    {backColor}
                  </div>
                </div>
              </div>
            )}

            <label className="text-xs text-zinc-400 block mb-1.5">Diseño del Reverso</label>
            <select
              value={backDesign}
              onChange={(e) => updateThemeSetting('backDesign', e.target.value)}
              className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none"
            >
              <option value="classic">Clásico (con Iconos/Emojis)</option>
              <option value="minimal">Minimalista (solo texto)</option>
              <option value="empty">Limpio (solo color)</option>
            </select>
          </div>

          {/* Game Information */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Información del Juego
            </h4>
            
            <label className="text-xs text-zinc-400 block mb-1.5">Título del Juego</label>
            <input
              type="text"
              value={cover.title}
              onChange={(e) => updateCover('title', e.target.value)}
              className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none mb-3"
            />

            <label className="text-xs text-zinc-400 block mb-1.5">Subtítulo</label>
            <input
              type="text"
              value={cover.subtitle}
              onChange={(e) => updateCover('subtitle', e.target.value)}
              className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none mb-3"
            />

            <label className="text-xs text-zinc-400 block mb-1.5 mt-3">Autor</label>
            <input
              type="text"
              value={cover.author}
              onChange={(e) => updateCover('author', e.target.value)}
              className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none mb-3"
            />

            <label className="text-xs text-zinc-400 block mb-1.5">Imagen de Portada</label>
            <div className="flex flex-col gap-2 mb-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, true)}
                className="text-xs text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#18181f] file:text-zinc-200 hover:file:bg-[#222228] cursor-pointer"
              />
              <input
                type="text"
                value={cover.image || ''}
                onChange={(e) => updateCover('image', e.target.value)}
                placeholder="O introduce una URL de imagen..."
                className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none"
              />
            </div>

            <label className="text-xs text-zinc-400 block mb-1.5">Reglas del Juego (Manual)</label>
            <textarea
              rows={5}
              value={rules.content}
              onChange={(e) => updateRules(e.target.value)}
              placeholder="Escribe las reglas aquí..."
              className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none font-sans"
            />
          </div>

          {/* Opciones de Impresión */}
          <div className="border-t border-[#222228] pt-4 mt-2">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/><rect x="6" y="2" width="12" height="6"/></svg>
              Opciones de Impresión
            </h4>
            
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer text-sm text-zinc-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={showCropMarks}
                  onChange={(e) => updateThemeSetting('showCropMarks', e.target.checked)}
                  className="accent-[#4f46e5]"
                />
                <span>Mostrar marcas de corte</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-sm text-zinc-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={showBleed}
                  onChange={(e) => updateThemeSetting('showBleed', e.target.checked)}
                  className="accent-[#4f46e5]"
                />
                <span>Habilitar Sangrado (Bleed 2mm)</span>
              </label>
            </div>
          </div>

          {/* Exportar */}
          <div className="border-t border-[#222228] pt-4 mt-2 flex flex-col gap-2">
            <button
              onClick={handlePrint}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#4f46e5] to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl font-bold text-sm transition-all duration-200 shadow-md shadow-[#4f46e5]/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/><rect x="6" y="2" width="12" height="6"/></svg>
              Exportar a PDF / Imprimir
            </button>
            <button
              onClick={handleSocialExport}
              className="w-full py-2.5 px-4 bg-[#18181f] hover:bg-[#222228] border border-[#33333f] hover:border-[#444455] text-zinc-300 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              Crear Preview para Compartir (PNG)
            </button>
          </div>
        </div>
      </aside>
    );
  }

  // 2. CARD SETTINGS SIDEBAR
  const itemTpl = tpl && tpl.itemTemplates ? tpl.itemTemplates[selectedItem.type] : null;
  const hasTitle = itemTpl?.zones?.some((z: any) => z.contains.includes('title'));
  const hasText = itemTpl?.zones?.some((z: any) => z.contains.includes('text') || z.contains.includes('description') || z.contains.includes('rent'));
  const hasImage = itemTpl?.zones?.some((z: any) => z.contains.includes('image'));

  const overrides = selectedItem.styleOverrides || {};
  const defaultCat = itemTpl?.defaultCategory || 'question';
  const defaultCatStyle = activeTheme.categories[selectedItem.type] || activeTheme.categories[defaultCat] || {};

  const handleCardOverride = (key: string, value: string) => {
    updateItem(selectedItem.id, {
      styleOverrides: {
        ...overrides,
        [key]: value
      }
    });
  };

  return (
    <aside className="w-80 h-full bg-[#111115] border-l border-[#222228] text-white flex flex-col no-print z-10">
      <div className="p-5 font-black text-lg border-b border-[#222228] tracking-wider uppercase text-zinc-100 flex items-center justify-between">
        <span>Propiedades de Carta</span>
      </div>

      <div className="p-6 flex flex-col gap-5 overflow-y-auto flex-1 custom-scrollbar">
        {/* Category Selector */}
        <div>
          <label className="text-xs text-zinc-400 block mb-1.5">Categoría / Tipo</label>
          <select
            value={selectedItem.type}
            onChange={(e) => updateItem(selectedItem.id, { type: e.target.value })}
            className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none"
          >
            {tpl && tpl.itemTemplates && Object.entries(tpl.itemTemplates).map(([k, v]: [string, any]) => (
              <option key={k} value={k}>{v.name}</option>
            ))}
          </select>
        </div>

        {/* Dynamic fields based on Template */}
        {itemTpl?.fields?.map((field: any) => {
          if (field.type === 'text') {
            return (
              <div key={field.id}>
                <label className="text-xs text-zinc-400 block mb-1.5">{field.label}</label>
                <input
                  type="text"
                  value={selectedItem[field.id] || ''}
                  onChange={(e) => updateItem(selectedItem.id, { [field.id]: e.target.value })}
                  className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none"
                />
              </div>
            );
          }
          if (field.type === 'textarea') {
            return (
              <div key={field.id}>
                <label className="text-xs text-zinc-400 block mb-1.5">{field.label}</label>
                <textarea
                  rows={3}
                  value={selectedItem[field.id] || ''}
                  onChange={(e) => updateItem(selectedItem.id, { [field.id]: e.target.value })}
                  className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none font-sans"
                />
                {field.id === 'text' && (
                  <div className="text-[10px] text-zinc-500 mt-1 italic leading-tight">
                    Tip: Escribe [HUECO] para dejar una línea en blanco ____ para rellenar al imprimir.
                  </div>
                )}
              </div>
            );
          }
          if (field.type === 'number') {
            return (
              <div key={field.id}>
                <label className="text-xs text-zinc-400 block mb-1.5">{field.label}</label>
                <input
                  type="number"
                  value={selectedItem[field.id] !== undefined ? selectedItem[field.id] : ''}
                  onChange={(e) => updateItem(selectedItem.id, { [field.id]: e.target.value === '' ? '' : Number(e.target.value) })}
                  className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none"
                />
              </div>
            );
          }
          if (field.type === 'select') {
            return (
              <div key={field.id}>
                <label className="text-xs text-zinc-400 block mb-1.5">{field.label}</label>
                <select
                  value={selectedItem[field.id] || ''}
                  onChange={(e) => updateItem(selectedItem.id, { [field.id]: e.target.value })}
                  className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none"
                >
                  <option value="">Seleccionar...</option>
                  {field.options?.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            );
          }
          if (field.type === 'image') {
            return (
              <div key={field.id}>
                <label className="text-xs text-zinc-400 block mb-1.5">{field.label}</label>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, false)}
                    className="text-xs text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#18181f] file:text-zinc-200 hover:file:bg-[#222228] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={selectedItem[field.id] || ''}
                    onChange={(e) => updateItem(selectedItem.id, { [field.id]: e.target.value })}
                    placeholder="O introduce una URL de imagen..."
                    className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none"
                  />
                  {selectedItem[field.id] && (
                    <img
                      src={selectedItem[field.id]}
                      alt="Preview"
                      className="w-full max-h-36 object-contain rounded-lg border border-[#222228] bg-[#000] mt-1"
                    />
                  )}
                </div>
              </div>
            );
          }
          return null;
        })}

        {/* Corner Tag override */}
        <div>
          <label className="text-xs text-zinc-400 block mb-1.5">Texto de Esquina / Etiqueta</label>
          <input
            type="text"
            value={selectedItem.cornerTag !== undefined ? selectedItem.cornerTag : ''}
            onChange={(e) => updateItem(selectedItem.id, { cornerTag: e.target.value })}
            placeholder={itemTpl?.name || 'Etiqueta'}
            className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none"
          />
          <div className="text-[10px] text-zinc-500 mt-1 italic leading-tight">
            Dejar en blanco para usar el valor por defecto: {itemTpl?.name || 'Etiqueta'}.
          </div>
        </div>

        {/* Style Overrides */}
        <div className="border-t border-[#222228] pt-4 mt-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.63-.77 1.63-1.7 0-.44-.18-.85-.47-1.17-.29-.3-.46-.72-.46-1.18 0-.92.75-1.66 1.67-1.66H16c3.3 0 6-2.7 6-6 0-4.96-4.49-9-10-9z"/></svg>
            Estilo de esta Carta
          </span>
          
          <div className="flex flex-col gap-4">
            {/* Custom Background */}
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1.5">Fondo Personalizado</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={overrides.background && overrides.background.startsWith('#') ? overrides.background : '#888888'}
                  onChange={(e) => handleCardOverride('background', e.target.value)}
                  className="w-8 h-8 rounded-full border border-[#222228] cursor-pointer"
                />
                <button
                  onClick={() => handleCardOverride('background', '')}
                  className="px-2.5 py-1 text-xs bg-[#18181f] hover:bg-[#222228] border border-[#222228] text-zinc-300 rounded cursor-pointer"
                >
                  Restaurar
                </button>
              </div>
            </div>

            {/* Custom Text Color */}
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1.5">Texto Personalizado</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={overrides.textColor && overrides.textColor.startsWith('#') ? overrides.textColor : '#ffffff'}
                  onChange={(e) => handleCardOverride('textColor', e.target.value)}
                  className="w-8 h-8 rounded-full border border-[#222228] cursor-pointer"
                />
                <button
                  onClick={() => handleCardOverride('textColor', '')}
                  className="px-2.5 py-1 text-xs bg-[#18181f] hover:bg-[#222228] border border-[#222228] text-zinc-300 rounded cursor-pointer"
                >
                  Restaurar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-[#222228] bg-[#111115]">
        <button
          onClick={() => {
            deleteItem(selectedItem.id);
            setSelectedItemId(null);
          }}
          className="w-full py-2.5 px-4 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 hover:border-red-900/50 rounded-xl text-red-400 font-semibold text-sm transition-all duration-200 cursor-pointer"
        >
          Eliminar Carta
        </button>
      </div>
    </aside>
  );
}
