import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const session = req.auth;
  const pathname = req.nextUrl.pathname;

  // Rutas que requieren sesión activa
  const requiresAuth = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname.startsWith("/auth/signin") || pathname.startsWith("/auth/registro");
  const isApiProtected = pathname.startsWith("/api/dashboard") || pathname.startsWith("/api/admin");

  // Si requiere auth y no hay sesión → redirigir a login
  if ((requiresAuth || isApiProtected) && !session?.user) {
    const url = new URL("/auth/signin", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Si es ruta de admin y no es administrador → redirigir a dashboard
  if (pathname.startsWith("/dashboard/admin") && session?.user?.role !== "administrador") {
    const url = new URL("/dashboard", req.url);
    url.searchParams.set("error", "access_denied");
    return NextResponse.redirect(url);
  }

  // Admin API requiere rol de administrador
  if (pathname.startsWith("/api/admin") && session?.user?.role !== "administrador") {
    return NextResponse.json({ error: "Se requiere rol de administrador" }, { status: 403 });
  }

  // Si ya tiene sesión y va a signin/registro → redirigir a dashboard
  if (isAuthRoute && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|api/contact|api/auth).*)",
  ],
};
