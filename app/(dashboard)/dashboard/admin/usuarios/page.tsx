"use client";

import { useState, useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BRAND } from "@/lib/constants";

type Role = {
  id: number;
  name: string;
};

type User = {
  id: string;
  email: string;
  name: string | null;
  role_id: number;
  role_name: string;
  created_at: string;
};

function AdminUsersContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [changingRole, setChangingRole] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
    if (status === "authenticated" && session?.user?.role !== "Administrador") {
      router.push("/dashboard?error=access_denied");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    Promise.all([
      fetch("/api/admin/usuarios").then((res) => res.json()),
      fetch("/api/admin/roles").then((res) => res.json()),
    ]).then(([usersData, rolesData]) => {
      setUsers(usersData || []);
      setRoles(rolesData || []);
      setLoading(false);
    });
  }, [status]);

  const handleChangeRole = async (userId: string, newRoleId: number) => {
    setChangingRole(userId);
    try {
      const res = await fetch(`/api/admin/usuarios/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role_id: newRoleId }),
      });

      if (res.ok) {
        const role = roles.find((r) => r.id === newRoleId);
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId ? { ...u, role_id: newRoleId, role_name: role?.name || "" } : u
          )
        );
      }
    } finally {
      setChangingRole(null);
    }
  };

  if (loading || status === "loading") {
    return (
      <main className="min-h-screen px-6 py-10 flex items-center justify-center">
        <p className="text-gray-500">Cargando usuarios...</p>
      </main>
    );
  }

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
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 rounded-lg text-sm font-medium border transition hover:bg-gray-50"
            style={{ borderColor: BRAND.colors.primary, color: BRAND.colors.primary }}
          >
            ← Volver al Dashboard
          </button>
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
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{user.name || "—"}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role_name === "Administrador"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.role_name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.id !== session?.user?.id ? (
                      <div className="flex gap-2 items-center">
                        <select
                          value={user.role_id}
                          onChange={(e) => handleChangeRole(user.id, parseInt(e.target.value, 10))}
                          disabled={changingRole === user.id}
                          className="text-xs px-2 py-1.5 rounded border border-gray-300 bg-white disabled:opacity-50"
                        >
                          {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Tu cuenta</span>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
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

export default function AdminUsersPage() {
  return (
    <SessionProvider>
      <AdminUsersContent />
    </SessionProvider>
  );
}
