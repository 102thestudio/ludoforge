'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showBypass, setShowBypass] = useState(false);
  const [bypassCode, setBypassCode] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlError = params.get('error');
      if (urlError) {
        setError(decodeURIComponent(urlError));
      }
    }
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('¡Revisa tu correo! Te hemos enviado un código y un enlace de acceso.');
      setShowOtpInput(true);
    }
    setIsLoading(false);
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otpCode,
      type: 'email',
    });

    if (error) {
      setError('Código de verificación inválido o caducado. Vuelve a intentarlo.');
    } else {
      router.push('/dashboard');
      router.refresh();
    }
    setIsLoading(false);
  };

  const handleBypassLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Bypass only works with the correct secret code
    const BYPASS_CODE = process.env.NEXT_PUBLIC_DEV_BYPASS_CODE || 'ludo-dev-2025';

    if (bypassCode !== BYPASS_CODE) {
      setError('Código de acceso incorrecto.');
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: 'dev@ludoforge.com',
      password: 'LudoForge2025!',
    });

    if (error) {
      setError('Error al acceder: ' + error.message + '. ¿Creaste el usuario dev@ludoforge.com en Supabase?');
    } else {
      router.push('/dashboard');
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-screen bg-[#070709] text-white flex items-center justify-center relative overflow-hidden font-sans">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#4f46e5]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="w-full max-w-[440px] px-6 z-10">
        {/* Brand Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-tr from-[#4f46e5] to-indigo-400 rounded-xl flex items-center justify-center shadow-lg shadow-[#4f46e5]/25 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h1 className="text-2xl font-black tracking-wider text-zinc-100 uppercase">LudoForge</h1>
          <p className="text-xs text-zinc-500 mt-1">El Canva de los juegos de mesa Print &amp; Play</p>
        </div>

        {/* Card */}
        <div className="bg-[#111115]/80 border border-[#222228]/80 rounded-2xl p-8 backdrop-blur-xl shadow-xl shadow-black/40">

          {!showBypass ? (
            <>
              {showOtpInput ? (
                <>
                  <h2 className="text-xl font-bold text-zinc-100 mb-2 text-center">Introduce tu código</h2>
                  <p className="text-xs text-zinc-500 text-center mb-6">Hemos enviado un código de acceso de 6 dígitos a su correo.</p>

                  <form onSubmit={handleOtpVerification} className="flex flex-col gap-4">
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1.5 font-semibold text-center w-full">Código de Verificación</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="123456"
                        className="w-full p-3 bg-[#18181f] text-zinc-100 border border-[#222228] rounded-xl text-sm focus:outline-none focus:border-[#4f46e5]/60 transition-colors text-center tracking-[8px] font-bold text-lg"
                      />
                    </div>

                    {error && (
                      <div className="text-red-400 text-xs bg-red-950/20 border border-red-950/40 p-3 rounded-lg">
                        {error}
                      </div>
                    )}
                    {message && (
                      <div className="text-emerald-400 text-xs bg-emerald-950/20 border border-emerald-950/40 p-3 rounded-lg flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        {message}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 mt-1 bg-gradient-to-r from-[#4f46e5] to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-md shadow-[#4f46e5]/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Verificando...</span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                          <span>Verificar y entrar</span>
                        </>
                      )}
                    </button>
                  </form>

                  <button
                    onClick={() => {
                      setShowOtpInput(false);
                      setMessage('');
                      setError('');
                    }}
                    className="block mx-auto mt-4 text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                  >
                    Volver a introducir correo
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-zinc-100 mb-2 text-center">¡Te damos la bienvenida!</h2>
                  <p className="text-xs text-zinc-500 text-center mb-6">Introduce tu correo y te enviamos un enlace de acceso instantáneo.</p>

                  <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1.5 font-semibold">Correo Electrónico</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ejemplo@ludoforge.com"
                        className="w-full p-3 bg-[#18181f] text-zinc-100 border border-[#222228] rounded-xl text-sm focus:outline-none focus:border-[#4f46e5]/60 transition-colors"
                      />
                    </div>

                    {error && (
                      <div className="text-red-400 text-xs bg-red-950/20 border border-red-950/40 p-3 rounded-lg">
                        {error}
                      </div>
                    )}
                    {message && (
                      <div className="text-emerald-400 text-xs bg-emerald-950/20 border border-emerald-950/40 p-3 rounded-lg flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        {message}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 mt-1 bg-gradient-to-r from-[#4f46e5] to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-md shadow-[#4f46e5]/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Enviando enlace...</span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                          <span>Enviar enlace mágico</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}

              <p className="text-[10px] text-zinc-600 text-center mt-5 leading-relaxed">
                Al continuar, aceptas nuestros Términos de Servicio. Sin contraseñas, sin complicaciones.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-zinc-100 mb-2 text-center">Acceso Privado</h2>
              <p className="text-xs text-zinc-500 text-center mb-6">Introduce el código de acceso de desarrollo.</p>

              <form onSubmit={handleBypassLogin} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1.5 font-semibold">Código de Acceso</label>
                  <input
                    type="password"
                    required
                    value={bypassCode}
                    onChange={(e) => setBypassCode(e.target.value)}
                    placeholder="••••••••••••••"
                    className="w-full p-3 bg-[#18181f] text-zinc-100 border border-[#222228] rounded-xl text-sm focus:outline-none focus:border-[#4f46e5]/60 transition-colors"
                  />
                </div>

                {error && (
                  <div className="text-red-400 text-xs bg-red-950/20 border border-red-950/40 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 mt-1 bg-gradient-to-r from-[#4f46e5] to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <span>Acceder</span>
                  )}
                </button>
              </form>
            </>
          )}

          {/* Hidden bypass toggle - 5 clicks on the logo activates it */}
          <button
            onClick={() => setShowBypass(!showBypass)}
            className="block mx-auto mt-4 text-[10px] text-zinc-800 hover:text-zinc-600 transition-colors cursor-pointer"
          >
            {showBypass ? '← Volver al login' : '· · ·'}
          </button>

        </div>
      </div>
    </div>
  );
}
