import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const session = req.auth;
  const pathname = req.nextUrl.pathname;

  const requiresAuth = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname.startsWith("/auth/signin") || pathname.startsWith("/auth/registro");
  const isApiProtected = pathname.startsWith("/api/dashboard") || pathname.startsWith("/api/admin");

  if ((requiresAuth || isApiProtected) && !session?.user) {
    const url = new URL("/auth/signin", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/dashboard/admin") && session?.user?.role !== "Administrador") {
    const url = new URL("/dashboard", req.url);
    url.searchParams.set("error", "access_denied");
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/api/admin") && session?.user?.role !== "Administrador") {
    return NextResponse.json({ error: "Se requiere rol de administrador" }, { status: 403 });
  }

  if (isAuthRoute && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|api/contact|api/auth).*)",
  ],
};
