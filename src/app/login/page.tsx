'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptPolicies, setAcceptPolicies] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showBypass, setShowBypass] = useState(false);
  const [bypassCode, setBypassCode] = useState('');

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

  const getPasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const passwordStrength = getPasswordStrength(password);

  const getStrengthLabel = (strength: number) => {
    switch (strength) {
      case 1:
        return { text: 'Insegura (mínimo 6 caracteres)', color: 'bg-red-500', textColor: 'text-red-400' };
      case 2:
        return { text: 'Normal (añade mayúsculas o números)', color: 'bg-amber-500', textColor: 'text-amber-400' };
      case 3:
        return { text: 'Segura (bastante buena)', color: 'bg-yellow-500', textColor: 'text-yellow-400' };
      case 4:
        return { text: '¡Nivel Dios (indescifrable!)', color: 'bg-emerald-500', textColor: 'text-emerald-400' };
      default:
        return { text: 'Demasiado corta', color: 'bg-zinc-800', textColor: 'text-zinc-600' };
    }
  };

  const strengthDetails = getStrengthLabel(passwordStrength);

  const handlePasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      setIsLoading(false);
      return;
    }

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden.');
        setIsLoading(false);
        return;
      }

      if (!acceptPolicies) {
        setError('Debes aceptar nuestra (divertida) política de privacidad.');
        setIsLoading(false);
        return;
      }

      // Registration Flow
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else if (data.session) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setMessage('¡Cuenta creada con éxito! Ya puedes iniciar sesión.');
        setIsSignUp(false);
        setPassword('');
        setConfirmPassword('');
        setAcceptPolicies(false);
      }
    } else {
      // Login Flow
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message === 'Invalid login credentials') {
          setError('Correo o contraseña incorrectos.');
        } else {
          setError(error.message);
        }
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    }
    setIsLoading(false);
  };

  const handleBypassLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

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
    <div className="min-h-screen w-screen bg-[#070709] text-white flex items-center justify-center relative overflow-hidden font-sans py-8">
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
              {/* Tab Selector */}
              <div className="flex bg-[#18181f] p-1 rounded-xl mb-6 border border-[#222228]">
                <button
                  type="button"
                  onClick={() => { setIsSignUp(false); setError(''); setMessage(''); }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${!isSignUp ? 'bg-[#4f46e5] text-white shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  Iniciar Sesión
                </button>
                <button
                  type="button"
                  onClick={() => { setIsSignUp(true); setError(''); setMessage(''); }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${isSignUp ? 'bg-[#4f46e5] text-white shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  Crear Cuenta
                </button>
              </div>

              <h2 className="text-xl font-bold text-zinc-100 mb-2 text-center">
                {isSignUp ? 'Crea tu cuenta' : '¡Te damos la bienvenida!'}
              </h2>
              <p className="text-xs text-zinc-500 text-center mb-6">
                {isSignUp ? 'Completa los datos para empezar a diseñar.' : 'Introduce tus credenciales para acceder.'}
              </p>

              <form onSubmit={handlePasswordAuth} className="flex flex-col gap-4">
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

                <div>
                  <label className="text-xs text-zinc-400 block mb-1.5 font-semibold">Contraseña</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-3 bg-[#18181f] text-zinc-100 border border-[#222228] rounded-xl text-sm focus:outline-none focus:border-[#4f46e5]/60 transition-colors"
                  />
                  
                  {/* Password Strength Indicator */}
                  {isSignUp && password.length > 0 && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center text-[10px] mb-1">
                        <span className="text-zinc-500">Fuerza de la contraseña:</span>
                        <span className={`font-semibold ${strengthDetails.textColor}`}>
                          {strengthDetails.text}
                        </span>
                      </div>
                      <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden flex gap-0.5">
                        <div className={`h-full flex-1 transition-all duration-300 ${passwordStrength >= 1 ? strengthDetails.color : 'bg-transparent'}`} />
                        <div className={`h-full flex-1 transition-all duration-300 ${passwordStrength >= 2 ? strengthDetails.color : 'bg-transparent'}`} />
                        <div className={`h-full flex-1 transition-all duration-300 ${passwordStrength >= 3 ? strengthDetails.color : 'bg-transparent'}`} />
                        <div className={`h-full flex-1 transition-all duration-300 ${passwordStrength >= 4 ? strengthDetails.color : 'bg-transparent'}`} />
                      </div>
                    </div>
                  )}
                </div>

                {isSignUp && (
                  <>
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1.5 font-semibold">Confirmar Contraseña</label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full p-3 bg-[#18181f] text-zinc-100 border border-[#222228] rounded-xl text-sm focus:outline-none focus:border-[#4f46e5]/60 transition-colors"
                      />
                    </div>

                    <div className="flex items-start gap-2.5 mt-1 select-none">
                      <input
                        id="parody-privacy"
                        type="checkbox"
                        required
                        checked={acceptPolicies}
                        onChange={(e) => setAcceptPolicies(e.target.checked)}
                        className="mt-1 h-3.5 w-3.5 rounded border-[#222228] bg-[#18181f] text-[#4f46e5] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#4f46e5]"
                      />
                      <label htmlFor="parody-privacy" className="text-[10px] text-zinc-500 leading-normal cursor-pointer hover:text-zinc-400 transition-colors">
                        Acepto las políticas de privacidad. Entiendo que LudoForge nunca venderá mis datos a megacorporaciones malvadas ni extraterrestres, y prometo no vender mi alma al usar la herramienta.
                      </label>
                    </div>
                  </>
                )}

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
                      <span>Procesando...</span>
                    </>
                  ) : (
                    <span>{isSignUp ? 'Registrarse y Entrar' : 'Iniciar Sesión'}</span>
                  )}
                </button>
              </form>

              <p className="text-[10px] text-zinc-600 text-center mt-5 leading-relaxed">
                Al continuar, aceptas nuestros Términos de Servicio. Acceso seguro por contraseña.
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
