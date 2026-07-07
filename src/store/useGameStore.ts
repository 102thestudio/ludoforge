import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface GameItem {
  id: string;
  type: string;
  title?: string;
  text?: string;
  styleOverrides?: Record<string, string>;
  [key: string]: any;
}

export interface GameState {
  templateId: string;
  cover: { 
    title: string; 
    subtitle: string; 
    author: string; 
    image: string; 
    boardCorners?: { salida: string; carcel: string; parking: string; irCarcel: string };
    boardTextScale?: number;
  };
  rules: { format: string; content: string };
  items: GameItem[];

  setTemplate: (id: string) => void;
  updateCover: (field: string, value: any) => void;
  updateRules: (content: string) => void;

  
  // Acciones basadas en ID
  addItem: (type: string) => void;
  updateItem: (id: string, updates: Partial<GameItem>) => void;
  deleteItem: (id: string) => void;
  duplicateItem: (id: string) => void;
}

export const useGameStore = create<GameState>()(
  devtools(
    persist(
      (set) => ({
        templateId: "fiasco",
        cover: { 
          title: "Fiasco de Gente", 
          subtitle: "Edición Conserjería", 
          author: "Josema & Co.", 
          image: "",
          boardCorners: { salida: "🏁 SALIDA", carcel: "🔒 CÁRCEL", parking: "🅿️ PARKING", irCarcel: "👮 IR A CÁRCEL" }
        },
        rules: { format: "markdown", content: "## Cómo Jugar\n1. El narrador lee una carta de Pregunta.\n2. Los jugadores completan el [HUECO] con sus cartas de Respuesta.\n3. La más divertida gana un punto." },
        items: [
          { id: "default-q1", type: "question", title: "Pregunta 1", text: "Chandal-Man suspende a Bolas de inmediato al ver que su calentamiento consiste en [HUECO]." },
          { id: "default-q2", type: "question", title: "Pregunta 2", text: "Einstein Deprimido detuvo la clase de Física para recordarnos que todos somos [HUECO]." },
          { id: "default-q3", type: "question", title: "Pregunta 3", text: "La última traición de Fernando el gnomo fue cambiar la marihuana de Josema por [HUECO]." },
          { id: "default-a1", type: "answer", title: "Respuesta 1", text: "Robar tizas en conserjería para combatir el 5G." },
          { id: "default-a2", type: "answer", title: "Respuesta 2", text: "Un Phoskitos caducado de la mochila de Bolas." },
          { id: "default-a3", type: "answer", title: "Respuesta 3", text: "El tupé engominado de El Guay." },
          { id: "default-a4", type: "answer", title: "Respuesta 4", text: "Masticar las hojas de la planta favorita de Josema." },
          { id: "default-a5", type: "answer", title: "Respuesta 5", text: "Un exorcismo a base de partes disciplinarios." },
          { id: "default-a6", type: "answer", title: "Respuesta 6", text: "Polvo de estrellas sin propósito en un universo frío." }
        ],

        setTemplate: (id) => set((state) => {
          let defaultItems: GameItem[] = [];
          let rulesContent = "## Cómo Jugar\nInstrucciones de este juego...";
          let coverTitle = "Nuevo Juego";

          if (id === 'fiasco') {
            coverTitle = "Fiasco de Gente";
            rulesContent = "## Cómo Jugar\n1. El narrador lee una carta de Pregunta.\n2. Los jugadores completan el [HUECO] con sus cartas de Respuesta.\n3. La más divertida gana un punto.";
            defaultItems = [
              { id: uuidv4(), type: "question", title: "Pregunta 1", text: "Chandal-Man suspende a Bolas de inmediato al ver que su calentamiento consiste en [HUECO]." },
              { id: uuidv4(), type: "question", title: "Pregunta 2", text: "Einstein Deprimido detuvo la clase de Física para recordarnos que todos somos [HUECO]." },
              { id: uuidv4(), type: "answer", title: "Respuesta 1", text: "Robar tizas en conserjería para combatir el 5G." },
              { id: uuidv4(), type: "answer", title: "Respuesta 2", text: "Un Phoskitos caducado de la mochila de Bolas." }
            ];
          } else if (id === 'battle_cards') {
            coverTitle = "Battle Cards";
            rulesContent = "## Cómo Jugar\n1. Cada jugador roba 5 cartas.\n2. Invoca personajes pagando su coste de maná.\n3. Ataca a los personajes enemigos para reducir su vida a 0.";
            defaultItems = [
              { id: uuidv4(), type: "character", title: "Gnomo Guerrero", text: "Tiene rabia interna. Al entrar en juego inflige 1 daño a un oponente.", hp: 3, attack: 2, cost: 1, rarity: "common" },
              { id: uuidv4(), type: "spell", title: "Bola de Fuego", text: "Inflige 3 puntos de daño mágico a cualquier objetivo.", cost: 2, rarity: "rare" },
              { id: uuidv4(), type: "trap", title: "Trampa Foso", text: "Destruye al primer personaje terrestre que ataque este turno.", rarity: "uncommon" }
            ];
          } else if (id === 'hidden_roles') {
            coverTitle = "Roles Ocultos";
            rulesContent = "## Cómo Jugar\n1. Cada jugador recibe un Rol Secreto.\n2. Descubre quién es de tu facción sin revelar tu identidad.\n3. Cumple el objetivo de tu bando para ganar.";
            defaultItems = [
              { id: uuidv4(), type: "role", title: "Conserje Traidor", text: "Debes sabotear la comunicación de la escuela sin que te descubran.", faction: "Traidor" },
              { id: uuidv4(), type: "action_card", title: "Espionaje", text: "Mira en secreto el rol de un jugador vecino." }
            ];
          } else if (id === 'drinking_game') {
            coverTitle = "Glop & Trago";
            rulesContent = "## Reglas de Glop\n1. Roba una carta por turno.\n2. Cumple el reto o toma los tragos indicados.\n3. Si hay una regla activa, todos deben respetarla.";
            defaultItems = [
              { id: uuidv4(), type: "rule", title: "Regla del Dedito", text: "Cada vez que alguien ponga su dedo pulgar en el borde de la mesa, el último en imitarlo bebe 1 trago." },
              { id: uuidv4(), type: "dare", title: "Cascada", text: "Empieza a beber y el de tu derecha debe comenzar. Todos beben en cadena y nadie puede parar hasta que el de su izquierda lo haga." },
              { id: uuidv4(), type: "punishment", title: "El Conductor", text: "Si tienes carné de conducir o coche propio, bebes 3 tragos." }
            ];
          } else if (id === 'couples_game') {
            coverTitle = "Conexión Íntima";
            rulesContent = "## Reglas del Juego\n1. Saca una carta alternadamente.\n2. Responde con total honestidad o haz el reto.\n3. Si completan un reto íntimo, ganan complicidad.";
            defaultItems = [
              { id: uuidv4(), type: "truth", title: "Verdad Incómoda", text: "¿Qué fue lo primero que pensaste de mí cuando nos conocimos?" },
              { id: uuidv4(), type: "dare", title: "Masaje Exprés", text: "Da un masaje de hombros a tu pareja durante 1 minuto entero." },
              { id: uuidv4(), type: "deep", title: "Sueños Compartidos", text: "¿Dónde te gustaría que viajáramos en nuestro próximo aniversario?" }
            ];
          } else if (id === 'friends_game') {
            coverTitle = "Verdades y Traiciones";
            rulesContent = "## Reglas de Amigos\n1. Roba una carta y léela en voz alta.\n2. Votad todos a la de tres señalando con el dedo.\n3. El más votado realiza el reto o confiesa.";
            defaultItems = [
              { id: uuidv4(), type: "confession", title: "El Más Rácano", text: "Yo nunca he dejado una propina de menos de 10 céntimos a propósito." },
              { id: uuidv4(), type: "vote", title: "El Dramático", text: "¿Quién es más probable que termine llorando en una fiesta por un malentendido?" },
              { id: uuidv4(), type: "dare", title: "Imitación", text: "Imita al jugador de tu izquierda (gestos, voz) hasta que sea tu próximo turno." }
            ];
          } else if (id === 'poker') {
            coverTitle = "Póker Personalizado";
            rulesContent = "## Cómo Jugar al Póker\n1. Cada jugador recibe 2 cartas.\n2. Combínalas con 5 comunitarias para formar la mejor mano.\n3. Gana la mejor combinación: pareja, trío, escalera, color, póker, escalera de color.";
            const palos = ["♠","♥","♦","♣"];
            const valores = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
            defaultItems = [];
            for (const p of palos) {
              for (const v of valores) {
                defaultItems.push({ id: uuidv4(), type: "card", rank: v, suit: p, title: `${v} ${p}` });
              }
            }
            defaultItems.push({ id: uuidv4(), type: "card", rank: "Joker", suit: "🃏", title: "Joker" });
            defaultItems.push({ id: uuidv4(), type: "card", rank: "Joker", suit: "🃏", title: "Joker" });
          } else if (id === 'spanish_deck') {
            coverTitle = "Baraja Española Personalizada";
            rulesContent = "## Cómo Jugar\n1. La baraja española tiene 48 cartas divididas en 4 palos: Oros, Copas, Espadas y Bastos.\n2. Cada palo tiene 12 cartas: del 1 al 9, Sota, Caballo y Rey.\n3. Ideal para juegos como el chinchón, la brisca, el tute o la escoba.";
            const palosEsp = ["Oros","Copas","Espadas","Bastos"];
            const valoresEsp = ["1","2","3","4","5","6","7","8","9","10","11","12"];
            defaultItems = [];
            for (const p of palosEsp) {
              for (const v of valoresEsp) {
                defaultItems.push({ id: uuidv4(), type: "card", rank: v, suit: p, title: `${v} de ${p}` });
              }
            }
          } else if (id === 'sticker_collection') {
            coverTitle = "Álbum de Cromos";
            rulesContent = "## Instrucciones\n1. Añade tantos cromos como quieras con el botón '+ Añadir Carta'.\n2. Cada cromo tiene un número único y una imagen.\n3. Las páginas del álbum se generan automáticamente.\n4. Imprime el álbum y los cromos, recórtalos y pégalos en su sitio.";
            defaultItems = [
              { id: uuidv4(), type: "sticker", number: 1, title: "Cromo 1" },
              { id: uuidv4(), type: "sticker", number: 2, title: "Cromo 2" },
              { id: uuidv4(), type: "sticker", number: 3, title: "Cromo 3" },
              { id: uuidv4(), type: "sticker", number: 4, title: "Cromo 4" },
              { id: uuidv4(), type: "sticker", number: 5, title: "Cromo 5" },
              { id: uuidv4(), type: "sticker", number: 6, title: "Cromo 6" }
            ];
          } else if (id === 'monopoly') {
            coverTitle = "Monopoly Board";
            rulesContent = "## Cómo Jugar\n1. Lanza los dados para moverte por el tablero.\n2. Compra propiedades libres.\n3. Cobra alquiler a los jugadores que caigan en tus casillas.";
            defaultItems = [
              // Lado Inferior (Marrón, Suerte, etc.)
              { id: uuidv4(), type: "property", title: "Conserjería Vieja", text: "El cuartito oscuro.", price: 60, rent: "2€", rentHouse1: "10€", rentHouse2: "30€", rentHouse3: "90€", rentHouse4: "160€", rentHotel: "250€", houseCost: "50€", styleOverrides: { barColor: "#955436" } },
              { id: uuidv4(), type: "community", title: "Conserjería", text: "Caja de Comunidad." },
              { id: uuidv4(), type: "property", title: "Conserjería Principal", text: "Zona de tizas e intrigas.", price: 80, rent: "4€", rentHouse1: "20€", rentHouse2: "60€", rentHouse3: "180€", rentHouse4: "320€", rentHotel: "450€", houseCost: "50€", styleOverrides: { barColor: "#955436" } },
              { id: uuidv4(), type: "chance", title: "Suerte", text: "¡Has robado tizas!" },
              { id: uuidv4(), type: "property", title: "Aula de Música", text: "Guitarras desafinadas.", price: 100, rent: "6€", rentHouse1: "30€", rentHouse2: "90€", rentHouse3: "270€", rentHouse4: "400€", rentHotel: "550€", houseCost: "50€", styleOverrides: { barColor: "#aae0fa" } },
              { id: uuidv4(), type: "property", title: "Aula de Dibujo", text: "Olor a disolvente.", price: 100, rent: "6€", rentHouse1: "30€", rentHouse2: "90€", rentHouse3: "270€", rentHouse4: "400€", rentHotel: "550€", houseCost: "50€", styleOverrides: { barColor: "#aae0fa" } },
              { id: uuidv4(), type: "property", title: "Aula de Plástica", text: "Témperas secas.", price: 120, rent: "8€", rentHouse1: "40€", rentHouse2: "100€", rentHouse3: "300€", rentHouse4: "450€", rentHotel: "600€", houseCost: "50€", styleOverrides: { barColor: "#aae0fa" } },
              
              // Lado Izquierdo (Rosa, Naranja)
              { id: uuidv4(), type: "property", title: "Pasillo 1ºA", text: "Huele a sudor.", price: 140, rent: "10€", rentHouse1: "50€", rentHouse2: "150€", rentHouse3: "450€", rentHouse4: "625€", rentHotel: "750€", houseCost: "100€", styleOverrides: { barColor: "#d93b96" } },
              { id: uuidv4(), type: "chance", title: "Suerte", text: "Multa por correr en el pasillo." },
              { id: uuidv4(), type: "property", title: "Pasillo 1ºB", text: "Gritos constantes.", price: 140, rent: "10€", rentHouse1: "50€", rentHouse2: "150€", rentHouse3: "450€", rentHouse4: "625€", rentHotel: "750€", houseCost: "100€", styleOverrides: { barColor: "#d93b96" } },
              { id: uuidv4(), type: "property", title: "Pasillo 1ºC", text: "Silencio incómodo.", price: 160, rent: "12€", rentHouse1: "60€", rentHouse2: "180€", rentHouse3: "500€", rentHouse4: "700€", rentHotel: "900€", houseCost: "100€", styleOverrides: { barColor: "#d93b96" } },
              { id: uuidv4(), type: "property", title: "Laboratorio Química", text: "Peligro de explosión.", price: 180, rent: "14€", rentHouse1: "70€", rentHouse2: "200€", rentHouse3: "550€", rentHouse4: "750€", rentHotel: "950€", houseCost: "100€", styleOverrides: { barColor: "#f7941d" } },
              { id: uuidv4(), type: "community", title: "Conserjería", text: "Caja de Comunidad." },
              { id: uuidv4(), type: "property", title: "Laboratorio Física", text: "Gravedad variable.", price: 200, rent: "16€", rentHouse1: "80€", rentHouse2: "220€", rentHouse3: "600€", rentHouse4: "800€", rentHotel: "1000€", houseCost: "100€", styleOverrides: { barColor: "#f7941d" } },
              
              // Lado Superior (Rojo, Amarillo)
              { id: uuidv4(), type: "property", title: "Gimnasio Interior", text: "Espalderas rotas.", price: 220, rent: "18€", rentHouse1: "90€", rentHouse2: "250€", rentHouse3: "700€", rentHouse4: "875€", rentHotel: "1050€", houseCost: "150€", styleOverrides: { barColor: "#ed1c24" } },
              { id: uuidv4(), type: "chance", title: "Suerte", text: "Te escaqueas de gimnasia." },
              { id: uuidv4(), type: "property", title: "Gimnasio Exterior", text: "Pista de cemento.", price: 220, rent: "18€", rentHouse1: "90€", rentHouse2: "250€", rentHouse3: "700€", rentHouse4: "875€", rentHotel: "1050€", houseCost: "150€", styleOverrides: { barColor: "#ed1c24" } },
              { id: uuidv4(), type: "property", title: "Vestuarios", text: "Humedad extrema.", price: 240, rent: "20€", rentHouse1: "100€", rentHouse2: "300€", rentHouse3: "750€", rentHouse4: "925€", rentHotel: "1100€", houseCost: "150€", styleOverrides: { barColor: "#ed1c24" } },
              { id: uuidv4(), type: "property", title: "Biblioteca Principal", text: "Silencio absoluto.", price: 260, rent: "22€", rentHouse1: "110€", rentHouse2: "330€", rentHouse3: "800€", rentHouse4: "975€", rentHotel: "1150€", houseCost: "150€", styleOverrides: { barColor: "#fef200" } },
              { id: uuidv4(), type: "property", title: "Biblioteca Anexa", text: "Libros polvorientos.", price: 260, rent: "22€", rentHouse1: "110€", rentHouse2: "330€", rentHouse3: "800€", rentHouse4: "975€", rentHotel: "1150€", houseCost: "150€", styleOverrides: { barColor: "#fef200" } },
              { id: uuidv4(), type: "property", title: "Sala de Estudio", text: "Exámenes finales.", price: 280, rent: "24€", rentHouse1: "120€", rentHouse2: "360€", rentHouse3: "850€", rentHouse4: "1025€", rentHotel: "1200€", houseCost: "150€", styleOverrides: { barColor: "#fef200" } },

              // Lado Derecho (Verde, Azul)
              { id: uuidv4(), type: "property", title: "Secretaría", text: "Papeleo infinito.", price: 300, rent: "26€", rentHouse1: "130€", rentHouse2: "390€", rentHouse3: "900€", rentHouse4: "1100€", rentHotel: "1275€", houseCost: "200€", styleOverrides: { barColor: "#1fb25a" } },
              { id: uuidv4(), type: "community", title: "Conserjería", text: "Caja de Comunidad." },
              { id: uuidv4(), type: "property", title: "Dirección", text: "Despacho del jefe.", price: 300, rent: "26€", rentHouse1: "130€", rentHouse2: "390€", rentHouse3: "900€", rentHouse4: "1100€", rentHotel: "1275€", houseCost: "200€", styleOverrides: { barColor: "#1fb25a" } },
              { id: uuidv4(), type: "property", title: "Sala de Juntas", text: "Reuniones aburridas.", price: 320, rent: "28€", rentHouse1: "150€", rentHouse2: "450€", rentHouse3: "1000€", rentHouse4: "1200€", rentHotel: "1400€", houseCost: "200€", styleOverrides: { barColor: "#1fb25a" } },
              { id: uuidv4(), type: "property", title: "Cafetería Principal", text: "Bocatas caros.", price: 350, rent: "35€", rentHouse1: "175€", rentHouse2: "500€", rentHouse3: "1100€", rentHouse4: "1300€", rentHotel: "1500€", houseCost: "200€", styleOverrides: { barColor: "#0072bc" } },
              { id: uuidv4(), type: "property", title: "Despacho Conserje Jefe", text: "El trono de Josema.", price: 400, rent: "50€", rentHouse1: "200€", rentHouse2: "600€", rentHouse3: "1400€", rentHouse4: "1700€", rentHotel: "2000€", houseCost: "200€", styleOverrides: { barColor: "#0072bc" } }
            ];
          }

          return {
            templateId: id,
            cover: { 
              ...state.cover, 
              title: coverTitle,
              boardCorners: state.cover.boardCorners || { salida: "🏁 SALIDA", carcel: "🔒 CÁRCEL", parking: "🅿️ PARKING", irCarcel: "👮 IR A CÁRCEL" }
            },
            rules: { ...state.rules, content: rulesContent },
            items: defaultItems
          };
        }),
        
        updateCover: (field, value) => set((state) => ({ 
          cover: { ...state.cover, [field]: value } 
        })),

        updateRules: (content) => set((state) => ({
          rules: { ...state.rules, content }
        })),

        addItem: (type) => set((state) => {
          const newItem: GameItem = { id: uuidv4(), type };
          if (state.templateId === 'sticker_collection' && type === 'sticker') {
            const maxNum = state.items
              .filter(it => it.type === 'sticker')
              .reduce((max, it) => Math.max(max, Number(it.number) || 0), 0);
            newItem.number = maxNum + 1;
            newItem.title = `Cromo ${maxNum + 1}`;
          }
          return { items: [...state.items, newItem] };
        }),

        updateItem: (id, updates) => set((state) => ({
          items: state.items.map((item) => 
            item.id === id ? { ...item, ...updates } : item
          )
        })),

        deleteItem: (id) => set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        })),

        duplicateItem: (id) => set((state) => {
          const itemToDuplicate = state.items.find((item) => item.id === id);
          if (!itemToDuplicate) return state;

          const newItem = { ...itemToDuplicate, id: uuidv4() };
          const itemIndex = state.items.findIndex((item) => item.id === id);
          
          const newItems = [...state.items];
          newItems.splice(itemIndex + 1, 0, newItem);
          
          return { items: newItems };
        })
      }),
      { name: 'ludoforge-game-storage' }
    )
  )
);
