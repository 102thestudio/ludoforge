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
  },
  retro: {
    name: "Retro Arcade", preview: "🕹️",
    colors: { primary: "#1a1a2e", secondary: "#16213e", accent: "#e94560", text: "#eaeaea", textLight: "#ffffff", border: "#e94560", cardBack: "#0f3460" },
    fonts: { title: "'Press Start 2P', 'Outfit', monospace", body: "'Inter', sans-serif", stats: "'Outfit', monospace", ui: "'Inter', sans-serif" },
    effects: { borderRadius: "0px", borderWidth: "2px", borderStyle: "solid", shadow: "0 0 20px rgba(233,69,96,0.3), inset 0 0 20px rgba(0,0,0,0.4)", cardPadding: "0.4cm", pattern: "none" },
    categories: {
      attack:   { background: "linear-gradient(160deg, #b71c1c, #e53935)", textColor: "#ffcdd2", icon: "💥", borderColor: "#ff5252" },
      defense:  { background: "linear-gradient(160deg, #1b5e20, #43a047)", textColor: "#c8e6c9", icon: "🛡️", borderColor: "#66bb6a" },
      magic:    { background: "linear-gradient(160deg, #4a148c, #7b1fa2)", textColor: "#e1bee7", icon: "✨", borderColor: "#ce93d8" },
      event:    { background: "linear-gradient(160deg, #e65100, #fb8c00)", textColor: "#fff3e0", icon: "⚡", borderColor: "#ffa726" },
      healing:  { background: "linear-gradient(160deg, #00695c, #26a69a)", textColor: "#b2dfdb", icon: "💚", borderColor: "#4db6ac" },
      role:     { background: "linear-gradient(160deg, #283593, #5c6bc0)", textColor: "#c5cae9", icon: "🎭", borderColor: "#7986cb" },
      property: { background: "linear-gradient(160deg, #33691e, #689f38)", textColor: "#dcedc8", icon: "🏠", borderColor: "#8bc34a" },
      question: { background: "linear-gradient(160deg, #0f3460, #1a1a2e)", textColor: "#e94560", icon: "❓", borderColor: "#e94560" },
      answer:   { background: "linear-gradient(160deg, #16213e, #1a1a2e)", textColor: "#eaeaea", icon: "💬", borderColor: "#533483" },
      action:   { background: "linear-gradient(160deg, #c62828, #e53935)", textColor: "#ffcdd2", icon: "🎯", borderColor: "#ef5350" },
      wildcard: { background: "linear-gradient(160deg, #f9a825, #fdd835)", textColor: "#1a1a2e", icon: "🃏", borderColor: "#ffee58" }
    },
    back: { background: "linear-gradient(135deg, #0f3460, #1a1a2e, #0f3460)", textColor: "#e94560", borderColor: "#e94560", pattern: "none" },
    rarity: {
      common: { glow: "none", border: "#78909c" }, uncommon: { glow: "0 0 6px #4caf50", border: "#4caf50" },
      rare: { glow: "0 0 10px #2196f3", border: "#2196f3" }, epic: { glow: "0 0 14px #9c27b0", border: "#9c27b0" },
      legendary: { glow: "0 0 18px #e94560, 0 0 36px rgba(233,69,96,0.3)", border: "#e94560" }
    }
  },
  ocean: {
    name: "Océano Profundo", preview: "🌊",
    colors: { primary: "#0a192f", secondary: "#112240", accent: "#64ffda", text: "#ccd6f6", textLight: "#ffffff", border: "#233554", cardBack: "#0a192f" },
    fonts: { title: "'Outfit', 'Helvetica Neue', sans-serif", body: "'Inter', sans-serif", stats: "'Outfit', monospace", ui: "'Inter', sans-serif" },
    effects: { borderRadius: "12px", borderWidth: "1px", borderStyle: "solid", shadow: "0 4px 20px rgba(0,0,0,0.3)", cardPadding: "0.4cm", pattern: "none" },
    categories: {
      attack:   { background: "linear-gradient(160deg, #b71c1c, #d32f2f)", textColor: "#ffcdd2", icon: "⚔️", borderColor: "#ef5350" },
      defense:  { background: "linear-gradient(160deg, #004d40, #00897b)", textColor: "#b2dfdb", icon: "🛡️", borderColor: "#26a69a" },
      magic:    { background: "linear-gradient(160deg, #1a237e, #3949ab)", textColor: "#c5cae9", icon: "✨", borderColor: "#5c6bc0" },
      event:    { background: "linear-gradient(160deg, #e65100, #f57c00)", textColor: "#fff3e0", icon: "⚡", borderColor: "#ff9800" },
      healing:  { background: "linear-gradient(160deg, #006064, #00acc1)", textColor: "#b2ebf2", icon: "💚", borderColor: "#00bcd4" },
      role:     { background: "linear-gradient(160deg, #311b92, #651fff)", textColor: "#d1c4e9", icon: "🎭", borderColor: "#7c4dff" },
      property: { background: "linear-gradient(160deg, #1b5e20, #388e3c)", textColor: "#c8e6c9", icon: "🏠", borderColor: "#4caf50" },
      question: { background: "linear-gradient(160deg, #0a192f, #112240)", textColor: "#64ffda", icon: "❓", borderColor: "#64ffda" },
      answer:   { background: "linear-gradient(160deg, #112240, #1a237e)", textColor: "#ccd6f6", icon: "💬", borderColor: "#64ffda" },
      action:   { background: "linear-gradient(160deg, #880e4f, #c2185b)", textColor: "#fce4ec", icon: "🎯", borderColor: "#e91e63" },
      wildcard: { background: "linear-gradient(160deg, #f57f17, #fbc02d)", textColor: "#1a1a2e", icon: "🃏", borderColor: "#fdd835" }
    },
    back: { background: "linear-gradient(135deg, #0a192f, #112240, #0a192f)", textColor: "#64ffda", borderColor: "#64ffda", pattern: "none" },
    rarity: {
      common: { glow: "none", border: "#546e7a" }, uncommon: { glow: "0 0 6px #26a69a", border: "#26a69a" },
      rare: { glow: "0 0 10px #42a5f5", border: "#42a5f5" }, epic: { glow: "0 0 14px #ab47bc", border: "#ab47bc" },
      legendary: { glow: "0 0 18px #64ffda, 0 0 36px rgba(100,255,218,0.3)", border: "#64ffda" }
    }
  },
  pastel: {
    name: "Pastel Suave", preview: "🎀",
    colors: { primary: "#fef9f3", secondary: "#fdf2e9", accent: "#e74c8b", text: "#4a4a4a", textLight: "#7a7a7a", border: "#f0d9c0", cardBack: "#f8e8d8" },
    fonts: { title: "'Outfit', 'Quicksand', sans-serif", body: "'Inter', 'Quicksand', sans-serif", stats: "'Inter', monospace", ui: "'Inter', sans-serif" },
    effects: { borderRadius: "16px", borderWidth: "1.5px", borderStyle: "solid", shadow: "0 2px 12px rgba(0,0,0,0.06)", cardPadding: "0.5cm", pattern: "none" },
    categories: {
      attack:   { background: "linear-gradient(160deg, #fce4ec, #f8bbd0)", textColor: "#880e4f", icon: "⚔️", borderColor: "#f48fb1" },
      defense:  { background: "linear-gradient(160deg, #e8f5e9, #c8e6c9)", textColor: "#1b5e20", icon: "🛡️", borderColor: "#a5d6a7" },
      magic:    { background: "linear-gradient(160deg, #ede7f6, #d1c4e9)", textColor: "#4a148c", icon: "✨", borderColor: "#b39ddb" },
      event:    { background: "linear-gradient(160deg, #fff3e0, #ffe0b2)", textColor: "#e65100", icon: "⚡", borderColor: "#ffcc80" },
      healing:  { background: "linear-gradient(160deg, #e0f7fa, #b2ebf2)", textColor: "#006064", icon: "💚", borderColor: "#80deea" },
      role:     { background: "linear-gradient(160deg, #f3e5f5, #e1bee7)", textColor: "#6a1b9a", icon: "🎭", borderColor: "#ce93d8" },
      property: { background: "linear-gradient(160deg, #f1f8e9, #dcedc8)", textColor: "#33691e", icon: "🏠", borderColor: "#aed581" },
      question: { background: "linear-gradient(160deg, #fce4ec, #f8bbd0)", textColor: "#880e4f", icon: "❓", borderColor: "#f48fb1" },
      answer:   { background: "linear-gradient(160deg, #fff8e1, #ffecb3)", textColor: "#e65100", icon: "💬", borderColor: "#ffe082" },
      action:   { background: "linear-gradient(160deg, #fbe9e7, #ffccbc)", textColor: "#bf360c", icon: "🎯", borderColor: "#ffab91" },
      wildcard: { background: "linear-gradient(160deg, #fff9c4, #fff59d)", textColor: "#f57f17", icon: "🃏", borderColor: "#fff176" }
    },
    back: { background: "linear-gradient(135deg, #f8e8d8, #fdf2e9, #f8e8d8)", textColor: "#e74c8b", borderColor: "#f0d9c0", pattern: "none" },
    rarity: {
      common: { glow: "none", border: "#d7ccc8" }, uncommon: { glow: "none", border: "#a5d6a7" },
      rare: { glow: "none", border: "#90caf9" }, epic: { glow: "none", border: "#ce93d8" },
      legendary: { glow: "0 0 8px rgba(231,76,139,0.3)", border: "#e74c8b" }
    }
  },
  nature: {
    name: "Natura Viva", preview: "🌿",
    colors: { primary: "#1b2e1b", secondary: "#2d4a2d", accent: "#7cb342", text: "#e8f5e9", textLight: "#ffffff", border: "#4caf50", cardBack: "#1b2e1b" },
    fonts: { title: "'Outfit', 'Nunito', sans-serif", body: "'Inter', sans-serif", stats: "'Inter', monospace", ui: "'Inter', sans-serif" },
    effects: { borderRadius: "10px", borderWidth: "1.5px", borderStyle: "solid", shadow: "0 3px 15px rgba(0,0,0,0.25)", cardPadding: "0.4cm", pattern: "none" },
    categories: {
      attack:   { background: "linear-gradient(160deg, #b71c1c, #c62828)", textColor: "#ffcdd2", icon: "⚔️", borderColor: "#e53935" },
      defense:  { background: "linear-gradient(160deg, #1b5e20, #2e7d32)", textColor: "#c8e6c9", icon: "🛡️", borderColor: "#43a047" },
      magic:    { background: "linear-gradient(160deg, #1a237e, #283593)", textColor: "#c5cae9", icon: "✨", borderColor: "#3949ab" },
      event:    { background: "linear-gradient(160deg, #e65100, #ef6c00)", textColor: "#fff3e0", icon: "⚡", borderColor: "#f57c00" },
      healing:  { background: "linear-gradient(160deg, #004d40, #00695c)", textColor: "#b2dfdb", icon: "💚", borderColor: "#00897b" },
      role:     { background: "linear-gradient(160deg, #4a148c, #6a1b9a)", textColor: "#e1bee7", icon: "🎭", borderColor: "#8e24aa" },
      property: { background: "linear-gradient(160deg, #2e7d32, #388e3c)", textColor: "#c8e6c9", icon: "🏠", borderColor: "#4caf50" },
      question: { background: "linear-gradient(160deg, #1b2e1b, #2d4a2d)", textColor: "#7cb342", icon: "❓", borderColor: "#7cb342" },
      answer:   { background: "linear-gradient(160deg, #2d4a2d, #1b2e1b)", textColor: "#e8f5e9", icon: "💬", borderColor: "#81c784" },
      action:   { background: "linear-gradient(160deg, #bf360c, #d84315)", textColor: "#fbe9e7", icon: "🎯", borderColor: "#f4511e" },
      wildcard: { background: "linear-gradient(160deg, #f9a825, #fbc02d)", textColor: "#1b2e1b", icon: "🃏", borderColor: "#fdd835" }
    },
    back: { background: "linear-gradient(135deg, #1b2e1b, #2d4a2d, #1b2e1b)", textColor: "#7cb342", borderColor: "#4caf50", pattern: "none" },
    rarity: {
      common: { glow: "none", border: "#78909c" }, uncommon: { glow: "0 0 6px #66bb6a", border: "#66bb6a" },
      rare: { glow: "0 0 10px #42a5f5", border: "#42a5f5" }, epic: { glow: "0 0 14px #ab47bc", border: "#ab47bc" },
      legendary: { glow: "0 0 18px #7cb342, 0 0 36px rgba(124,179,66,0.3)", border: "#7cb342" }
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
