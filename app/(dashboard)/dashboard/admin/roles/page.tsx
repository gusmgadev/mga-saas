"use client";

import { useState, useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BRAND } from "@/lib/constants";

type Role = {
  id: number;
  name: string;
  description: string | null;
  is_default: boolean;
  created_at: string;
};

function AdminRolesContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formIsDefault, setFormIsDefault] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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

    fetch("/api/admin/roles")
      .then((res) => res.json())
      .then((data: Role[]) => {
        setRoles(data);
        setLoading(false);
      });
  }, [status]);

  const resetForm = () => {
    setFormName("");
    setFormDescription("");
    setFormIsDefault(false);
    setShowForm(false);
    setEditingRole(null);
    setError("");
  };

  const startEdit = (role: Role) => {
    setEditingRole(role);
    setFormName(role.name);
    setFormDescription(role.description || "");
    setFormIsDefault(role.is_default);
    setShowForm(true);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/roles", {
        method: editingRole ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingRole?.id,
          name: formName,
          description: formDescription,
          is_default: formIsDefault,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al guardar");
        return;
      }

      const { data: updatedRoles } = await fetch("/api/admin/roles").then((r) => r.json());
      setRoles(updatedRoles);
      resetForm();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (role: Role) => {
    if (!confirm(`¿Eliminar el rol "${role.name}"?`)) return;

    const res = await fetch(`/api/admin/roles?id=${role.id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Error al eliminar");
      return;
    }

    setRoles((prev) => prev.filter((r) => r.id !== role.id));
  };

  if (loading || status === "loading") {
    return (
      <main className="min-h-screen px-6 py-10 flex items-center justify-center">
        <p className="text-gray-500">Cargando roles...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: BRAND.colors.primary }}>
              Gestión de Roles
            </h1>
            <p className="text-gray-500 mt-1">Crear y administrar roles del sistema</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 rounded-lg text-sm font-medium border transition hover:bg-gray-50"
              style={{ borderColor: BRAND.colors.primary, color: BRAND.colors.primary }}
            >
              ← Volver al Dashboard
            </button>
            <button
              onClick={() => {
                setEditingRole(null);
                setFormName("");
                setFormDescription("");
                setFormIsDefault(false);
                setShowForm(true);
                setError("");
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition hover:opacity-80"
              style={{ backgroundColor: BRAND.colors.primary }}
            >
              + Nuevo Rol
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4" style={{ color: BRAND.colors.primary }}>
              {editingRole ? "Editar Rol" : "Nuevo Rol"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  minLength={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6BA3D0]"
                  placeholder="Ej: Supervisor"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <input
                  type="text"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2"
                  placeholder="Descripción opcional del rol"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={formIsDefault}
                  onChange={(e) => setFormIsDefault(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="isDefault" className="text-sm text-gray-700">
                  Rol por defecto (se asigna al registrarse)
                </label>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={saving || !formName.trim()}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white transition hover:opacity-80 disabled:opacity-50"
                  style={{ backgroundColor: BRAND.colors.primary }}
                >
                  {saving ? "Guardando..." : editingRole ? "Actualizar" : "Crear"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Nombre</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Descripción</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Default</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {roles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{role.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{role.description || "—"}</td>
                  <td className="px-6 py-4">
                    {role.is_default ? (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Sí
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(role)}
                        className="text-xs px-3 py-1.5 rounded font-medium border transition hover:bg-gray-50"
                        style={{ borderColor: BRAND.colors.secondary, color: BRAND.colors.secondary }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(role)}
                        disabled={role.name === "Administrador"}
                        className="text-xs px-3 py-1.5 rounded font-medium border border-red-300 text-red-600 transition hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {roles.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                    No hay roles registrados
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

export default function AdminRolesPage() {
  return (
    <SessionProvider>
      <AdminRolesContent />
    </SessionProvider>
  );
}
