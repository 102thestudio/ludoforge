export const THEMES: Record<string, any> = {
  fantasy: {
    name: "Fantasía Épica", preview: "🏰",
    colors: { primary: "#2C1810", secondary: "#F5E6D3", accent: "#D4AF37", text: "#1A1A1A", textLight: "#F5E6D3", border: "#8B7355", cardBack: "#1A1A1A" },
    fonts: { title: "'Cinzel', 'Arial Black', serif", body: "'Crimson Text', Georgia, serif", stats: "'Outfit', monospace", ui: "'Inter', sans-serif" },
    effects: { borderRadius: "4px", borderWidth: "2px", borderStyle: "solid", shadow: "0 2px 8px rgba(0,0,0,0.3)", cardPadding: "0.4cm", pattern: "none" },
    categories: {
      attack:   { background: "linear-gradient(160deg, #8B1A1A, #C0392B)", textColor: "#FFD700", icon: "⚔️", borderColor: "#FF4500" },
      defense:  { background: "linear-gradient(160deg, #1B5E20, #43A047)", textColor: "#E8F5E9", icon: "🛡️", borderColor: "#4CAF50" },
      magic:    { background: "linear-gradient(160deg, #1A237E, #5C6BC0)", textColor: "#E8EAF6", icon: "✨", borderColor: "#7C4DFF" },
      event:    { background: "linear-gradient(160deg, #E65100, #FF9800)", textColor: "#1A1A1A", icon: "⚡", borderColor: "#FF9800" },
      healing:  { background: "linear-gradient(160deg, #00695C, #26A69A)", textColor: "#E0F2F1", icon: "💚", borderColor: "#4DB6AC" },
      role:     { background: "linear-gradient(160deg, #4A148C, #AB47BC)", textColor: "#F3E5F5", icon: "🎭", borderColor: "#CE93D8" },
      property: { background: "linear-gradient(160deg, #1B5E20, #43A047)", textColor: "#FFFFFF", icon: "🏠", borderColor: "#66BB6A" },
      question: { background: "linear-gradient(160deg, #1A1A1A, #2C2C2C)", textColor: "#FFFFFF", icon: "❓", borderColor: "#D4AF37" },
      answer:   { background: "linear-gradient(160deg, #F5E6D3, #FAF8F5)", textColor: "#1A1A1A", icon: "💬", borderColor: "#8B7355" },
      action:   { background: "linear-gradient(160deg, #BF360C, #FF5722)", textColor: "#FFF3E0", icon: "🎯", borderColor: "#FF7043" },
      wildcard: { background: "linear-gradient(160deg, #F9A825, #FFEE58)", textColor: "#1A1A1A", icon: "🃏", borderColor: "#FDD835" }
    },
    back: { background: "linear-gradient(135deg, #2C1810 0%, #3E2723 50%, #2C1810 100%)", textColor: "#D4AF37", borderColor: "#D4AF37", pattern: "none" },
    rarity: {
      common: { glow: "none", border: "#888" }, uncommon: { glow: "0 0 8px #4CAF50", border: "#4CAF50" },
      rare: { glow: "0 0 12px #2196F3", border: "#2196F3" }, epic: { glow: "0 0 16px #9C27B0", border: "#9C27B0" },
      legendary: { glow: "0 0 20px #FFD700, 0 0 40px rgba(255,215,0,0.3)", border: "#FFD700" }
    }
  },
  cyberpunk: {
    name: "Cyberpunk 2099", preview: "🌆",
    colors: { primary: "#0a0a0a", secondary: "#1a1a2e", accent: "#00f5d4", text: "#e0e0e0", textLight: "#ffffff", border: "#00f5d4", cardBack: "#0a0a0a" },
    fonts: { title: "'Orbitron', 'Outfit', monospace", body: "'Share Tech Mono', 'Inter', monospace", stats: "'Outfit', monospace", ui: "'Inter', sans-serif" },
    effects: { borderRadius: "0px", borderWidth: "1px", borderStyle: "solid", shadow: "0 0 15px rgba(0,245,212,0.2), inset 0 0 30px rgba(0,0,0,0.5)", cardPadding: "0.4cm", pattern: "scanlines" },
    categories: {
      attack:   { background: "linear-gradient(160deg, #b71c1c, #f44336)", textColor: "#fff", icon: "💥", borderColor: "#ff1744" },
      defense:  { background: "linear-gradient(160deg, #004d40, #00897b)", textColor: "#a7ffeb", icon: "🔒", borderColor: "#00f5d4" },
      magic:    { background: "linear-gradient(160deg, #4a148c, #ab47bc)", textColor: "#ea80fc", icon: "⚡", borderColor: "#e040fb" },
      event:    { background: "linear-gradient(160deg, #e65100, #ff9800)", textColor: "#000", icon: "📡", borderColor: "#ffab40" },
      healing:  { background: "linear-gradient(160deg, #006064, #00acc1)", textColor: "#b2ebf2", icon: "💉", borderColor: "#00e5ff" },
      role:     { background: "linear-gradient(160deg, #311b92, #7c4dff)", textColor: "#d1c4e9", icon: "👤", borderColor: "#b388ff" },
      property: { background: "linear-gradient(160deg, #1b5e20, #4caf50)", textColor: "#c8e6c9", icon: "🏢", borderColor: "#69f0ae" },
      question: { background: "linear-gradient(160deg, #0a0a0a, #1a1a2e)", textColor: "#00f5d4", icon: "❓", borderColor: "#00f5d4" },
      answer:   { background: "linear-gradient(160deg, #1a1a2e, #16213e)", textColor: "#e0e0e0", icon: "💬", borderColor: "#00f5d4" },
      action:   { background: "linear-gradient(160deg, #880e4f, #e91e63)", textColor: "#fce4ec", icon: "⚡", borderColor: "#ff4081" },
      wildcard: { background: "linear-gradient(160deg, #f57f17, #fdd835)", textColor: "#000", icon: "🃏", borderColor: "#ffd600" }
    },
    back: { background: "linear-gradient(135deg, #0a0a0a, #1a1a2e, #0a0a0a)", textColor: "#00f5d4", borderColor: "#00f5d4", pattern: "scanlines" },
    rarity: {
      common: { glow: "none", border: "#555" }, uncommon: { glow: "0 0 8px #00f5d4", border: "#00f5d4" },
      rare: { glow: "0 0 12px #e040fb", border: "#e040fb" }, epic: { glow: "0 0 16px #ff1744", border: "#ff1744" },
      legendary: { glow: "0 0 20px #ffd600, 0 0 40px rgba(255,214,0,0.3)", border: "#ffd600" }
    }
  },
  minimal: {
    name: "Minimal Moderno", preview: "◻️",
    colors: { primary: "#ffffff", secondary: "#f5f5f5", accent: "#212121", text: "#212121", textLight: "#757575", border: "#e0e0e0", cardBack: "#212121" },
    fonts: { title: "'Outfit', 'Helvetica Neue', sans-serif", body: "'Inter', 'Helvetica Neue', sans-serif", stats: "'Inter', monospace", ui: "'Inter', sans-serif" },
    effects: { borderRadius: "8px", borderWidth: "1px", borderStyle: "solid", shadow: "0 1px 3px rgba(0,0,0,0.08)", cardPadding: "0.5cm", pattern: "none" },
    categories: {
      attack:   { background: "#FFEBEE", textColor: "#B71C1C", icon: "→", borderColor: "#EF9A9A" },
      defense:  { background: "#E8F5E9", textColor: "#1B5E20", icon: "○", borderColor: "#A5D6A7" },
      magic:    { background: "#EDE7F6", textColor: "#4A148C", icon: "◇", borderColor: "#B39DDB" },
      event:    { background: "#FFF3E0", textColor: "#E65100", icon: "△", borderColor: "#FFCC80" },
      healing:  { background: "#E0F2F1", textColor: "#004D40", icon: "+", borderColor: "#80CBC4" },
      role:     { background: "#F3E5F5", textColor: "#4A148C", icon: "◆", borderColor: "#CE93D8" },
      property: { background: "#E8F5E9", textColor: "#1B5E20", icon: "□", borderColor: "#A5D6A7" },
      question: { background: "#212121", textColor: "#FFFFFF", icon: "?", borderColor: "#424242" },
      answer:   { background: "#FAFAFA", textColor: "#212121", icon: ".", borderColor: "#E0E0E0" },
      action:   { background: "#FFF8E1", textColor: "#E65100", icon: "!", borderColor: "#FFCC80" },
      wildcard: { background: "#FFFDE7", textColor: "#F57F17", icon: "*", borderColor: "#FFF176" }
    },
    back: { background: "#212121", textColor: "#ffffff", borderColor: "#424242", pattern: "none" },
    rarity: {
      common: { glow: "none", border: "#bdbdbd" }, uncommon: { glow: "none", border: "#4CAF50" },
      rare: { glow: "none", border: "#2196F3" }, epic: { glow: "none", border: "#9C27B0" },
      legendary: { glow: "0 0 4px rgba(255,215,0,0.4)", border: "#FFC107" }
    }
  }
};

export function getActiveTheme(themeId: string, themeOverrides: any): any {
  const base = THEMES[themeId] || THEMES.fantasy;
  if (!themeOverrides || Object.keys(themeOverrides).length === 0) return base;

  const merged = JSON.parse(JSON.stringify(base));
  if (themeOverrides.colors) Object.assign(merged.colors, themeOverrides.colors);
  if (themeOverrides.fonts) Object.assign(merged.fonts, themeOverrides.fonts);
  if (themeOverrides.effects) Object.assign(merged.effects, themeOverrides.effects);
  if (themeOverrides.categories) {
    for (const [cat, style] of Object.entries(themeOverrides.categories)) {
      merged.categories[cat] = { ...(merged.categories[cat] || {}), ...(style as any) };
    }
  }
  return merged;
}

// Utilities for colors
export function getContrastColor(hexColor: string): string {
  let hex = hexColor.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#FFFFFF';
}
