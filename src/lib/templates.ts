export const GAME_TEMPLATES: Record<string, any> = {
  "battle_cards": {
    name: "Cartas Coleccionables (TCG)",
    layout: { type: "grid", cols: 3, rows: 3, itemWidth: "6.3cm", itemHeight: "8.8cm", bleed: "0cm", margin: "0cm", mirrorBack: true },
    itemTemplates: {
      "character": {
        name: "Personaje",
        defaultCategory: "attack",
        zones: [
          { id: "header",  type: "bar",   position: "top",    height: "12%", contains: ["title", "cost"] },
          { id: "artwork", type: "image", position: "middle", height: "40%", contains: ["image"] },
          { id: "body",    type: "text",  position: "center", height: "30%", contains: ["text"] },
          { id: "stats",   type: "bar",   position: "bottom", height: "10%", contains: ["hp", "attack"] }
        ],
        fields: [
          { id: "title",    type: "text",     label: "Nombre" },
          { id: "text",     type: "textarea", label: "Descripción" },
          { id: "image",    type: "image",    label: "Ilustración" },
          { id: "hp",       type: "number",   label: "Vida (HP)" },
          { id: "attack",   type: "number",   label: "Ataque" },
          { id: "cost",     type: "number",   label: "Coste" },
          { id: "rarity",   type: "select",   label: "Rareza", options: ["common","uncommon","rare","epic","legendary"] }
        ]
      },
      "spell": {
        name: "Hechizo",
        defaultCategory: "magic",
        zones: [
          { id: "header",  type: "bar",   position: "top",    height: "12%", contains: ["title", "cost"] },
          { id: "artwork", type: "image", position: "middle", height: "35%", contains: ["image"] },
          { id: "body",    type: "text",  position: "center", height: "38%", contains: ["text"] }
        ],
        fields: [
          { id: "title",    type: "text",     label: "Nombre del Hechizo" },
          { id: "text",     type: "textarea", label: "Efecto Mágico" },
          { id: "image",    type: "image",    label: "Ilustración" },
          { id: "cost",     type: "number",   label: "Coste de Maná" },
          { id: "rarity",   type: "select",   label: "Rareza", options: ["common","uncommon","rare","epic","legendary"] }
        ]
      },
      "trap": {
        name: "Trampa",
        defaultCategory: "event",
        zones: [
          { id: "header", type: "bar",  position: "top",    height: "12%", contains: ["title"] },
          { id: "body",   type: "text", position: "center", height: "70%", contains: ["text"] }
        ],
        fields: [
          { id: "title",  type: "text",     label: "Nombre de Trampa" },
          { id: "text",   type: "textarea", label: "Efecto" },
          { id: "rarity", type: "select",   label: "Rareza", options: ["common","uncommon","rare","epic","legendary"] }
        ]
      }
    }
  },
  "fiasco": {
    name: "Cartas Party",
    layout: { type: "grid", cols: 3, rows: 3, itemWidth: "6.3cm", itemHeight: "8.8cm", bleed: "0cm", margin: "0cm", mirrorBack: true },
    itemTemplates: {
      "question": {
        name: "Pregunta",
        defaultCategory: "question",
        zones: [
          { id: "body",   type: "text", position: "center", height: "80%", contains: ["text"] }
        ],
        fields: [
          { id: "text", type: "textarea", label: "Texto de la pregunta" }
        ]
      },
      "answer": {
        name: "Respuesta",
        defaultCategory: "answer",
        zones: [
          { id: "body",   type: "text", position: "center", height: "80%", contains: ["text"] }
        ],
        fields: [
          { id: "text", type: "textarea", label: "Texto de respuesta" }
        ]
      },
      "action": {
        name: "Acción / Reto",
        defaultCategory: "action",
        zones: [
          { id: "header", type: "bar",  position: "top",    height: "15%", contains: ["title"] },
          { id: "body",   type: "text", position: "center", height: "75%", contains: ["text"] }
        ],
        fields: [
          { id: "title", type: "text",     label: "Título de la acción" },
          { id: "text",  type: "textarea", label: "Instrucciones" }
        ]
      }
    }
  },
  "hidden_roles": {
    name: "Roles Ocultos",
    layout: { type: "grid", cols: 3, rows: 3, itemWidth: "6.3cm", itemHeight: "8.8cm", bleed: "0cm", margin: "0cm", mirrorBack: true },
    itemTemplates: {
      "role": {
        name: "Carta de Rol",
        defaultCategory: "role",
        zones: [
          { id: "header",  type: "bar",   position: "top",    height: "15%", contains: ["title"] },
          { id: "artwork", type: "image", position: "middle", height: "35%", contains: ["image"] },
          { id: "body",    type: "text",  position: "center", height: "35%", contains: ["text"] },
          { id: "footer",  type: "bar",   position: "bottom", height: "8%",  contains: ["faction"] }
        ],
        fields: [
          { id: "title",   type: "text",     label: "Nombre del Rol" },
          { id: "text",    type: "textarea", label: "Poder / Descripción" },
          { id: "image",   type: "image",    label: "Ilustración" },
          { id: "faction", type: "text",     label: "Bando" }
        ]
      },
      "action_card": {
        name: "Carta de Acción",
        defaultCategory: "action",
        zones: [
          { id: "header", type: "bar",  position: "top",    height: "12%", contains: ["title"] },
          { id: "body",   type: "text", position: "center", height: "78%", contains: ["text"] }
        ],
        fields: [
          { id: "title", type: "text",     label: "Nombre" },
          { id: "text",  type: "textarea", label: "Efecto" }
        ]
      }
    }
  },
  "monopoly": {
    name: "Juego de Tablero (Monopoly)",
    layout: { type: "grid", cols: 3, rows: 3, itemWidth: "6.3cm", itemHeight: "8.8cm", bleed: "0cm", margin: "0cm", mirrorBack: true },
    itemTemplates: {
      "property": {
        name: "Propiedad",
        defaultCategory: "property",
        zones: [
          { id: "header", type: "bar",  position: "top",    height: "20%", contains: ["title"] },
          { id: "body",   type: "text", position: "center", height: "60%", contains: ["text", "rent"] },
          { id: "footer", type: "bar",  position: "bottom", height: "15%", contains: ["price"] }
        ],
        fields: [
          { id: "title", type: "text",     label: "Nombre" },
          { id: "text",  type: "textarea", label: "Descripción / Color Grupo" },
          { id: "price", type: "number",   label: "Precio" },
          { id: "rent",  type: "text",     label: "Alquiler Base" },
          { id: "rentHouse1", type: "text", label: "Con 1 Casa" },
          { id: "rentHouse2", type: "text", label: "Con 2 Casas" },
          { id: "rentHouse3", type: "text", label: "Con 3 Casas" },
          { id: "rentHouse4", type: "text", label: "Con 4 Casas" },
          { id: "rentHotel", type: "text",  label: "Con Hotel" },
          { id: "houseCost", type: "text",  label: "Coste de Casa/Hotel" }
        ]
      },
      "chance": {
        name: "Suerte",
        defaultCategory: "event",
        zones: [
          { id: "body",   type: "text", position: "center", height: "90%", contains: ["text"] }
        ],
        fields: [
          { id: "text", type: "textarea", label: "Texto de la carta" }
        ]
      },
      "community": {
        name: "Caja de Comunidad",
        defaultCategory: "event",
        zones: [
          { id: "body",   type: "text", position: "center", height: "90%", contains: ["text"] }
        ],
        fields: [
          { id: "text", type: "textarea", label: "Texto de la carta" }
        ]
      }
    }
  },
  "drinking_game": {
    name: "Juego de Beber (Party)",
    layout: { type: "grid", cols: 3, rows: 3, itemWidth: "6.3cm", itemHeight: "8.8cm", bleed: "0cm", margin: "0cm", mirrorBack: true },
    itemTemplates: {
      "rule": {
        name: "Regla",
        defaultCategory: "event",
        zones: [
          { id: "header", type: "bar", position: "top", height: "15%", contains: ["title"] },
          { id: "body", type: "text", position: "center", height: "85%", contains: ["text"] }
        ],
        fields: [
          { id: "title", type: "text", label: "Nombre de la Regla" },
          { id: "text", type: "textarea", label: "Instrucciones de la Regla" }
        ]
      },
      "dare": {
        name: "Reto / Desafío",
        defaultCategory: "action",
        zones: [
          { id: "header", type: "bar", position: "top", height: "15%", contains: ["title"] },
          { id: "body", type: "text", position: "center", height: "85%", contains: ["text"] }
        ],
        fields: [
          { id: "title", type: "text", label: "Título del Reto" },
          { id: "text", type: "textarea", label: "¿Qué deben hacer?" }
        ]
      },
      "punishment": {
        name: "Castigo",
        defaultCategory: "attack",
        zones: [
          { id: "header", type: "bar", position: "top", height: "15%", contains: ["title"] },
          { id: "body", type: "text", position: "center", height: "85%", contains: ["text"] }
        ],
        fields: [
          { id: "title", type: "text", label: "Título del Castigo" },
          { id: "text", type: "textarea", label: "¿Cuántos tragos o penalización?" }
        ]
      }
    }
  },
  "couples_game": {
    name: "Juego de Parejas",
    layout: { type: "grid", cols: 3, rows: 3, itemWidth: "6.3cm", itemHeight: "8.8cm", bleed: "0cm", margin: "0cm", mirrorBack: true },
    itemTemplates: {
      "truth": {
        name: "Verdad",
        defaultCategory: "question",
        zones: [
          { id: "header", type: "bar", position: "top", height: "15%", contains: ["title"] },
          { id: "body", type: "text", position: "center", height: "85%", contains: ["text"] }
        ],
        fields: [
          { id: "title", type: "text", label: "Título" },
          { id: "text", type: "textarea", label: "Pregunta incómoda o sincera" }
        ]
      },
      "dare": {
        name: "Reto Atrevido",
        defaultCategory: "healing",
        zones: [
          { id: "header", type: "bar", position: "top", height: "15%", contains: ["title"] },
          { id: "body", type: "text", position: "center", height: "85%", contains: ["text"] }
        ],
        fields: [
          { id: "title", type: "text", label: "Título" },
          { id: "text", type: "textarea", label: "Acción o juego para la pareja" }
        ]
      },
      "deep": {
        name: "Intimidad / Conexión",
        defaultCategory: "role",
        zones: [
          { id: "header", type: "bar", position: "top", height: "15%", contains: ["title"] },
          { id: "body", type: "text", position: "center", height: "85%", contains: ["text"] }
        ],
        fields: [
          { id: "title", type: "text", label: "Tema de conversación" },
          { id: "text", type: "textarea", label: "Pregunta profunda de conexión" }
        ]
      }
    }
  },
  "friends_game": {
    name: "Juego de Amigos (Confesión)",
    layout: { type: "grid", cols: 3, rows: 3, itemWidth: "6.3cm", itemHeight: "8.8cm", bleed: "0cm", margin: "0cm", mirrorBack: true },
    itemTemplates: {
      "confession": {
        name: "Yo Nunca / Confesión",
        defaultCategory: "property",
        zones: [
          { id: "header", type: "bar", position: "top", height: "15%", contains: ["title"] },
          { id: "body", type: "text", position: "center", height: "85%", contains: ["text"] }
        ],
        fields: [
          { id: "title", type: "text", label: "Título" },
          { id: "text", type: "textarea", label: "Yo nunca... o confesión" }
        ]
      },
      "vote": {
        name: "Votación / Quién es más...",
        defaultCategory: "question",
        zones: [
          { id: "header", type: "bar", position: "top", height: "15%", contains: ["title"] },
          { id: "body", type: "text", position: "center", height: "85%", contains: ["text"] }
        ],
        fields: [
          { id: "title", type: "text", label: "Pregunta de votación" },
          { id: "text", type: "textarea", label: "¿Quién es más probable que...?" }
        ]
      },
      "dare": {
        name: "Reto de Amigos",
        defaultCategory: "wildcard",
        zones: [
          { id: "header", type: "bar", position: "top", height: "15%", contains: ["title"] },
          { id: "body", type: "text", position: "center", height: "85%", contains: ["text"] }
        ],
        fields: [
          { id: "title", type: "text", label: "Título del reto" },
          { id: "text", type: "textarea", label: "El jugador tiene que..." }
        ]
      }
    }
  }
};

export const LUDOFORGE_ASSETS: Record<string, string> = {
  "icon_sword": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%;"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"></path><path d="M13 19l6-6"></path><path d="M16 16l4 4"></path><path d="M19 21l2-2"></path><path d="M6 9l3-3"></path></svg>`,
  "icon_heart": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
  "icon_shield": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  "icon_coin": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%;"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>`
};
