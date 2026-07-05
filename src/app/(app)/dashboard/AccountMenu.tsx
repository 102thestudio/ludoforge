'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function AccountMenu({ 
  email, 
  plan 
}: { 
  email: string, 
  plan: 'FREE' | 'PRO' 
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Ocurrió un error al iniciar el pago.');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePortal = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Ocurrió un error al abrir la gestión de suscripción.');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      {plan === 'FREE' ? (
        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold text-sm rounded-full transition-all duration-200 shadow-md shadow-amber-500/10 cursor-pointer disabled:opacity-50"
        >
          👑 Mejorar a PRO (5€/mes)
        </button>
      ) : (
        <button
          onClick={handlePortal}
          disabled={isLoading}
          className="px-4 py-2 bg-[#18181f] hover:bg-[#222228] border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold text-sm rounded-full transition-all duration-200 cursor-pointer disabled:opacity-50"
        >
          ⚙️ Gestionar suscripción
        </button>
      )}

      <div className="flex items-center gap-3 bg-[#18181f] px-4 py-2 rounded-full border border-[#222228]">
        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
          {email.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium">{email}</span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
          plan === 'PRO' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
        }`}>
          {plan}
        </span>
      </div>

      <button
        onClick={handleSignOut}
        disabled={isLoading}
        className="text-xs text-zinc-500 hover:text-red-400 font-semibold transition-colors cursor-pointer"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
