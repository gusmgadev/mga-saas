import { auth } from "@/lib/auth";
import { LogoutButton } from "./logout-button";

export default async function DashboardPage() {
  const session = await auth();
  const userEmail = session?.user?.email ?? "sin-email";
  const userName = session?.user?.name ?? "Usuario";
  const userRole = session?.user?.role ?? "usuario";

  return (
    <main className="min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold text-mga-primary">Dashboard</h1>
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
      <div className="mt-6">
        <LogoutButton />
      </div>
    </main>
  );
}
