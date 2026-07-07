'use client';

import React, { useMemo } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { useThemeStore } from '@/store/useThemeStore';
import { generarPaginasA4 } from '@/lib/renderUtils';
import { CardRenderer, CoverRenderer } from './CardRenderer';

import { useUIStore } from '@/store/useUIStore';

export function parseMarkdown(md: string): string {
  if (!md) return "";
  let html = md;
  
  // Titles (H1, H2, H3)
  html = html.replace(/^### (.*$)/gim, '<h3 style="font-size: 14pt; font-weight: bold; margin-top: 12px; margin-bottom: 6px; font-family: \'Outfit\', sans-serif; color: #1a1a1a;">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 style="font-size: 18pt; font-weight: 800; margin-top: 18px; margin-bottom: 8px; font-family: \'Outfit\', sans-serif; border-bottom: 1.5px solid #222; padding-bottom: 3px; color: #1a1a1a;">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 style="font-size: 22pt; font-weight: 900; margin-top: 22px; margin-bottom: 10px; font-family: \'Outfit\', sans-serif; color: #1a1a1a;">$1</h1>');
  
  // Bold (strong) and Italic (em)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Lists
  html = html.replace(/^\s*[\-\*]\s+(.*$)/gim, '<li style="margin-left: 25px; list-style-type: disc; margin-bottom: 4px; padding-left: 4px;">$1</li>');
  html = html.replace(/^\s*(\d+)\.\s+(.*$)/gim, '<li style="margin-left: 25px; list-style-type: decimal; margin-bottom: 4px; padding-left: 4px;">$2</li>');

  // Convert double newlines to paragraph tags, and single newlines to br tags
  const blocks = html.split('\n\n').map(p => {
    const trimmed = p.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<li') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol')) {
      return trimmed.replace(/\n/g, '<br>');
    }
    return `<p style="margin-bottom: 10px;">${trimmed.replace(/\n/g, '<br>')}</p>`;
  });
  
  return blocks.join('\n');
}

function CropMarks() {
  const cols = [1.05, 7.35, 13.65, 19.95];
  const rows = [1.65, 10.45, 19.25, 28.05];

  return (
    <svg 
      className="absolute inset-0 pointer-events-none w-[21cm] h-[29.7cm] print:block" 
      style={{ zIndex: 10 }}
      viewBox="0 0 210 297"
    >
      {/* Vertical crop marks (extending from top and bottom) */}
      {cols.map((x, idx) => (
        <g key={`v-${idx}`} stroke="#666666" strokeWidth="0.25">
          {/* Top marks */}
          <line x1={x * 10} y1={4} x2={x * 10} y2={12.5} />
          {/* Bottom marks */}
          <line x1={x * 10} y1={284.5} x2={x * 10} y2={293} />
        </g>
      ))}

      {/* Horizontal crop marks (extending from left and right) */}
      {rows.map((y, idx) => (
        <g key={`h-${idx}`} stroke="#666666" strokeWidth="0.25">
          {/* Left marks */}
          <line x1={2} y1={y * 10} x2={8.5} y2={y * 10} />
          {/* Right marks */}
          <line x1={201.5} y1={y * 10} x2={208} y2={y * 10} />
        </g>
      ))}
    </svg>
  );
}

export function CanvasCenter() {
  const { items, templateId, cover, rules } = useGameStore();
  const { setSelectedItemId, userPlan } = useUIStore();
  const { showCropMarks, showBleed, themeId, themeOverrides } = useThemeStore();

  const pages = useMemo(() => {
    return generarPaginasA4(items, templateId, cover, rules);
  }, [items, templateId, cover, rules, themeId, themeOverrides]);

  return (
    <div className="canvas-center w-full h-full overflow-auto bg-[#0a0a0c] p-0 flex justify-center">
      <div className="page-container">
        {pages.map((page, index) => (
          <div key={index} className="flex flex-col items-center w-full max-w-[21cm]">
            <div className="no-print font-black text-[#D4AF37] uppercase border-b-2 border-[#D4AF37] pb-1 w-full mt-2 mb-4">
              {page.label}
            </div>
            <div className="page relative">
              {/* Render crop marks if active and this is a grid page */}
              {page.type === 'grid' && showCropMarks && <CropMarks />}

              {/* Watermark for free plan */}
              {userPlan === 'FREE' && (
                <div 
                  className="absolute bottom-2.5 left-1/2 transform -translate-x-1/2 text-[9pt] font-semibold pointer-events-none z-20 flex items-center gap-1 opacity-25 select-none"
                  style={{ color: '#000000', fontFamily: "'Inter', sans-serif" }}
                >
                  🛡️ Creado gratis en LudoForge.com
                </div>
              )}

              {page.type === 'cover' && <CoverRenderer data={page.coverData} />}
              
              {page.type === 'rules' && (
                <div 
                  className="rules-page-content"
                  style={{ padding: '2.5cm', boxSizing: 'border-box', fontFamily: "'Inter', sans-serif", color: 'black', backgroundColor: 'white', fontSize: '12pt', lineHeight: '1.6', width: '100%', height: '100%', textAlign: 'left' }}
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(page.rulesData || '') }}
                />
              )}

              {page.type === 'board' && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', backgroundColor: '#F5F0E1' }}>
                  <MonopolyBoard items={items} cover={cover} onSelectCard={setSelectedItemId} />
                </div>
              )}

              {page.type === 'grid' && (
                <table className={`grid-table ${showBleed ? 'show-bleed' : ''}`}>
                  <tbody>
                    {Array.from({ length: page.rows || 3 }).map((_, r) => (
                      <tr key={r}>
                        {Array.from({ length: page.cols || 3 }).map((_, c) => {
                          const i = r * (page.cols || 3) + c;
                          const card = page.cards?.[i];
                          return (
                            <td key={c}>
                              {card && <CardRenderer card={card} isBack={page.isBack} />}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {page.type === 'album' && (
                <AlbumRenderer
                  slots={page.albumSlots || []}
                  cols={page.cols || 4}
                  rows={page.rows || 3}
                  templateId={templateId}
                  setSelectedItemId={setSelectedItemId}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getTypeColor(type: string) {
  if (type === 'property') return '#2E7D32';
  if (type === 'chance') return '#F57C00';
  if (type === 'community') return '#0288D1';
  return '#999';
}

interface MonopolyBoardProps {
  items: any[];
  cover: any;
  onSelectCard: (id: string | null) => void;
}

interface AlbumRendererProps {
  slots: any[];
  cols: number;
  rows: number;
  templateId: string;
  setSelectedItemId: (id: string | null) => void;
}

function AlbumRenderer({ slots, cols, rows, templateId, setSelectedItemId }: AlbumRendererProps) {
  const albumItemWidth = `${(18.9 / cols)}cm`;
  const albumItemHeight = `${(26.4 / rows)}cm`;

  return (
    <table className="album-table" style={{
      width: '18.9cm',
      height: '26.4cm',
      position: 'absolute',
      left: '1.05cm',
      top: '1.65cm',
      borderCollapse: 'collapse',
      borderSpacing: 0,
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      tableLayout: 'fixed'
    }}>
      <tbody>
        {Array.from({ length: rows }).map((_, r) => (
          <tr key={r}>
            {Array.from({ length: cols }).map((_, c) => {
              const i = r * cols + c;
              const slot = slots[i];
              if (!slot) return <td key={c} style={{ width: albumItemWidth, height: albumItemHeight, border: '0.5pt dashed #ddd', padding: 0, boxSizing: 'border-box' }} />;

              const isPlaceholder = slot.type === 'placeholder';
              return (
                <td
                  key={c}
                  onClick={() => !isPlaceholder && setSelectedItemId(slot.id)}
                  style={{
                    width: albumItemWidth,
                    height: albumItemHeight,
                    border: '0.5pt dashed #ccc',
                    padding: '0.15cm',
                    boxSizing: 'border-box',
                    verticalAlign: 'middle',
                    background: 'rgba(200,200,200,0.05)',
                    cursor: !isPlaceholder ? 'pointer' : 'default',
                    position: 'relative'
                  }}
                >
                  {/* Slot number */}
                  <div style={{
                    position: 'absolute',
                    top: '0.05cm',
                    left: '0.1cm',
                    fontSize: '6pt',
                    fontWeight: 800,
                    color: '#999',
                    fontFamily: "'Inter', sans-serif",
                    zIndex: 2
                  }}>
                    #{slot.number || i + 1}
                  </div>

                  {/* Title */}
                  {slot.title && (
                    <div style={{
                      position: 'absolute',
                      bottom: '0.05cm',
                      fontSize: '5.5pt',
                      color: '#888',
                      fontFamily: "'Inter', sans-serif",
                      textAlign: 'center',
                      width: '90%',
                      left: '5%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {slot.title}
                    </div>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function MonopolyBoard({ items, cover, onSelectCard }: MonopolyBoardProps) {
  const props = items.filter(it => it.title || it.text);
  const cornersData = cover?.boardCorners || {
    salida: "🏁 SALIDA",
    carcel: "🔒 CÁRCEL",
    parking: "🅿️ PARKING",
    irCarcel: "👮 IR A CÁRCEL"
  };

  const corners = [
    cornersData.salida,
    cornersData.carcel,
    cornersData.parking,
    cornersData.irCarcel
  ];

  function getCellInfo(idx: number) {
    if (idx < props.length) {
      return { 
        id: props[idx].id,
        label: props[idx].title || props[idx].text || 'Casilla', 
        color: props[idx].styleOverrides?.barColor || getTypeColor(props[idx].type) 
      };
    }
    return { id: null, label: 'Casilla ' + (idx + 1), color: '#999' };
  }

  const sideLen = 7;
  const cornerW = '3.1cm';
  const cellW = '2.057cm'; // (20.6 - 6.2) / 7

  const cornerStyles = [
    { bottom: 0, right: 0 },
    { bottom: 0, left: 0 },
    { top: 0, left: 0 },
    { top: 0, right: 0 }
  ];

  return (
    <div style={{ width: '20.6cm', height: '20.6cm', position: 'relative', border: '3px solid #2C2C2C', boxSizing: 'border-box', background: '#F5F0E1' }}>
      {/* Center */}
      <div style={{ position: 'absolute', top: '3.1cm', left: '3.1cm', right: '3.1cm', bottom: '3.1cm', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: 'linear-gradient(135deg,#F5F0E1,#E8E0D0)', border: '1px solid #ccc' }}>
        <div style={{ fontFamily: "'Outfit', 'Arial Black', sans-serif", fontSize: '2.4rem', color: '#1B5E20', textTransform: 'uppercase', letterSpacing: '3px', textAlign: 'center', padding: '20px' }}>
          {cover?.title || 'MONOPOLY'}
        </div>
        {cover?.subtitle && <div style={{ fontSize: '1rem', color: '#444', textAlign: 'center', marginTop: '2px' }}>{cover.subtitle}</div>}
        <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '8px' }}>Print & Play Edition</div>
      </div>

      {/* 4 Corners */}
      {corners.map((label, ci) => (
        <div key={ci} style={{ position: 'absolute', ...cornerStyles[ci], width: cornerW, height: cornerW, border: '1.5px solid #2C2C2C', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#E8E0D0', padding: '4px' }}>
          <span style={{ fontSize: '7pt', fontWeight: 'bold', textAlign: 'center', lineHeight: 1.2, color: '#1A1A1A' }}>{label}</span>
        </div>
      ))}

      {/* Bottom row (right to left, between corners) */}
      {Array.from({ length: sideLen }).map((_, i) => {
        const cell = getCellInfo(i);
        const right = `calc(${cornerW} + ${i} * ${cellW})`;
        return (
          <div 
            key={`bottom-${i}`} 
            onClick={() => cell.id && onSelectCard(cell.id)}
            style={{ position: 'absolute', bottom: 0, right: right, width: cellW, height: cornerW, border: '1.5px solid #2C2C2C', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: '3px', overflow: 'hidden', cursor: cell.id ? 'pointer' : 'default' }}
          >
            <div style={{ width: '100%', height: '6px', background: cell.color, borderRadius: '1px', border: '1px solid #1A1A1A' }}></div>
            <span style={{ fontSize: `calc(4.5pt * ${cover?.boardTextScale || 1.3})`, fontWeight: 600, textAlign: 'center', marginTop: '3px', lineHeight: 1.1, wordBreak: 'break-word', color: '#1A1A1A' }}>{cell.label}</span>
          </div>
        );
      })}

      {/* Left column (bottom to top) */}
      {Array.from({ length: sideLen }).map((_, i) => {
        const cell = getCellInfo(sideLen + i);
        const bottom = `calc(${cornerW} + ${i} * ${cellW})`;
        return (
          <div 
            key={`left-${i}`} 
            onClick={() => cell.id && onSelectCard(cell.id)}
            style={{ position: 'absolute', left: 0, bottom: bottom, width: cornerW, height: cellW, border: '1.5px solid #2C2C2C', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '3px', overflow: 'hidden', flexDirection: 'row', cursor: cell.id ? 'pointer' : 'default' }}
          >
            <div style={{ width: '6px', height: '100%', background: cell.color, borderRadius: '1px', border: '1px solid #1A1A1A' }}></div>
            <span style={{ fontSize: `calc(4.5pt * ${cover?.boardTextScale || 1.3})`, fontWeight: 600, textAlign: 'center', marginLeft: '3px', writingMode: 'vertical-rl', transform: 'rotate(180deg)', lineHeight: 1.1, color: '#1A1A1A' }}>{cell.label}</span>
          </div>
        );
      })}

      {/* Top row (left to right) */}
      {Array.from({ length: sideLen }).map((_, i) => {
        const cell = getCellInfo(2 * sideLen + i);
        const left = `calc(${cornerW} + ${i} * ${cellW})`;
        return (
          <div 
            key={`top-${i}`} 
            onClick={() => cell.id && onSelectCard(cell.id)}
            style={{ position: 'absolute', top: 0, left: left, width: cellW, height: cornerW, border: '1.5px solid #2C2C2C', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '3px', overflow: 'hidden', cursor: cell.id ? 'pointer' : 'default' }}
          >
            <span style={{ fontSize: `calc(4.5pt * ${cover?.boardTextScale || 1.3})`, fontWeight: 600, textAlign: 'center', marginBottom: '3px', lineHeight: 1.1, wordBreak: 'break-word', color: '#1A1A1A' }}>{cell.label}</span>
            <div style={{ width: '100%', height: '6px', background: cell.color, borderRadius: '1px', border: '1px solid #1A1A1A' }}></div>
          </div>
        );
      })}

      {/* Right column (top to bottom) */}
      {Array.from({ length: sideLen }).map((_, i) => {
        const cell = getCellInfo(3 * sideLen + i);
        const top = `calc(${cornerW} + ${i} * ${cellW})`;
        return (
          <div 
            key={`right-${i}`} 
            onClick={() => cell.id && onSelectCard(cell.id)}
            style={{ position: 'absolute', right: 0, top: top, width: cornerW, height: cellW, border: '1.5px solid #2C2C2C', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '3px', overflow: 'hidden', flexDirection: 'row', cursor: cell.id ? 'pointer' : 'default' }}
          >
            <span style={{ fontSize: `calc(4.5pt * ${cover?.boardTextScale || 1.3})`, fontWeight: 600, textAlign: 'center', marginRight: '3px', writingMode: 'vertical-rl', lineHeight: 1.1, color: '#1A1A1A' }}>{cell.label}</span>
            <div style={{ width: '6px', height: '100%', background: cell.color, borderRadius: '1px', border: '1px solid #1A1A1A' }}></div>
          </div>
        );
      })}
    </div>
  );
}


