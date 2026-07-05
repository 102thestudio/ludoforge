'use client';

import { useEffect } from 'react';
import { generarPaginasA4 } from '@/lib/renderUtils';
import { GAME_TEMPLATES } from '@/lib/templates';
import { THEMES, getActiveTheme } from '@/lib/themes';

// Inline card rendering for the print window - pure HTML/CSS, no React dependencies
function renderCardHTML(card: any, isBack: boolean, templateId: string, themeState: any): string {
  if (card.type === 'placeholder') {
    return `<div style="width:100%;height:100%;border:1px dashed #ccc;"></div>`;
  }

  const tpl = GAME_TEMPLATES[templateId] || GAME_TEMPLATES[Object.keys(GAME_TEMPLATES)[0]];
  const theme = getActiveTheme(themeState.themeId, themeState.themeOverrides);
  const itemTpl = tpl.itemTemplates?.[card.type] || {};
  const catStyle = theme.categories[card.type] || theme.categories[itemTpl.defaultCategory || 'question'] || {};
  const overrides = card.styleOverrides || {};

  const bg = overrides.background || catStyle.background || theme.colors.primary;
  const textColor = overrides.textColor || catStyle.textColor || theme.colors.text;
  const borderColor = overrides.borderColor || catStyle.borderColor || theme.colors.border;

  if (isBack) {
    let backBg = bg;
    let backTextColor = textColor;
    let backBorderColor = borderColor;

    if (themeState.backStyle === 'static') {
      backBg = themeState.backColor || '#212121';
      backTextColor = '#ffffff';
      backBorderColor = 'rgba(255,255,255,0.15)';
    }

    const design = themeState.backDesign || 'classic';
    const gameName = themeState.coverTitle || tpl?.name || 'LudoForge';

    if (design === 'empty') {
      return `<div style="width:100%;height:100%;background:${backBg};border:2px solid ${backBorderColor};box-sizing:border-box;"></div>`;
    }

    let icon = design === 'classic' ? '🎲' : '';
    if (templateId === 'fiasco') {
      icon = card.type === 'question' ? '▲' : '★';
    }

    return `<div style="width:100%;height:100%;background:${backBg};color:${backTextColor};border:2px solid ${backBorderColor};box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0.3cm;font-family:Arial,sans-serif;">
      ${icon ? `<div style="font-size:20pt;margin-bottom:6px;opacity:0.7;">${icon}</div>` : ''}
      <div style="font-size:11pt;font-weight:bold;text-transform:uppercase;letter-spacing:2px;line-height:1.3;">${gameName}</div>
    </div>`;
  }

  // Front card rendering
  const zones = (itemTpl.zones || []).map((zone: any) => {
    if (zone.type === 'bar') {
      const parts = zone.contains.map((fieldId: string) => {
        const value = card[fieldId];
        if (value !== undefined && value !== '') {
          if (fieldId === 'title') {
            return `<span style="font-weight:800;font-size:10pt;text-transform:uppercase;flex:1;">${value}</span>`;
          }
          return `<span style="font-size:9pt;font-weight:600;background:rgba(0,0,0,0.15);padding:2px 6px;border-radius:4px;margin-left:4px;">${value}</span>`;
        }
        return '';
      }).filter(Boolean);
      if (!parts.length) return '';
      return `<div style="display:flex;align-items:center;justify-content:space-between;min-height:15%;padding-bottom:2px;border-bottom:1px solid rgba(0,0,0,0.1);">${parts.join('')}</div>`;
    }
    if (zone.type === 'image' && card.image) {
      return `<div style="height:${zone.height || '35%'};width:100%;overflow:hidden;border-radius:4px;"><img src="${card.image}" style="width:100%;height:100%;object-fit:cover;" /></div>`;
    }
    if (zone.type === 'text') {
      const parts = zone.contains.map((fieldId: string) => {
        let value = card[fieldId];
        if (value !== undefined && value !== '') {
          if (typeof value === 'string') value = value.replace(/\[HUECO\]/g, '________');
          return `<div style="margin-bottom:4px;">${value}</div>`;
        }
        return '';
      }).filter(Boolean);
      if (!parts.length) return '';
      return `<div style="flex:1;font-family:Arial,sans-serif;font-size:10pt;display:flex;flex-direction:column;justify-content:center;padding:4px 0;">${parts.join('')}</div>`;
    }
    return '';
  }).join('');

  return `<div style="width:100%;height:100%;background:${bg};color:${textColor};border:${theme.effects.borderWidth} ${theme.effects.borderStyle} ${borderColor};border-radius:${theme.effects.borderRadius};padding:${theme.effects.cardPadding || '0.4cm'};box-sizing:border-box;display:flex;flex-direction:column;gap:4px;overflow:hidden;position:relative;font-family:Arial,sans-serif;">
    ${zones}
  </div>`;
}

function buildPrintHTML(gameData: any): string {
  const { items, templateId, cover, rules, themeState } = gameData;
  const pages = generarPaginasA4(items, templateId, cover, rules);

  const pagesHTML = pages.map((page) => {
    let content = '';

    if (page.type === 'cover') {
      const d = page.coverData || {};
      const bgStyle = d.image ? `background:url('${d.image}') center/cover no-repeat;` : 'background:#212121;';
      content = `<div style="${bgStyle}width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
        <div style="background:rgba(0,0,0,0.75);padding:50px;border-radius:12px;text-align:center;color:white;width:85%;backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.1);box-sizing:border-box;">
          <h1 style="font-family:Arial Black,sans-serif;font-size:5.5rem;margin:0;color:#D4AF37;line-height:1.1;">${d.title || 'Nuevo Juego'}</h1>
          ${d.subtitle ? `<h2 style="font-family:Arial,sans-serif;font-size:2.2rem;margin:15px 0 35px 0;font-weight:400;color:#ddd;">${d.subtitle}</h2>` : ''}
          ${d.author ? `<p style="font-family:Arial,sans-serif;font-size:1.5rem;color:#aaa;margin-top:40px;">Diseñado por: <b style="color:white;">${d.author}</b></p>` : ''}
        </div>
      </div>`;
    } else if (page.type === 'rules') {
      content = `<div style="padding:2.5cm;box-sizing:border-box;font-family:Arial,sans-serif;color:black;background:white;font-size:12pt;line-height:1.6;width:100%;height:100%;text-align:left;overflow:hidden;">${page.rulesData || ''}</div>`;
    } else if (page.type === 'grid') {
      const cols = page.cols || 3;
      const rows = page.rows || 3;
      const cards = page.cards || [];

      const cellsHTML = Array.from({ length: rows }).map((_, r) =>
        `<tr>${Array.from({ length: cols }).map((_, c) => {
          const idx = r * cols + c;
          const card = cards[idx];
          const cardHTML = card ? renderCardHTML(card, page.isBack || false, templateId, { ...themeState, coverTitle: cover?.title }) : '';
          return `<td style="width:6.3cm;height:8.8cm;padding:0;margin:0;border:0.5pt solid #CCCCCC;box-sizing:border-box;overflow:hidden;vertical-align:middle;">${cardHTML}</td>`;
        }).join('')}</tr>`
      ).join('');

      content = `<table style="width:18.9cm;height:26.4cm;position:absolute;left:1.05cm;top:1.65cm;border-collapse:collapse;border-spacing:0;margin:0;padding:0;box-sizing:border-box;table-layout:fixed;">
        <tbody>${cellsHTML}</tbody>
      </table>`;
    }

    return `<div style="width:21cm;height:29.7cm;position:relative;box-sizing:border-box;overflow:hidden;background:white;page-break-after:always;break-after:page;">
      ${content}
    </div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Imprimiendo: ${cover?.title || 'LudoForge'}</title>
  <style>
    @page { size: A4 portrait; margin: 0; }
    * { box-sizing: border-box; }
    html, body {
      margin: 0; padding: 0;
      width: 21cm;
      height: auto;
      background: white;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  </style>
</head>
<body>
${pagesHTML}
<script>
  window.onload = function() {
    setTimeout(function() {
      window.print();
      setTimeout(function() { window.close(); }, 1000);
    }, 500);
  };
<\/script>
</body>
</html>`;
}

export default function PrintPage() {
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('ludoforge_print_data');
      if (!raw) {
        document.body.innerHTML = '<p style="font-family:sans-serif;padding:2rem;">Error: No hay datos de impresión. Vuelve al editor y pulsa el botón Imprimir.</p>';
        return;
      }
      const gameData = JSON.parse(raw);
      const html = buildPrintHTML(gameData);

      const printWin = window.open('', '_blank', 'width=900,height=700');
      if (!printWin) {
        alert('El navegador bloqueó la ventana emergente. Permite las ventanas emergentes de este sitio e inténtalo de nuevo.');
        return;
      }
      printWin.document.open();
      printWin.document.write(html);
      printWin.document.close();

      // Close this intermediate page
      window.close();
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', background: '#0a0a0c', color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p>Preparando documento para imprimir...</p>
    </div>
  );
}
