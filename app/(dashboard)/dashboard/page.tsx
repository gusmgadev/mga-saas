import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "./logout-button";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const userEmail = session.user.email ?? "sin-email";
  const userName = session.user.name ?? "Usuario";
  const userRole = session.user.role ?? "usuario";

  return (
    <main className="min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold" style={{ color: BRAND.colors.primary }}>Dashboard</h1>
      <p className="mt-3 text-gray-600">
        Sesión activa correctamente. Esta ruta está protegida por middleware.
      </p>
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm max-w-xl">
        <p className="text-sm text-gray-500">Usuario autenticado</p>
        <p className="mt-1 font-semibold text-gray-800">{userName}</p>
        <p className="text-sm text-gray-600">{userEmail}</p>
        <p className="text-sm text-gray-600 mt-1">
          Rol: <span className="font-semibold">{userRole}</span>
        </p>
      </div>

      {userRole === "Administrador" && (
        <div className="mt-8 max-w-xl">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Administración</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/dashboard/admin/usuarios"
              className="px-5 py-3 rounded-lg font-medium text-white transition hover:shadow-lg"
              style={{ backgroundColor: BRAND.colors.primary }}
            >
              Gestión de Usuarios
            </Link>
            <Link
              href="/dashboard/admin/roles"
              className="px-5 py-3 rounded-lg font-medium border transition hover:bg-gray-50"
              style={{ borderColor: BRAND.colors.primary, color: BRAND.colors.primary }}
            >
              Gestión de Roles
            </Link>
            <Link
              href="/dashboard/admin/permisos"
              className="px-5 py-3 rounded-lg font-medium border transition hover:bg-gray-50"
              style={{ borderColor: BRAND.colors.primary, color: BRAND.colors.primary }}
            >
              Gestión de Permisos
            </Link>
          </div>
        </div>
      )}

      <div className="mt-6">
        <LogoutButton />
      </div>
    </main>
  );
}
