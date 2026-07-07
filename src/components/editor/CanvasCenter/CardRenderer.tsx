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
  const { templateId, cover } = useGameStore();
  const themeState = useThemeStore();
  const { selectedItemId, setSelectedItemId } = useUIStore();
  const theme = getActiveTheme(themeState.themeId, themeState.themeOverrides);

  // Render placeholder
  if (card.type === 'placeholder') {
    return <div className="card" style={{ border: '1px dashed #ccc', background: 'transparent' }} />;
  }

  const style = resolveStyle(card, theme, templateId);

  if (isBack) {
    return <CardBack card={card} style={style} theme={theme} templateId={templateId} themeState={themeState} cover={cover} />;
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
  const cardStyle = theme.effects.cardStyle || 'classic';

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

  // Render themed card based on cardStyle
  if (cardStyle === 'fullBleed' && card.image) {
    return <CardFullBleed card={card} style={style} theme={theme} border={border} boxShadow={boxShadow} isSelected={isSelected} onClick={onClick} itemTpl={itemTpl} />;
  }
  if (cardStyle === 'neonFrame' && card.image) {
    return <CardNeonFrame card={card} theme={theme} border={border} boxShadow={boxShadow} isSelected={isSelected} onClick={onClick} itemTpl={itemTpl} />;
  }
  if (cardStyle === 'minimalClean') {
    return <CardMinimalClean card={card} style={style} theme={theme} border={border} boxShadow={boxShadow} isSelected={isSelected} onClick={onClick} itemTpl={itemTpl} />;
  }
  if (cardStyle === 'boldNeon') {
    return <CardBoldNeon card={card} style={style} theme={theme} border={border} boxShadow={boxShadow} isSelected={isSelected} onClick={onClick} itemTpl={itemTpl} />;
  }
  if (cardStyle === 'softRounded' && card.image) {
    return <CardSoftRounded card={card} theme={theme} border={border} boxShadow={boxShadow} isSelected={isSelected} onClick={onClick} itemTpl={itemTpl} />;
  }
  if (cardStyle === 'pastelFramed') {
    return <CardPastelFramed card={card} style={style} theme={theme} border={border} boxShadow={boxShadow} isSelected={isSelected} onClick={onClick} itemTpl={itemTpl} />;
  }
  if (cardStyle === 'organicFull' && card.image) {
    return <CardOrganicFull card={card} theme={theme} border={border} boxShadow={boxShadow} isSelected={isSelected} onClick={onClick} itemTpl={itemTpl} />;
  }

  const zones = itemTpl.zones || [];

  // Custom layout for Poker cards
  if ((templateId === 'poker' || templateId === 'spanish_deck') && card.type === 'card') {
    const rankFontSize = card.rank && card.rank.length > 1 ? '12pt' : '16pt';
    const suitColor = (s: string) => {
      if (s === '♥' || s === '♦') return '#cc0000';
      if (s === '♠' || s === '♣') return '#000';
      return '#000';
    };
    const color = suitColor(card.suit || '');

    return (
      <div
        className={`card ${isSelected ? 'editing' : ''}`}
        onClick={onClick}
        style={{
          background: '#FFFFFF',
          color: color,
          border: border,
          borderRadius: theme.effects.borderRadius,
          boxShadow: boxShadow,
          padding: '0.2cm',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          fontFamily: "'Inter', sans-serif"
        }}
      >
        {/* Top-left corner: rank + suit */}
        <div style={{ position: 'absolute', top: '0.15cm', left: '0.2cm', display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1, zIndex: 2 }}>
          <span style={{ fontSize: rankFontSize, fontWeight: 900, color }}>{card.rank || 'A'}</span>
          <span style={{ fontSize: '10pt', color, marginTop: '-2px' }}>{card.suit || '♠'}</span>
        </div>

        {/* Bottom-right corner: rank + suit (inverted) */}
        <div style={{ position: 'absolute', bottom: '0.15cm', right: '0.2cm', display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1, transform: 'rotate(180deg)', zIndex: 2 }}>
          <span style={{ fontSize: rankFontSize, fontWeight: 900, color }}>{card.rank || 'A'}</span>
          <span style={{ fontSize: '10pt', color, marginTop: '-2px' }}>{card.suit || '♠'}</span>
        </div>

        {/* Center image */}
        {card.image ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', margin: '0.3cm' }}>
            <img src={card.image} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} alt="" />
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '42pt', color: color, opacity: 0.3 }}>
            {card.suit || '♠'}
          </div>
        )}
      </div>
    );
  }

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


/* ═══════════════════════════════════════════════════════════════════
   CARD STYLE VARIANTS
   ═══════════════════════════════════════════════════════════════════ */

function CardFullBleed({ card, style, theme, border, boxShadow, isSelected, onClick, itemTpl }: any) {
  return (
    <div className={`card ${isSelected ? 'editing' : ''}`} onClick={onClick} style={{
      background: '#000', color: '#fff', border, borderRadius: theme.effects.borderRadius,
      boxShadow, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer'
    }}>
      {/* Full image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src={card.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
      </div>
      {/* Gradient overlay at bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%', background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)', zIndex: 1 }} />
      {/* Title bar on top */}
      {card.title && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '0.3cm 0.3cm 0.2cm', background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)', zIndex: 2, fontFamily: theme.fonts.title, fontWeight: 800, fontSize: '10pt', textTransform: 'uppercase', letterSpacing: '1px', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
          {card.title}
        </div>
      )}
      {/* Text at bottom */}
      {card.text && (
        <div style={{ position: 'absolute', bottom: '0.2cm', left: '0.3cm', right: '0.3cm', zIndex: 2, fontFamily: theme.fonts.body, fontSize: '7pt', lineHeight: 1.3, opacity: 0.9 }}>
          {card.text}
        </div>
      )}
      {/* Category icon */}
      {style.icon && (
        <div style={{ position: 'absolute', top: '0.15cm', right: '0.15cm', fontSize: '10pt', opacity: 0.85, zIndex: 2, textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>{style.icon}</div>
      )}
      {/* Stats */}
      {card.hp !== undefined && (
        <div style={{ position: 'absolute', bottom: '0.5cm', right: '0.3cm', zIndex: 2, display: 'flex', gap: '4px' }}>
          {card.hp !== undefined && <span style={{ background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px', fontSize: '7pt', fontFamily: theme.fonts.stats }}>❤️ {card.hp}</span>}
          {card.attack !== undefined && <span style={{ background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px', fontSize: '7pt', fontFamily: theme.fonts.stats }}>⚔️ {card.attack}</span>}
        </div>
      )}
      {/* Corner tag */}
      {itemTpl.name && (
        <div style={{ position: 'absolute', bottom: '0.15cm', left: '0.15cm', fontFamily: theme.fonts.stats, fontSize: '5pt', opacity: 0.5, zIndex: 2, textTransform: 'uppercase', letterSpacing: '1px' }}>{itemTpl.name}</div>
      )}
    </div>
  );
}

function CardNeonFrame({ card, theme, border, boxShadow, isSelected, onClick, itemTpl }: any) {
  return (
    <div className={`card ${isSelected ? 'editing' : ''}`} onClick={onClick} style={{
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%)', color: '#e0e0e0',
      border: `${theme.effects.borderWidth} solid ${theme.effects.glowColor || '#00f5d4'}`,
      borderRadius: '2px', boxShadow: `${boxShadow}, inset 0 0 30px rgba(0,0,0,0.6)`,
      position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer'
    }}>
      {/* Scanlines overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,212,0.03) 2px, rgba(0,245,212,0.03) 4px)', zIndex: 3, pointerEvents: 'none' }} />
      {/* Image centered */}
      {card.image ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.3cm', zIndex: 1 }}>
          <img src={card.image} style={{ width: '100%', height: '100%', objectFit: 'cover', border: `1px solid ${theme.effects.glowColor || '#00f5d4'}`, borderRadius: '2px', boxShadow: `0 0 12px ${theme.effects.glowColor || '#00f5d4'}40` }} alt="" />
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36pt', color: theme.effects.glowColor || '#00f5d4', opacity: 0.25, zIndex: 1 }}>⚡</div>
      )}
      {/* Title bar at top */}
      {card.title && (
        <div style={{ padding: '0.15cm 0.3cm', fontFamily: theme.fonts.title, fontWeight: 800, fontSize: '8pt', textTransform: 'uppercase', letterSpacing: '2px', color: theme.effects.glowColor || '#00f5d4', textAlign: 'center', borderTop: `1px solid ${theme.effects.glowColor || '#00f5d4'}40`, zIndex: 2 }}>
          {card.title}
        </div>
      )}
      {/* Stats row */}
      {(card.hp !== undefined || card.attack !== undefined) && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '0.1cm 0.3cm', zIndex: 2 }}>
          {card.hp !== undefined && <span style={{ fontFamily: theme.fonts.stats, fontSize: '7pt', color: theme.effects.glowColor || '#00f5d4' }}>❤️ {card.hp}</span>}
          {card.attack !== undefined && <span style={{ fontFamily: theme.fonts.stats, fontSize: '7pt', color: theme.effects.glowColor || '#00f5d4' }}>⚔️ {card.attack}</span>}
        </div>
      )}
      {/* Corner tag */}
      <div style={{ position: 'absolute', top: '0.1cm', right: '0.15cm', fontFamily: theme.fonts.stats, fontSize: '5pt', opacity: 0.4, zIndex: 2, textTransform: 'uppercase', letterSpacing: '1px', color: theme.effects.glowColor || '#00f5d4' }}>{itemTpl.name}</div>
    </div>
  );
}

function CardMinimalClean({ card, style, theme, border, boxShadow, isSelected, onClick, itemTpl }: any) {
  return (
    <div className={`card ${isSelected ? 'editing' : ''}`} onClick={onClick} style={{
      background: '#ffffff', color: '#212121', border: `1px solid #e0e0e0`,
      borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      padding: '0.4cm', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '6px', cursor: 'pointer'
    }}>
      {/* Top accent line */}
      <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '3px', background: style.borderColor, borderRadius: '0 0 4px 4px' }} />
      {/* Title */}
      {card.title && (
        <div style={{ fontFamily: theme.fonts.title, fontWeight: 700, fontSize: '9pt', color: '#212121', marginTop: '4px', textAlign: 'center' }}>{card.title}</div>
      )}
      {/* Image centered, smaller */}
      {card.image && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', margin: '0 0.2cm' }}>
          <img src={card.image} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px' }} alt="" />
        </div>
      )}
      {/* Text */}
      {card.text && (
        <div style={{ fontFamily: theme.fonts.body, fontSize: '6.5pt', color: '#555', textAlign: 'center', lineHeight: 1.3 }}>{card.text}</div>
      )}
      {/* Stats subtle */}
      {(card.hp !== undefined || card.attack !== undefined) && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', fontSize: '6.5pt', fontFamily: theme.fonts.stats, color: '#757575' }}>
          {card.hp !== undefined && <span>HP {card.hp}</span>}
          {card.attack !== undefined && <span>ATK {card.attack}</span>}
        </div>
      )}
      {/* Corner tag */}
      <div style={{ position: 'absolute', bottom: '0.1cm', right: '0.15cm', fontFamily: theme.fonts.ui, fontSize: '5pt', color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{itemTpl.name}</div>
    </div>
  );
}

function CardBoldNeon({ card, style, theme, border, boxShadow, isSelected, onClick, itemTpl }: any) {
  return (
    <div className={`card ${isSelected ? 'editing' : ''}`} onClick={onClick} style={{
      background: 'linear-gradient(160deg, #0f3460 0%, #1a1a2e 100%)', color: '#eaeaea',
      border: `3px double ${theme.effects.innerBorder || '#e94560'}`,
      borderRadius: '4px', boxShadow: `0 0 25px ${theme.effects.glowColor || '#e94560'}40, inset 0 0 25px rgba(0,0,0,0.5)`,
      padding: '0.3cm', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '4px', cursor: 'pointer'
    }}>
      {/* Title bar */}
      {card.title && (
        <div style={{ fontFamily: theme.fonts.title, fontWeight: 900, fontSize: '7pt', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center', padding: '0.1cm 0', borderBottom: `2px solid ${theme.effects.innerBorder || '#e94560'}`, color: theme.effects.innerBorder || '#e94560' }}>
          {card.title}
        </div>
      )}
      {/* Image */}
      {card.image ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: `1px solid ${theme.effects.innerBorder || '#e94560'}40`, borderRadius: '2px', margin: '2px 0' }}>
          <img src={card.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32pt', color: theme.effects.innerBorder || '#e94560', opacity: 0.2 }}>🃏</div>
      )}
      {/* Text */}
      {card.text && (
        <div style={{ fontFamily: theme.fonts.body, fontSize: '6pt', textAlign: 'center', opacity: 0.8, lineHeight: 1.3, padding: '0 2px' }}>{card.text}</div>
      )}
      {/* Stats */}
      {(card.hp !== undefined || card.attack !== undefined) && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', fontSize: '6.5pt', fontFamily: theme.fonts.stats }}>
          {card.hp !== undefined && <span style={{ color: '#ff5252' }}>❤️ {card.hp}</span>}
          {card.attack !== undefined && <span style={{ color: '#ff5252' }}>⚔️ {card.attack}</span>}
        </div>
      )}
      {/* Corner tag */}
      <div style={{ position: 'absolute', bottom: '0.1cm', left: '0.15cm', fontFamily: theme.fonts.stats, fontSize: '4.5pt', opacity: 0.35, textTransform: 'uppercase', letterSpacing: '1px' }}>{itemTpl.name}</div>
    </div>
  );
}

function CardSoftRounded({ card, theme, border, boxShadow, isSelected, onClick, itemTpl }: any) {
  return (
    <div className={`card ${isSelected ? 'editing' : ''}`} onClick={onClick} style={{
      background: 'linear-gradient(180deg, #0a192f 0%, #112240 100%)', color: '#ccd6f6',
      border: '1px solid rgba(100,255,218,0.15)', borderRadius: '16px',
      boxShadow: `${boxShadow}, 0 2px 8px rgba(100,255,218,0.08)`,
      position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer'
    }}>
      {/* Image top with gradient overlay */}
      {card.image ? (
        <div style={{ position: 'relative', height: '60%', overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
          <img src={card.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(10,25,47,0.95) 100%)' }} />
        </div>
      ) : (
        <div style={{ height: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36pt', color: '#64ffda', opacity: 0.15 }}>🌊</div>
      )}
      {/* Content at bottom */}
      <div style={{ padding: '0.2cm 0.35cm', display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
        {card.title && (
          <div style={{ fontFamily: theme.fonts.title, fontWeight: 700, fontSize: '9pt', color: '#ffffff' }}>{card.title}</div>
        )}
        {card.text && (
          <div style={{ fontFamily: theme.fonts.body, fontSize: '6pt', color: '#8892b0', lineHeight: 1.3 }}>{card.text}</div>
        )}
        {(card.hp !== undefined || card.attack !== undefined) && (
          <div style={{ display: 'flex', gap: '8px', fontSize: '6.5pt', fontFamily: theme.fonts.stats, color: '#64ffda', marginTop: 'auto' }}>
            {card.hp !== undefined && <span>❤️ {card.hp}</span>}
            {card.attack !== undefined && <span>⚔️ {card.attack}</span>}
          </div>
        )}
      </div>
      {/* Corner tag */}
      <div style={{ position: 'absolute', top: '0.15cm', right: '0.2cm', fontFamily: theme.fonts.ui, fontSize: '5pt', color: '#64ffda', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{itemTpl.name}</div>
    </div>
  );
}

function CardPastelFramed({ card, style, theme, border, boxShadow, isSelected, onClick, itemTpl }: any) {
  return (
    <div className={`card ${isSelected ? 'editing' : ''}`} onClick={onClick} style={{
      background: '#fef9f3', color: '#4a4a4a',
      border: `2px solid ${theme.effects.outerBorder || '#f0d9c0'}`,
      borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer'
    }}>
      {/* Inner border */}
      <div style={{ position: 'absolute', inset: '4px', border: `1.5px solid ${theme.effects.innerBorder || '#f8bbd0'}`, borderRadius: '16px', pointerEvents: 'none', zIndex: 2 }} />
      {/* Title */}
      {card.title && (
        <div style={{ fontFamily: theme.fonts.title, fontWeight: 700, fontSize: '9pt', color: '#880e4f', textAlign: 'center', padding: '0.3cm 0.3cm 0.1cm', zIndex: 1 }}>{card.title}</div>
      )}
      {/* Image centered */}
      {card.image ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.1cm 0.4cm', zIndex: 1 }}>
          <img src={card.image} style={{ maxWidth: '90%', maxHeight: '100%', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }} alt="" />
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32pt', color: '#e74c8b', opacity: 0.15, zIndex: 1 }}>🎀</div>
      )}
      {/* Text */}
      {card.text && (
        <div style={{ fontFamily: theme.fonts.body, fontSize: '6.5pt', color: '#7a7a7a', textAlign: 'center', padding: '0 0.4cm', lineHeight: 1.3, zIndex: 1 }}>{card.text}</div>
      )}
      {/* Stats */}
      {(card.hp !== undefined || card.attack !== undefined) && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '0.15cm', zIndex: 1 }}>
          {card.hp !== undefined && <span style={{ fontSize: '6.5pt', fontFamily: theme.fonts.stats, color: '#e74c8b' }}>❤️ {card.hp}</span>}
          {card.attack !== undefined && <span style={{ fontSize: '6.5pt', fontFamily: theme.fonts.stats, color: '#e74c8b' }}>⚔️ {card.attack}</span>}
        </div>
      )}
      {/* Corner tag */}
      <div style={{ position: 'absolute', bottom: '0.15cm', right: '0.25cm', fontFamily: theme.fonts.ui, fontSize: '5pt', color: '#d7ccc8', textTransform: 'uppercase', letterSpacing: '0.5px', zIndex: 2 }}>{itemTpl.name}</div>
    </div>
  );
}

function CardOrganicFull({ card, theme, border, boxShadow, isSelected, onClick, itemTpl }: any) {
  return (
    <div className={`card ${isSelected ? 'editing' : ''}`} onClick={onClick} style={{
      background: 'linear-gradient(180deg, #1b2e1b 0%, #2d4a2d 100%)', color: '#e8f5e9',
      border: `2px solid ${theme.effects.innerBorder || '#7cb342'}`,
      borderRadius: '10px', boxShadow: `${boxShadow}, 0 0 0 1px rgba(76,175,80,0.2)`,
      position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer'
    }}>
      {/* Image fills top 65% */}
      {card.image ? (
        <div style={{ position: 'relative', height: '65%', overflow: 'hidden' }}>
          <img src={card.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(27,46,27,0.95) 100%)' }} />
          {/* Title on image */}
          {card.title && (
            <div style={{ position: 'absolute', bottom: '0.2cm', left: '0.3cm', right: '0.3cm', fontFamily: theme.fonts.title, fontWeight: 800, fontSize: '9pt', color: '#ffffff', textShadow: '0 1px 4px rgba(0,0,0,0.6)', zIndex: 2 }}>{card.title}</div>
          )}
        </div>
      ) : (
        <div style={{ height: '45%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40pt', color: '#7cb342', opacity: 0.15 }}>🌿</div>
      )}
      {/* Content at bottom */}
      <div style={{ padding: '0.15cm 0.3cm', display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
        {card.text && (
          <div style={{ fontFamily: theme.fonts.body, fontSize: '6pt', color: '#a5d6a7', lineHeight: 1.3 }}>{card.text}</div>
        )}
        {(card.hp !== undefined || card.attack !== undefined) && (
          <div style={{ display: 'flex', gap: '8px', fontSize: '6.5pt', fontFamily: theme.fonts.stats, color: '#7cb342', marginTop: 'auto' }}>
            {card.hp !== undefined && <span>❤️ {card.hp}</span>}
            {card.attack !== undefined && <span>⚔️ {card.attack}</span>}
          </div>
        )}
      </div>
      {/* Corner tag */}
      <div style={{ position: 'absolute', top: '0.15cm', right: '0.2cm', fontFamily: theme.fonts.ui, fontSize: '5pt', color: '#7cb342', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{itemTpl.name}</div>
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

function CardBack({ card, style, theme, templateId, themeState, cover }: { card: GameItem, style: any, theme: any, templateId: string, themeState: any, cover: any }) {
  let backBg = style.background;
  let backTextColor = style.textColor;
  let backBorderColor = style.borderColor;

  if (themeState.backStyle === 'static') {
    backBg = themeState.backColor || '#212121';
    backTextColor = getContrastColor(backBg);
    backBorderColor = 'rgba(255,255,255,0.15)';
  }

  const design = themeState.backDesign || 'classic';

  // Use the actual game title set by the user (cover.title), 
  // fall back to template name if no title has been set yet
  const tpl = GAME_TEMPLATES[templateId] || GAME_TEMPLATES[Object.keys(GAME_TEMPLATES)[0]];
  const gameName = (cover?.title && cover.title.trim() !== '') 
    ? cover.title 
    : (tpl?.name || 'LudoForge');

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
                {gameName}
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
