import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 font-sans relative overflow-hidden">
      
      {/* Background radial gradients for premium feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#4f46e5]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-tr from-[#4f46e5] to-indigo-400 rounded-lg flex items-center justify-center shadow-md shadow-[#4f46e5]/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <span className="text-xl font-black tracking-wider text-zinc-100 uppercase">LudoForge</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors">
            Iniciar Sesión
          </Link>
          <Link 
            href="/login" 
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-indigo-500/10"
          >
            Empieza Gratis
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-semibold mb-6">
          <span>🚀 El Canva para diseñadores de juegos de mesa</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 uppercase max-w-4xl mx-auto leading-tight">
          Crea tu juego de mesa en <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400">minutos</span>, no en meses.
        </h1>
        
        <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Diseña, edita e imprime tus propios juegos de mesa y cartas coleccionables. Exportación a PDF pixel-perfect lista para imprimir (Print & Play).
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link 
            href="/login" 
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#4f46e5] to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl font-bold text-base transition-all shadow-lg shadow-[#4f46e5]/20 flex items-center justify-center gap-2"
          >
            <span>Crear mi primer juego gratis</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        </div>

        {/* Visual Mockup Container */}
        <div className="max-w-5xl mx-auto bg-[#111115]/80 border border-[#222228] rounded-2xl p-4 backdrop-blur-xl shadow-2xl shadow-black/80 relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#4f46e5]/10 to-indigo-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="bg-[#070709] rounded-xl overflow-hidden aspect-video border border-[#222228] flex items-center justify-center text-zinc-500 relative">
            
            {/* Visual Editor mockup illustration */}
            <div className="absolute inset-0 flex flex-col md:flex-row">
              {/* Left Bar Mockup */}
              <div className="w-full md:w-1/4 border-r border-[#18181f] p-4 flex flex-col gap-2.5 text-left bg-[#0c0c0e]">
                <div className="h-4 w-1/2 bg-zinc-800 rounded mb-2"></div>
                <div className="h-10 w-full bg-[#18181f] border border-[#222228] rounded-lg"></div>
                <div className="h-10 w-full bg-[#18181f]/40 rounded-lg"></div>
                <div className="h-10 w-full bg-[#18181f]/40 rounded-lg"></div>
              </div>
              {/* Center Canvas Mockup */}
              <div className="flex-1 p-6 flex items-center justify-center bg-[#070709]">
                {/* Visual Representation of TCG card */}
                <div className="w-56 h-80 bg-gradient-to-tr from-indigo-900 to-[#1b1a2e] rounded-2xl border-2 border-indigo-400 p-4 flex flex-col items-center relative shadow-xl shadow-indigo-500/10">
                  <div className="w-full flex justify-between items-center text-xs font-bold text-indigo-300">
                    <span>Gnomo Sabio</span>
                    <span className="bg-indigo-900/50 px-2 py-0.5 rounded">✨ 3</span>
                  </div>
                  <div className="w-full aspect-video bg-zinc-900/60 rounded-xl border border-indigo-500/20 my-3 flex items-center justify-center text-indigo-300/40 text-xl font-bold">
                    🧙‍♂️
                  </div>
                  <div className="flex-1 w-full bg-black/40 rounded-xl p-2.5 border border-zinc-800 text-left text-[9px] text-zinc-300 leading-normal">
                    <p className="font-bold text-zinc-200 mb-0.5">Habilidad:</p>
                    Revela la primera carta de tu mazo. Si es un hechizo, añádelo a tu mano.
                  </div>
                  <div className="w-full flex justify-between items-center text-[10px] font-bold text-indigo-300 mt-2">
                    <span>❤️ 2 HP</span>
                    <span>⚔️ 1 ATK</span>
                  </div>
                </div>
              </div>
              {/* Right Bar Mockup */}
              <div className="w-full md:w-1/4 border-l border-[#18181f] p-4 flex flex-col gap-2.5 text-left bg-[#0c0c0e]">
                <div className="h-4 w-1/3 bg-zinc-800 rounded mb-2"></div>
                <div className="h-8 w-full bg-zinc-800/40 rounded"></div>
                <div className="h-16 w-full bg-zinc-800/40 rounded"></div>
                <div className="h-8 w-1/2 bg-zinc-800/40 rounded"></div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 3 Steps Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-[#18181f]">
        <h2 className="text-2xl sm:text-4xl font-bold text-center uppercase tracking-tight text-white mb-12">
          ¿Cómo funciona LudoForge?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#111115]/50 border border-[#222228] p-8 rounded-2xl text-left">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-xl font-black text-indigo-400 mb-6">
              1
            </div>
            <h3 className="font-bold text-lg text-white mb-3">Elige una Plantilla</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Selecciona entre TCG, Party Games, Roles Ocultos o Tableros. Inicializa el proyecto con reglas preestablecidas y datos estructurados.
            </p>
          </div>
          <div className="bg-[#111115]/50 border border-[#222228] p-8 rounded-2xl text-left">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-xl font-black text-indigo-400 mb-6">
              2
            </div>
            <h3 className="font-bold text-lg text-white mb-3">Personaliza el Contenido</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Usa nuestro editor contextual de 3 columnas para modificar stats, textos e ilustraciones. Aplica temas visuales instantáneos con presets.
            </p>
          </div>
          <div className="bg-[#111115]/50 border border-[#222228] p-8 rounded-2xl text-left">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-xl font-black text-indigo-400 mb-6">
              3
            </div>
            <h3 className="font-bold text-lg text-white mb-3">Exporta a PDF listo para Imprimir</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Descarga un archivo PDF de simetría perfecta con marcas de corte y sangrado profesional para imprimir en casa o copistería.
            </p>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-[#18181f]">
        <h2 className="text-2xl sm:text-4xl font-bold text-center uppercase tracking-tight text-white mb-12">
          Creado para todo tipo de juegos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-[#111115]/40 border border-[#222228] rounded-2xl text-left">
            <span className="text-3xl mb-4 block">🍻</span>
            <h4 className="font-bold text-white mb-2">Juegos de Beber</h4>
            <p className="text-xs text-zinc-500 leading-normal">Crea retos, castigos y reglas absurdas para jugar en grupo y compartir en TikTok.</p>
          </div>
          <div className="p-6 bg-[#111115]/40 border border-[#222228] rounded-2xl text-left">
            <span className="text-3xl mb-4 block">⚔️</span>
            <h4 className="font-bold text-white mb-2">Juegos de Cartas (TCG)</h4>
            <p className="text-xs text-zinc-500 leading-normal">Maqueta personajes, hechizos y trampas con costes, ataque y vida personalizados.</p>
          </div>
          <div className="p-6 bg-[#111115]/40 border border-[#222228] rounded-2xl text-left">
            <span className="text-3xl mb-4 block">❤️</span>
            <h4 className="font-bold text-white mb-2">Parejas / Conexión</h4>
            <p className="text-xs text-zinc-500 leading-normal">Diseña preguntas profundas y juegos íntimos personalizados para conectar en pareja.</p>
          </div>
          <div className="p-6 bg-[#111115]/40 border border-[#222228] rounded-2xl text-left">
            <span className="text-3xl mb-4 block">🎲</span>
            <h4 className="font-bold text-white mb-2">Juegos de Tablero</h4>
            <p className="text-xs text-zinc-500 leading-normal">Edita esquinas, casillas de Monopoly, reglas y manuales en minutos.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-[#18181f]">
        <h2 className="text-2xl sm:text-4xl font-bold text-center uppercase tracking-tight text-white mb-3">
          Suscripciones Simples
        </h2>
        <p className="text-zinc-500 text-center text-sm mb-12">Empieza gratis, actualiza solo cuando necesites calidad profesional.</p>
        
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-[#111115]/40 border border-[#222228] p-8 rounded-2xl flex flex-col text-left">
            <h3 className="text-lg font-bold text-white mb-2">Plan Gratuito</h3>
            <p className="text-xs text-zinc-500 mb-6">Prueba LudoForge sin introducir tarjeta.</p>
            <div className="text-3xl font-black text-white mb-6">0€</div>
            
            <ul className="flex flex-col gap-3.5 mb-8 text-sm text-zinc-400 flex-1">
              <li className="flex items-center gap-2"><svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg> Acceso al editor completo</li>
              <li className="flex items-center gap-2"><svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg> Plantillas básicas</li>
              <li className="flex items-center gap-2"><svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg> Límite de 3 proyectos en la nube</li>
              <li className="text-zinc-500 flex items-center gap-2"><svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg> Exportación con marca de agua</li>
            </ul>
            
            <Link 
              href="/login" 
              className="w-full py-3 text-center bg-[#18181f] hover:bg-[#222228] border border-[#222228] text-white font-bold rounded-xl text-sm transition-colors"
            >
              Comenzar Gratis
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-[#111115]/80 border-2 border-indigo-500 p-8 rounded-2xl flex flex-col text-left relative shadow-xl shadow-indigo-500/5">
            <div className="absolute top-4 right-4 bg-indigo-600 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">Recomendado</div>
            
            <h3 className="text-lg font-bold text-white mb-2">Creador PRO</h3>
            <p className="text-xs text-zinc-500 mb-6">Para diseñadores independientes y entusiastas.</p>
            <div className="text-3xl font-black text-white mb-6">5€ <span className="text-xs text-zinc-500 font-semibold">/ mes</span></div>
            
            <ul className="flex flex-col gap-3.5 mb-8 text-sm text-zinc-300 flex-1">
              <li className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg> <strong>Exportación PDF sin marca de agua</strong></li>
              <li className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg> Proyectos en la nube ilimitados</li>
              <li className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg> Marcas de corte y sangrado avanzado</li>
              <li className="flex items-center gap-2"><svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg> Acceso a todas las plantillas y presets</li>
            </ul>
            
            <Link 
              href="/login" 
              className="w-full py-3 text-center bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-indigo-500/20"
            >
              Convertirse en PRO
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 text-center text-xs text-zinc-600 border-t border-[#18181f] relative z-10">
        <p className="mb-2">© {new Date().getFullYear()} LudoForge. Todos los derechos reservados.</p>
        <p className="italic">LudoForge es una marca creada para divertirse y jugar.</p>
      </footer>
    </div>
  );
}
