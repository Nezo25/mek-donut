import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const { pathname } = request.nextUrl;

  // Se as variáveis de ambiente não estiverem configuradas,
  // permite acessar o login para visualização e exibe instrução na página.
  if (!supabaseUrl || !supabaseAnonKey) {
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.searchParams.set('unconfigured', 'true');
      return NextResponse.redirect(loginUrl);
    }
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // Obter o usuário autenticado via auth.getUser() (recomendado para SSR seguro)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1. Proteger rotas /admin/* (exceto /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Redirecionar usuário já autenticado acessando /admin/login
  if (pathname === '/admin/login' && user) {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = '/admin/produtos';
    return NextResponse.redirect(adminUrl);
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
