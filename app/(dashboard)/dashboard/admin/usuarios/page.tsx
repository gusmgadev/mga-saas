import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export default async function AdminUsersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  if (session.user.role !== "administrador") {
    redirect("/dashboard?error=access_denied");
  }

  const supabase = createSupabaseServerClient();
  const { data: users } = await supabase
    .from("users")
    .select("id, email, name, role, created_at")
    .order("created_at", { ascending: false }) as { data: { id: string; email: string; name: string | null; role: string; created_at: string }[] | null; error: unknown };

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: BRAND.colors.primary }}>
              Gestión de Usuarios
            </h1>
            <p className="text-gray-500 mt-1">Panel de administración</p>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg text-sm font-medium border transition hover:bg-gray-50"
            style={{ borderColor: BRAND.colors.primary, color: BRAND.colors.primary }}
          >
            ← Volver al Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Nombre</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Rol</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users?.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{user.name || "—"}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "administrador"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.id !== session.user.id ? (
                      <form
                        action={async (formData) => {
                          "use server";
                          const newRole = formData.get("role");
                          const userId = formData.get("userId");
                          await fetch(`/api/admin/usuarios/${userId}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ role: newRole }),
                          });
                        }}
                        className="flex gap-2"
                      >
                        <input type="hidden" name="userId" value={user.id} />
                        {user.role === "usuario" ? (
                          <input type="hidden" name="role" value="administrador" />
                        ) : (
                          <input type="hidden" name="role" value="usuario" />
                        )}
                        <button
                          type="submit"
                          className="text-xs px-3 py-1.5 rounded font-medium transition hover:opacity-80"
                          style={{
                            backgroundColor: BRAND.colors.primary,
                            color: "white",
                          }}
                        >
                          {user.role === "usuario" ? "Promover a Admin" : "Cambiar a Usuario"}
                        </button>
                      </form>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Tu cuenta</span>
                    )}
                  </td>
                </tr>
              ))}
              {(!users || users.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                    No hay usuarios registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
