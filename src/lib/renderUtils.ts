import { GAME_TEMPLATES } from './templates';
import { GameItem } from '../store/useGameStore';

export interface PageData {
  type: 'cover' | 'rules' | 'grid' | 'board' | 'album';
  label: string;
  // For grids
  cols?: number;
  rows?: number;
  itemWidth?: string;
  itemHeight?: string;
  cards?: GameItem[];
  isBack?: boolean;
  // For cover
  coverData?: any;
  // For rules
  rulesData?: string;
  // For album pages
  albumSlots?: GameItem[];
}

export function generarPaginasA4(items: GameItem[], templateId: string, cover: any, rules: any): PageData[] {
  const pages: PageData[] = [];
  const tpl = GAME_TEMPLATES[templateId] || GAME_TEMPLATES[Object.keys(GAME_TEMPLATES)[0]];

  // 1. Cover
  if (cover && (cover.title || cover.image)) {
    pages.push({
      type: 'cover',
      label: 'Sección: Portada',
      coverData: cover
    });
  }

  // 2. Rules
  if (rules && rules.content && rules.content.trim() !== "") {
    pages.push({
      type: 'rules',
      label: 'Sección: Reglas (Manual)',
      rulesData: rules.content
    });
  }

  // 2.5 Board (only for monopoly)
  if (templateId === 'monopoly') {
    pages.push({
      type: 'board',
      label: 'Sección: Tablero de Juego'
    });
  }

  // 3. Album (only for sticker_collection)
  if (templateId === 'sticker_collection' && items && items.length > 0) {
    const albumLayout = tpl.albumLayout || { cols: 3, rows: 3, itemWidth: "6.3cm", itemHeight: "8.8cm" };
    const slotsPerPage = albumLayout.cols * albumLayout.rows;
    const stickerItems = items.filter(it => it.type === 'sticker');
    const totalSlots = Math.max(stickerItems.length, 1);
    const numAlbumSheets = Math.ceil(totalSlots / slotsPerPage);

    for (let s = 0; s < numAlbumSheets; s++) {
      const albumSlots: GameItem[] = [];
      for (let i = 0; i < slotsPerPage; i++) {
        const slotIndex = s * slotsPerPage + i;
        if (slotIndex < stickerItems.length) {
          albumSlots.push(stickerItems[slotIndex]);
        } else {
          albumSlots.push({ id: `album-empty-${s}-${i}`, type: 'placeholder', number: slotIndex + 1 });
        }
      }
      pages.push({
        type: 'album',
        label: `Sección: Álbum - Página ${s + 1}`,
        cols: albumLayout.cols,
        rows: albumLayout.rows,
        itemWidth: albumLayout.itemWidth,
        itemHeight: albumLayout.itemHeight,
        albumSlots: albumSlots,
        isBack: false
      });
    }
  }

  // 4. Items (Front and Back)
  if (items && items.length > 0) {
    const layout = tpl.layout;
    const itemsPerPage = layout.cols * layout.rows;
    const numItems = items.length;
    const numSheets = Math.ceil(numItems / itemsPerPage);

    for (let s = 0; s < numSheets; s++) {
      // Front Page
      const frontCards: GameItem[] = [];
      for (let i = 0; i < itemsPerPage; i++) {
        const itemIndex = s * itemsPerPage + i;
        if (itemIndex < numItems) {
          frontCards.push(items[itemIndex]);
        } else {
          // Placeholder
          frontCards.push({ id: `placeholder-${s}-${i}`, type: 'placeholder' });
        }
      }

      pages.push({
        type: 'grid',
        label: `Sección: Ítems - Hoja ${s + 1} (Frontal)`,
        cols: layout.cols,
        rows: layout.rows,
        itemWidth: layout.itemWidth,
        itemHeight: layout.itemHeight,
        cards: frontCards,
        isBack: false
      });

      // Back Page
      if (layout.mirrorBack) {
        const backCards: GameItem[] = [];
        for (let i = 0; i < itemsPerPage; i++) {
          const row = Math.floor(i / layout.cols);
          const col = i % layout.cols;
          const mirroredCol = layout.cols - 1 - col;
          const mirroredIndex = s * itemsPerPage + (row * layout.cols + mirroredCol);

          if (mirroredIndex < numItems) {
            backCards.push(items[mirroredIndex]);
          } else {
            backCards.push({ id: `placeholder-back-${s}-${i}`, type: 'placeholder' });
          }
        }

        pages.push({
          type: 'grid',
          label: `Sección: Ítems - Hoja ${s + 1} (Reverso Espejo)`,
          cols: layout.cols,
          rows: layout.rows,
          itemWidth: layout.itemWidth,
          itemHeight: layout.itemHeight,
          cards: backCards,
          isBack: true
        });
      }
    }
  }

  return pages;
}
