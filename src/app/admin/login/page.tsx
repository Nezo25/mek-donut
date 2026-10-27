'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/admin/produtos';
  const isUnconfigured = searchParams.get('unconfigured') === 'true';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const supabase = createClient();
      if (!supabase) {
        setErrorMessage(
          'Supabase não configurado. Adicione NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no arquivo .env.local.'
        );
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        setErrorMessage(
          error.message === 'Invalid login credentials'
            ? 'Credenciais inválidas. Verifique seu e-mail e senha de administrador.'
            : error.message
        );
        setLoading(false);
        return;
      }

      if (data.session) {
        router.push(redirectTo);
        router.refresh();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro inesperado ao realizar login.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-md">
        
        {/* Card de Login */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-editorial border border-pink-100 relative overflow-hidden">
          
          {/* Decoração sutil de fundo */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-surface rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-pink-50 rounded-full blur-2xl pointer-events-none" />

          {/* Cabeçalho */}
          <div className="text-center space-y-3 relative z-10 mb-8">
            <Link href="/" className="inline-flex items-center gap-2 group mb-2">
              <span className="text-3xl transition-transform group-hover:rotate-180 duration-500">🍩</span>
              <span className="font-cursive font-bold text-4xl text-brand-primary">Mek Donuts</span>
            </Link>

            <div className="inline-flex items-center gap-1.5 bg-brand-surface border border-pink-100 px-3.5 py-1 rounded-full text-brand-primary text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Painel Administrativo</span>
            </div>

            <h1 className="font-serif text-2xl font-bold text-brand-dark pt-1">
              Acesso Restrito
            </h1>
            <p className="text-xs text-gray-500">
              Entre com suas credenciais do Supabase Auth para gerenciar o cardápio e os pedidos.
            </p>
          </div>

          {/* Alerta de Não Configurado */}
          {isUnconfigured && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1.5">
              <p className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Supabase não configurado no .env.local</span>
              </p>
              <p className="text-amber-800 leading-relaxed">
                Configure as variáveis <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[11px]">NEXT_PUBLIC_SUPABASE_URL</code> e <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[11px]">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> para autenticar administradores.
              </p>
            </div>
          )}

          {/* Mensagem de Erro */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-5 relative z-10">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-brand-primary" />
                <span>E-mail do Administrador</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mekdonuts.com.br"
                className="w-full px-4 py-3 bg-gray-50/70 border border-gray-200 rounded-2xl text-sm text-brand-dark focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-brand-primary" />
                <span>Senha de Acesso</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 pr-11 bg-gray-50/70 border border-gray-200 rounded-2xl text-sm text-brand-dark focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-lg"
                  aria-label={showPassword ? 'Ocultar senha' : 'Ver senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-2xl bg-brand-primary hover:bg-[#d01754] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none group"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Autenticando...</span>
                </>
              ) : (
                <>
                  <span>Entrar no Painel</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Rodapé do Card */}
          <div className="mt-8 pt-6 border-t border-pink-50 text-center">
            <Link
              href="/"
              className="text-xs text-gray-500 hover:text-brand-primary font-medium transition-colors"
            >
              ← Voltar para a Loja Pública
            </Link>
          </div>

        </div>

        {/* Dica de Segurança e Configuração */}
        <div className="mt-6 text-center text-xs text-gray-400 space-y-1">
          <p className="flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Mek Donuts • Autenticação Segura via Supabase Auth</span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
