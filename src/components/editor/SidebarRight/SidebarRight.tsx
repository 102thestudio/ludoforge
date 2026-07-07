'use client';

import React from 'react';
import { useGameStore, GameItem } from '@/store/useGameStore';
import { useUIStore } from '@/store/useUIStore';
import { useThemeStore } from '@/store/useThemeStore';
import { GAME_TEMPLATES } from '@/lib/templates';
import { THEMES } from '@/lib/themes';
import html2canvas from 'html2canvas';

export function SidebarRight() {
  const { items, templateId, cover, rules, updateCover, updateRules, updateItem, deleteItem } = useGameStore();
  const { selectedItemId, setSelectedItemId, settingsTab, setSettingsTab, rightSidebarOpen, closeSidebars } = useUIStore();
  const { themeId, themeOverrides, backStyle, backColor, backDesign, showCropMarks, showBleed, setTheme, updateThemeSetting } = useThemeStore();

  const selectedItem = items.find((item) => item.id === selectedItemId);
  const tpl = GAME_TEMPLATES[templateId] || GAME_TEMPLATES[Object.keys(GAME_TEMPLATES)[0]];
  const activeTheme = THEMES[themeId] || THEMES.fantasy;

  const handlePrint = () => {
    const gameData = {
      items, templateId, cover, rules,
      themeState: { themeId, themeOverrides, backStyle, backColor, backDesign, showCropMarks, showBleed }
    };
    sessionStorage.setItem('ludoforge_print_data', JSON.stringify(gameData));
    window.open('/print', '_blank');
  };

  const handleSocialExport = async () => {
    const pageEl = document.querySelector('.page') as HTMLElement;
    if (!pageEl) { alert('No se encontró ninguna página para exportar.'); return; }
    try {
      const svgMarks = pageEl.querySelector('svg');
      if (svgMarks) svgMarks.style.display = 'none';
      const canvas = await html2canvas(pageEl, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#0a0a0c' });
      if (svgMarks) svgMarks.style.display = '';
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${cover.title || 'ludoforge-game'}-preview.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) { console.error('Error generating preview:', err); }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isCover: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (isCover) updateCover('image', dataUrl);
        else if (selectedItem) updateItem(selectedItem.id, { image: dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryColorChange = (catId: string, color: string) => {
    const currentOverrides = themeOverrides.categories || {};
    updateThemeSetting('themeOverrides', {
      ...themeOverrides,
      categories: { ...currentOverrides, [catId]: { ...currentOverrides[catId], background: color, borderColor: color } }
    });
  };

  // ── BOARD EDITOR ──
  if (selectedItemId === 'board_editor') {
    const getTypeColor = (type: string) => {
      if (type === 'property') return '#2E7D32';
      if (type === 'chance') return '#F57C00';
      if (type === 'community') return '#0288D1';
      return '#999';
    };

    return (
      <aside className="sidebar-right w-80 h-full bg-[#111115] border-l border-[#222228] text-white flex flex-col no-print z-10">
        <div className="p-5 font-black text-lg border-b border-[#222228] tracking-wider uppercase text-zinc-100">Ajustes de Tablero</div>
        <div className="p-6 flex flex-col gap-6 overflow-y-auto flex-1 custom-scrollbar">
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Escala de Texto</h4>
            <div className="flex items-center gap-3">
              <input type="range" min="0.8" max="2.0" step="0.1" value={cover.boardTextScale || 1.3} onChange={(e) => updateCover('boardTextScale', parseFloat(e.target.value))} className="flex-1 accent-[#4f46e5] h-1.5 bg-[#18181f] rounded-lg cursor-pointer" />
              <span className="text-xs font-mono font-bold bg-[#18181f] px-2 py-0.5 rounded border border-[#222228]">{cover.boardTextScale || 1.3}x</span>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Esquinas del Tablero</h4>
            <div className="flex flex-col gap-2.5">
              {([['salida', 'Salida', '🏁 SALIDA'], ['carcel', 'Cárcel', '🔒 CÁRCEL'], ['parking', 'Parking', '🅿️ PARKING'], ['irCarcel', 'Ir a Cárcel', '👮 IR A CÁRCEL']] as const).map(([key, label, val]) => (
                <div key={key}>
                  <label className="text-[11px] text-zinc-400 block mb-1">{label}</label>
                  <input type="text" value={(cover.boardCorners as any)?.[key] || val} onChange={(e) => { const cur = cover.boardCorners || { salida: '🏁 SALIDA', carcel: '🔒 CÁRCEL', parking: '🅿️ PARKING', irCarcel: '👮 IR A CÁRCEL' }; updateCover('boardCorners', { ...cur, [key]: e.target.value }); }} className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Casillas ({items.length}/28)</h4>
            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1.5 custom-scrollbar">
              {items.map((item, i) => {
                const barColor = item.styleOverrides?.barColor || getTypeColor(item.type);
                return (
                  <div key={item.id} className="flex flex-col gap-2 p-3 bg-[#18181f] rounded-lg border border-[#222228]">
                    <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                      <span>Casilla {i + 1}</span>
                      <input type="color" value={barColor} onChange={(e) => updateItem(item.id, { styleOverrides: { ...item.styleOverrides, barColor: e.target.value } })} className="w-5 h-5 rounded-full border border-zinc-700 cursor-pointer bg-transparent" />
                    </div>
                    <input type="text" value={item.title || ''} onChange={(e) => updateItem(item.id, { title: e.target.value })} placeholder="Nombre" className="w-full p-2 bg-[#111115] text-zinc-200 border border-[#222228] rounded text-xs focus:outline-none" />
                    <select value={item.type} onChange={(e) => updateItem(item.id, { type: e.target.value })} className="w-full p-2 bg-[#111115] text-zinc-200 border border-[#222228] rounded text-xs focus:outline-none">
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

  // ── CARD PROPERTIES ──
  if (selectedItem) {
    const itemTpl = tpl?.itemTemplates?.[selectedItem.type];
    const overrides = selectedItem.styleOverrides || {};

    return (
      <aside className="sidebar-right w-80 h-full bg-[#111115] border-l border-[#222228] text-white flex flex-col no-print z-10">
        <div className="p-5 font-black text-lg border-b border-[#222228] tracking-wider uppercase text-zinc-100">Propiedades de Carta</div>
        <div className="p-6 flex flex-col gap-5 overflow-y-auto flex-1 custom-scrollbar">
          <div>
            <label className="text-xs text-zinc-400 block mb-1.5">Tipo</label>
            <select value={selectedItem.type} onChange={(e) => updateItem(selectedItem.id, { type: e.target.value })} className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none">
              {tpl?.itemTemplates && Object.entries(tpl.itemTemplates).map(([k, v]: [string, any]) => (
                <option key={k} value={k}>{v.name}</option>
              ))}
            </select>
          </div>
          {itemTpl?.fields?.map((field: any) => {
            if (field.type === 'text') return (
              <div key={field.id}>
                <label className="text-xs text-zinc-400 block mb-1.5">{field.label}</label>
                <input type="text" value={selectedItem[field.id] || ''} onChange={(e) => updateItem(selectedItem.id, { [field.id]: e.target.value })} className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none" />
              </div>
            );
            if (field.type === 'textarea') return (
              <div key={field.id}>
                <label className="text-xs text-zinc-400 block mb-1.5">{field.label}</label>
                <textarea rows={3} value={selectedItem[field.id] || ''} onChange={(e) => updateItem(selectedItem.id, { [field.id]: e.target.value })} className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none font-sans" />
                {field.id === 'text' && <div className="text-[10px] text-zinc-500 mt-1 italic">Tip: Usa [HUECO] para dejar una línea en blanco.</div>}
              </div>
            );
            if (field.type === 'number') return (
              <div key={field.id}>
                <label className="text-xs text-zinc-400 block mb-1.5">{field.label}</label>
                <input type="number" value={selectedItem[field.id] !== undefined ? selectedItem[field.id] : ''} onChange={(e) => updateItem(selectedItem.id, { [field.id]: e.target.value === '' ? '' : Number(e.target.value) })} className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none" />
              </div>
            );
            if (field.type === 'select') return (
              <div key={field.id}>
                <label className="text-xs text-zinc-400 block mb-1.5">{field.label}</label>
                <select value={selectedItem[field.id] || ''} onChange={(e) => updateItem(selectedItem.id, { [field.id]: e.target.value })} className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none">
                  <option value="">Seleccionar...</option>
                  {field.options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            );
            if (field.type === 'image') return (
              <div key={field.id}>
                <label className="text-xs text-zinc-400 block mb-1.5">{field.label}</label>
                <div className="flex flex-col gap-2">
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, false)} className="text-xs text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#18181f] file:text-zinc-200 hover:file:bg-[#222228] cursor-pointer" />
                  <input type="text" value={selectedItem[field.id] || ''} onChange={(e) => updateItem(selectedItem.id, { [field.id]: e.target.value })} placeholder="URL de imagen..." className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none" />
                  {selectedItem[field.id] && <img src={selectedItem[field.id]} alt="Preview" className="w-full max-h-36 object-contain rounded-lg border border-[#222228] bg-[#000] mt-1" />}
                </div>
              </div>
            );
            return null;
          })}
          <div>
            <label className="text-xs text-zinc-400 block mb-1.5">Etiqueta de Esquina</label>
            <input type="text" value={selectedItem.cornerTag !== undefined ? selectedItem.cornerTag : ''} onChange={(e) => updateItem(selectedItem.id, { cornerTag: e.target.value })} placeholder={itemTpl?.name || 'Etiqueta'} className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none" />
          </div>
          <div className="border-t border-[#222228] pt-4">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 block">Estilo de Carta</span>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1.5">Fondo</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={overrides.background?.startsWith('#') ? overrides.background : '#888888'} onChange={(e) => updateItem(selectedItem.id, { styleOverrides: { ...overrides, background: e.target.value } })} className="w-8 h-8 rounded-full border border-[#222228] cursor-pointer" />
                  <button onClick={() => updateItem(selectedItem.id, { styleOverrides: { ...overrides, background: '' } })} className="px-2.5 py-1 text-xs bg-[#18181f] hover:bg-[#222228] border border-[#222228] text-zinc-300 rounded cursor-pointer">Restaurar</button>
                </div>
              </div>
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1.5">Texto</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={overrides.textColor?.startsWith('#') ? overrides.textColor : '#ffffff'} onChange={(e) => updateItem(selectedItem.id, { styleOverrides: { ...overrides, textColor: e.target.value } })} className="w-8 h-8 rounded-full border border-[#222228] cursor-pointer" />
                  <button onClick={() => updateItem(selectedItem.id, { styleOverrides: { ...overrides, textColor: '' } })} className="px-2.5 py-1 text-xs bg-[#18181f] hover:bg-[#222228] border border-[#222228] text-zinc-300 rounded cursor-pointer">Restaurar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-[#222228] bg-[#111115]">
          <button onClick={() => { deleteItem(selectedItem.id); setSelectedItemId(null); }} className="w-full py-2.5 px-4 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 hover:border-red-900/50 rounded-xl text-red-400 font-semibold text-sm transition-all cursor-pointer">Eliminar Carta</button>
        </div>
      </aside>
    );
  }

  // ── SETTINGS (3 tabs) ──
  const tabs = [
    { id: 'global' as const, label: 'Ajustes', icon: '⚙️' },
    { id: 'cover' as const, label: 'Portada', icon: '📄' },
    { id: 'print' as const, label: 'Imprimir', icon: '🖨️' },
  ];

  return (
    <aside className="sidebar-right w-80 h-full bg-[#111115] border-l border-[#222228] text-white flex flex-col no-print z-10">
      {/* Mobile close */}
      <button onClick={closeSidebars} className="md:hidden p-3 text-zinc-400 hover:text-white text-right">✕ Cerrar</button>

      {/* Tabs */}
      <div className="flex border-b border-[#222228]">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setSettingsTab(tab.id)} className={`flex-1 py-3 text-xs font-semibold transition-all cursor-pointer ${settingsTab === tab.id ? 'text-indigo-400 border-b-2 border-indigo-400 bg-[#18181f]/50' : 'text-zinc-500 hover:text-zinc-300'}`}>
            <span className="mr-1">{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 flex flex-col gap-6 overflow-y-auto flex-1 custom-scrollbar">

        {/* ── TAB: GLOBAL ── */}
        {settingsTab === 'global' && (
          <>
            {/* Visual Themes */}
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Tema Visual</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(THEMES).map(([tid, t]) => (
                  <button key={tid} onClick={() => setTheme(tid)} className={`py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${themeId === tid ? 'bg-[#4f46e5] border-[#4f46e5] text-white shadow-md' : 'bg-[#18181f]/40 border-[#222228] hover:border-[#33333f] text-zinc-300'}`}>
                    <span className="mr-1">{t.preview}</span> {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Colors */}
            {tpl?.itemTemplates && (
              <div>
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Colores de Categorías</h4>
                <div className="flex flex-col gap-3">
                  {Object.entries(tpl.itemTemplates).map(([catId, catConfig]: [string, any]) => {
                    const defaultCat = catConfig.defaultCategory || 'question';
                    const catThemeOverrides = themeOverrides.categories?.[catId] || {};
                    const currentCatStyle = catThemeOverrides.background ? catThemeOverrides : (activeTheme.categories[catId] || activeTheme.categories[defaultCat] || {});
                    const bgHex = (currentCatStyle.background || activeTheme.colors.primary).startsWith('#') ? (currentCatStyle.background || activeTheme.colors.primary) : '#888888';
                    return (
                      <div key={catId} className="flex items-center justify-between gap-4">
                        <span className="text-sm text-zinc-300">{catConfig.name}</span>
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#33333f] cursor-pointer">
                          <input type="color" value={bgHex} onChange={(e) => handleCategoryColorChange(catId, e.target.value)} className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer opacity-0" style={{ WebkitAppearance: 'none' }} />
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
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Reverso de Cartas</h4>
              <label className="text-xs text-zinc-400 block mb-1.5">Color del Reverso</label>
              <select value={backStyle} onChange={(e) => updateThemeSetting('backStyle', e.target.value)} className="w-full mb-3 p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none">
                <option value="matching">Dinámico (color de carta)</option>
                <option value="static">Estático (color fijo)</option>
              </select>
              {backStyle === 'static' && (
                <div className="mb-3">
                  <div className="relative w-full h-10 rounded-lg overflow-hidden border border-[#222228] cursor-pointer">
                    <input type="color" value={backColor} onChange={(e) => updateThemeSetting('backColor', e.target.value)} className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer opacity-0" />
                    <div className="w-full h-full flex items-center justify-center text-xs font-semibold" style={{ background: backColor }}>{backColor}</div>
                  </div>
                </div>
              )}
              <label className="text-xs text-zinc-400 block mb-1.5">Diseño</label>
              <select value={backDesign} onChange={(e) => updateThemeSetting('backDesign', e.target.value)} className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none">
                <option value="classic">Clásico (iconos)</option>
                <option value="minimal">Minimalista (texto)</option>
                <option value="empty">Limpio (solo color)</option>
              </select>
            </div>
          </>
        )}

        {/* ── TAB: COVER ── */}
        {settingsTab === 'cover' && (
          <>
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Información del Juego</h4>
              <label className="text-xs text-zinc-400 block mb-1.5">Título</label>
              <input type="text" value={cover.title} onChange={(e) => updateCover('title', e.target.value)} className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none mb-3" />
              <label className="text-xs text-zinc-400 block mb-1.5">Subtítulo</label>
              <input type="text" value={cover.subtitle} onChange={(e) => updateCover('subtitle', e.target.value)} className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none mb-3" />
              <label className="text-xs text-zinc-400 block mb-1.5">Autor</label>
              <input type="text" value={cover.author} onChange={(e) => updateCover('author', e.target.value)} className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none mb-3" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Imagen de Portada</h4>
              <div className="flex flex-col gap-2">
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} className="text-xs text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#18181f] file:text-zinc-200 hover:file:bg-[#222228] cursor-pointer" />
                <input type="text" value={cover.image || ''} onChange={(e) => updateCover('image', e.target.value)} placeholder="URL de imagen..." className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none" />
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Reglas del Juego</h4>
              <textarea rows={6} value={rules.content} onChange={(e) => updateRules(e.target.value)} placeholder="Escribe las reglas aquí..." className="w-full p-2 bg-[#18181f] text-zinc-200 border border-[#222228] rounded-lg text-sm focus:outline-none font-sans" />
            </div>
          </>
        )}

        {/* ── TAB: PRINT ── */}
        {settingsTab === 'print' && (
          <>
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Opciones de Impresión</h4>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer text-sm text-zinc-300 hover:text-white">
                  <input type="checkbox" checked={showCropMarks} onChange={(e) => updateThemeSetting('showCropMarks', e.target.checked)} className="accent-[#4f46e5]" />
                  <span>Mostrar marcas de corte</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer text-sm text-zinc-300 hover:text-white">
                  <input type="checkbox" checked={showBleed} onChange={(e) => updateThemeSetting('showBleed', e.target.checked)} className="accent-[#4f46e5]" />
                  <span>Habilitar Sangrado (Bleed 2mm)</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={handlePrint} className="w-full py-3 px-4 bg-gradient-to-r from-[#4f46e5] to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/><rect x="6" y="2" width="12" height="6"/></svg>
                Exportar a PDF / Imprimir
              </button>
              <button onClick={handleSocialExport} className="w-full py-2.5 px-4 bg-[#18181f] hover:bg-[#222228] border border-[#33333f] hover:border-[#444455] text-zinc-300 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                Crear Preview (PNG)
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
