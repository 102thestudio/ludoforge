'use client';

import React, { useState } from 'react';

export function UpgradeModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Hubo un error al iniciar el pago con Stripe. Por favor intenta de nuevo.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Error de conexión.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="bg-[#111115] border border-[#222228] rounded-2xl p-8 max-w-md w-full relative z-10 shadow-2xl shadow-black/80 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-14 h-14 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-md shadow-indigo-500/5">
            💎
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Mejora a Creador PRO</h3>
          <p className="text-xs text-zinc-500 mb-6">Límite de proyectos gratuitos alcanzado (3/3)</p>
          
          <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
            Para seguir creando juegos sin límites en la nube, exportar tus archivos PDF en alta definición sin marcas de agua y usar todas las plantillas avanzadas, actualiza tu cuenta a PRO por solo <strong className="text-zinc-200">5€ al mes</strong>.
          </p>

          <button
            onClick={handleUpgrade}
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-[#4f46e5] to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-[#4f46e5]/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Cargando checkout...</span>
              </>
            ) : (
              <span>Actualizar a PRO</span>
            )}
          </button>
          
          <button 
            onClick={onClose}
            className="mt-3.5 text-xs text-zinc-500 hover:text-zinc-300 font-semibold transition-colors cursor-pointer"
          >
            Quizás más tarde
          </button>
        </div>

      </div>
    </div>
  );
}
