import React from 'react';
import { useGameStore, GameItem } from '@/store/useGameStore';
import { useThemeStore } from '@/store/useThemeStore';
import { useUIStore } from '@/store/useUIStore';
import { GAME_TEMPLATES, LUDOFORGE_ASSETS } from '@/lib/templates';
import { THEMES, getContrastColor, getActiveTheme } from '@/lib/themes';

function getStatIcon(fieldId: string) {
  const icons: Record<string, string> = { hp: '❤️', attack: '⚔️', cost: '✨', defense: '🛡️', speed: '💨', mana: '🔮' };
  return icons[fieldId] || '•';
}

function resolveStyle(item: GameItem, theme: any, templateId: string) {
  const tpl = GAME_TEMPLATES[templateId] || GAME_TEMPLATES[Object.keys(GAME_TEMPLATES)[0]];
  const itemTpl = tpl.itemTemplates?.[item.type] || {};
  const cat = item.type || 'question';
  const defaultCat = itemTpl.defaultCategory || 'question';
  
  const catStyle = theme.categories[cat] || theme.categories[defaultCat] || {};
  const overrides = item.styleOverrides || {};
  return {
    background: overrides.background || catStyle.background || theme.colors.primary,
    textColor: overrides.textColor || catStyle.textColor || theme.colors.text,
    borderColor: overrides.borderColor || catStyle.borderColor || theme.colors.border,
    icon: catStyle.icon || ''
  };
}

export function CardRenderer({ card, isBack }: { card: GameItem, isBack?: boolean }) {
  const { templateId } = useGameStore();
  const themeState = useThemeStore();
  const { selectedItemId, setSelectedItemId } = useUIStore();
  const theme = getActiveTheme(themeState.themeId, themeState.themeOverrides);

  // Render placeholder
  if (card.type === 'placeholder') {
    return <div className="card" style={{ border: '1px dashed #ccc', background: 'transparent' }} />;
  }

  const style = resolveStyle(card, theme, templateId);

  if (isBack) {
    return <CardBack card={card} style={style} theme={theme} templateId={templateId} themeState={themeState} />;
  }

  const isSelected = selectedItemId === card.id;

  return (
    <CardFront 
      card={card} 
      style={style} 
      theme={theme} 
      templateId={templateId} 
      isSelected={isSelected}
      onClick={() => setSelectedItemId(card.id)}
    />
  );
}

function CardFront({ card, style, theme, templateId, isSelected, onClick }: { card: GameItem, style: any, theme: any, templateId: string, isSelected: boolean, onClick: () => void }) {
  const tpl = GAME_TEMPLATES[templateId] || GAME_TEMPLATES[Object.keys(GAME_TEMPLATES)[0]];
  let itemTpl = tpl.itemTemplates?.[card.type];

  if (!itemTpl) {
    itemTpl = {
      name: card.type || "Ítem",
      zones: [
        { id: "header",  type: "bar",   position: "top",    height: "15%", contains: ["title"] },
        { id: "body",    type: "text",  position: "center", height: "85%", contains: ["text"] }
      ]
    };
  }

  const rarity = card.rarity;
  const rarityStyle = rarity && theme.rarity?.[rarity] ? theme.rarity[rarity] : null;

  let border = isSelected 
    ? `3px solid var(--color-oro)` 
    : `${theme.effects.borderWidth} ${theme.effects.borderStyle} ${style.borderColor}`;
    
  let boxShadow = isSelected 
    ? `0 0 15px var(--color-oro)` 
    : theme.effects.shadow;

  if (!isSelected && rarityStyle && rarityStyle.glow && rarityStyle.glow !== 'none') {
    boxShadow = rarityStyle.glow;
    border = `${theme.effects.borderWidth} ${theme.effects.borderStyle} ${rarityStyle.border}`;
  }

  const zones = itemTpl.zones || [];

  // Custom layout for Monopoly Property cards
  if (templateId === 'monopoly' && card.type === 'property') {
    return (
      <div 
        className={`card ${isSelected ? 'editing' : ''}`}
        onClick={onClick}
        style={{
          background: '#FFFFFF',
          color: '#1A1A1A',
          border: border,
          outlineOffset: isSelected ? '-3px' : undefined,
          borderRadius: theme.effects.borderRadius,
          boxShadow: boxShadow,
          padding: '0.3cm',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          fontFamily: "'Inter', sans-serif"
        }}
      >
        {/* Color header bar */}
        <div style={{
          width: '100%',
          height: '1.2cm',
          background: style.background,
          border: '1.5px solid #1A1A1A',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          padding: '2px'
        }}>
          <span style={{ fontSize: '5pt', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#fff', fontWeight: 600 }}>Título de Propiedad</span>
          <span style={{ fontSize: '8pt', textTransform: 'uppercase', fontWeight: 'bold', color: '#fff', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '90%' }}>{card.title || 'Propiedad'}</span>
        </div>

        {/* Description / Subtitle */}
        {card.text && (
          <div style={{ fontSize: '5.5pt', color: '#555', textAlign: 'center', fontStyle: 'italic' }}>
            {card.text}
          </div>
        )}

        {/* Stats Table */}
        <div style={{ width: '100%', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '4px 0', display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '6pt', flex: 1, justifyContent: 'center' }}>
          <div className="flex justify-between"><span>Alquiler Solo:</span> <span className="font-bold">{card.rent || '2€'}</span></div>
          <div className="flex justify-between"><span>Con 1 Casa:</span> <span>{card.rentHouse1 || '10€'}</span></div>
          <div className="flex justify-between"><span>Con 2 Casas:</span> <span>{card.rentHouse2 || '30€'}</span></div>
          <div className="flex justify-between"><span>Con 3 Casas:</span> <span>{card.rentHouse3 || '90€'}</span></div>
          <div className="flex justify-between"><span>Con 4 Casas:</span> <span>{card.rentHouse4 || '160€'}</span></div>
          <div className="flex justify-between" style={{ color: '#c0392b', fontWeight: 'bold' }}><span>Con HOTEL:</span> <span>{card.rentHotel || '250€'}</span></div>
        </div>

        {/* House / Hotel Costs */}
        <div style={{ fontSize: '5pt', textAlign: 'center', color: '#444' }}>
          Las Casas cuestan {card.houseCost || '50€'} c/u
        </div>

        {/* Price at bottom */}
        <div style={{ fontStyle: 'uppercase', fontWeight: 'bold', fontSize: '8pt', color: '#1A1A1A', marginTop: 'auto' }}>
          VALOR {card.price ? `${card.price}€` : '60€'}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`card ${isSelected ? 'editing' : ''}`}
      onClick={onClick}
      style={{
        background: style.background,
        color: style.textColor,
        border: border,
        outlineOffset: isSelected ? '-3px' : undefined,
        borderRadius: theme.effects.borderRadius,
        boxShadow: boxShadow,
        padding: theme.effects.cardPadding,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        cursor: 'pointer'
      }}
    >
      {zones.map((zone: any, i: number) => (
        <ZoneRenderer key={i} zone={zone} item={card} theme={theme} />
      ))}

      {style.icon && (
        <div style={{ position: 'absolute', top: '0.15cm', right: '0.15cm', fontSize: '10pt', opacity: 0.8, zIndex: 2 }}>
          {style.icon}
        </div>
      )}
      {(card.cornerTag !== undefined ? card.cornerTag : itemTpl.name) && (
        <div className="corner-tag" style={{ fontFamily: theme.fonts.stats, zIndex: 2 }}>
          {card.cornerTag !== undefined ? card.cornerTag : itemTpl.name}
        </div>
      )}
    </div>
  );
}


function ZoneRenderer({ zone, item, theme }: { zone: any, item: GameItem, theme: any }) {
  if (zone.type === 'bar') {
    let hasContent = false;
    const parts = zone.contains.map((fieldId: string, i: number) => {
      const value = item[fieldId];
      if (value !== undefined && value !== '') {
        hasContent = true;
        if (fieldId === 'title') {
          return <span key={i} style={{ fontFamily: theme.fonts.title, fontWeight: 800, fontSize: '10pt', textTransform: 'uppercase', letterSpacing: '0.5px', flex: 1 }}>{value}</span>;
        } else if (typeof value === 'number' || ['hp', 'attack', 'cost', 'price'].includes(fieldId)) {
          return <span key={i} style={{ fontFamily: theme.fonts.stats, fontSize: '9pt', fontWeight: 600, background: 'rgba(0,0,0,0.15)', padding: '2px 6px', borderRadius: '4px', marginLeft: '4px' }}>{getStatIcon(fieldId)} {value}</span>;
        } else {
          return <span key={i} style={{ fontFamily: theme.fonts.ui, fontSize: '8pt', fontWeight: 600, opacity: 0.8 }}>{value}</span>;
        }
      }
      return null;
    });
    
    if (!hasContent) return null;
    
    return (
      <div className="zone-bar" style={{ height: zone.height || 'auto', minHeight: '15%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1, paddingBottom: '2px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        {parts}
      </div>
    );
  }

  if (zone.type === 'image') {
    const img = item.image;
    if (!img) return null;
    return (
      <div className="zone-image" style={{ height: zone.height || '35%', width: '100%', position: 'relative', zIndex: 1, overflow: 'hidden', borderRadius: theme.effects.borderRadius, boxShadow: 'inset 0 0 5px rgba(0,0,0,0.3)' }}>
        <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="card" />
      </div>
    );
  }

  if (zone.type === 'text') {
    let hasContent = false;
    const parts = zone.contains.map((fieldId: string, i: number) => {
      let value = item[fieldId];
      if (value !== undefined && value !== '') {
        hasContent = true;
        if (typeof value === 'string') {
          value = value.replace(/\[HUECO\]/g, '________');
        }
        return <div key={i} style={{ marginBottom: '4px' }}>{value}</div>;
      }
      return null;
    });

    if (!hasContent) return null;

    return (
      <div className="zone-text main-text" style={{ height: zone.height || 'auto', flex: 1, fontFamily: theme.fonts.body, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4px 0' }}>
        {parts}
      </div>
    );
  }

  return null;
}

function CardBack({ card, style, theme, templateId, themeState }: { card: GameItem, style: any, theme: any, templateId: string, themeState: any }) {
  let backBg = style.background;
  let backTextColor = style.textColor;
  let backBorderColor = style.borderColor;

  if (themeState.backStyle === 'static') {
    backBg = themeState.backColor || '#212121';
    backTextColor = getContrastColor(backBg);
    backBorderColor = 'rgba(255,255,255,0.15)';
  }

  const design = themeState.backDesign || 'classic';

  // Get the game name from the template for the card back label
  const tpl = GAME_TEMPLATES[templateId] || GAME_TEMPLATES[Object.keys(GAME_TEMPLATES)[0]];
  const gameName = tpl?.name || templateId || 'LudoForge';

  return (
    <div 
      className={`card ${card.type === 'question' ? 'card-back-question' : 'card-back-answer'}`} 
      style={{
        background: backBg, 
        color: backTextColor, 
        border: `${theme.effects.borderWidth} ${theme.effects.borderStyle} ${backBorderColor}`,
        borderRadius: theme.effects.borderRadius,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {design !== 'empty' && (
        <div style={{ fontSize: '14pt', fontWeight: 'bold', textAlign: 'center', padding: '0.3cm' }}>
          {templateId === 'fiasco' ? (
            <>
              {design === 'classic' && <div>{card.type === 'question' ? '▲' : '★'}</div>}
              <div style={{ fontSize: design === 'classic' ? '12pt' : '14pt', textAlign: 'center' }}>
                FIASCO<br/>DE GENTE
              </div>
              {design === 'classic' && <div>{card.type === 'question' ? '▼' : '★'}</div>}
            </>
          ) : (
            <>
              {design === 'classic' && (
                <div style={{ fontSize: '20pt', marginBottom: '6px', opacity: 0.7 }}>🎲</div>
              )}
              <div style={{ fontSize: '11pt', textTransform: 'uppercase', letterSpacing: '2px', lineHeight: 1.3 }}>
                {gameName}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}


export function CoverRenderer({ data }: { data: any }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', background: data.image ? `url(${data.image}) center/cover` : '#212121' }}>
      <div style={{ background: 'rgba(0,0,0,0.75)', padding: '50px', borderRadius: '12px', textAlign: 'center', color: 'white', width: '85%', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '5.5rem', margin: 0, color: '#D4AF37', lineHeight: 1.1 }}>{data.title || 'Nuevo Juego'}</h1>
        {data.subtitle && <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '2.2rem', margin: '15px 0 35px 0', fontWeight: 400, color: '#ddd' }}>{data.subtitle}</h2>}
        {data.author && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.5rem', color: '#aaa', marginTop: '40px' }}>Diseñado por: <b style={{ color: 'white' }}>{data.author}</b></p>}
      </div>
    </div>
  );
}
