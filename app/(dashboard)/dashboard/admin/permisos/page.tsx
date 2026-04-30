"use client";

import { useState, useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BRAND } from "@/lib/constants";

const MODULES = ["clientes", "servicios", "cobranzas", "admin"];
const ACTIONS = [
  { key: "can_view", label: "Ver" },
  { key: "can_create", label: "Crear" },
  { key: "can_edit", label: "Editar" },
  { key: "can_delete", label: "Eliminar" },
] as const;

type PermissionModule = { can_view: boolean; can_create: boolean; can_edit: boolean; can_delete: boolean };
type Permission = Record<string, Record<string, PermissionModule>>;

function PermissionsContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"usuario" | "administrador">("usuario");
  const [permissions, setPermissions] = useState<Permission>({ usuario: {}, administrador: {} });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
    if (status === "authenticated" && session?.user?.role !== "administrador") {
      router.push("/dashboard?error=access_denied");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/admin/permisos?role=usuario")
      .then((res) => res.json())
      .then((data) => {
        const perm: Permission = { usuario: {}, administrador: {} };
        data.forEach((p: { module: string; can_view: boolean; can_create: boolean; can_edit: boolean; can_delete: boolean }) => {
          perm.usuario[p.module] = {
            can_view: p.can_view,
            can_create: p.can_create,
            can_edit: p.can_edit,
            can_delete: p.can_delete,
          };
        });
        MODULES.forEach((m) => {
          perm.administrador[m] = { can_view: true, can_create: true, can_edit: true, can_delete: true };
        });
        setPermissions(perm);
        setLoading(false);
      });
  }, [status]);

  const handleToggle = async (module: string, actionKey: string) => {
    if (activeTab === "administrador") return;

    const current = (permissions["usuario"]?.[module]?.[actionKey as keyof PermissionModule]) ?? false;
    setPermissions((prev) => ({
      ...prev,
      usuario: {
        ...prev.usuario,
        [module]: {
          ...(prev.usuario?.[module] || { can_view: false, can_create: false, can_edit: false, can_delete: false }),
          [actionKey]: !current,
        },
      },
    }));

    setSaving(true);
    try {
      await fetch("/api/admin/permisos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "usuario",
          module,
          action: actionKey,
          value: !current,
        }),
      });
    } finally {
      setSaving(false);
    }
  };

  const currentPerms = permissions[activeTab] || {};

  if (loading || status === "loading") {
    return (
      <main className="min-h-screen px-6 py-10 flex items-center justify-center">
        <p className="text-gray-500">Cargando permisos...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: BRAND.colors.primary }}>
              Gestión de Permisos
            </h1>
            <p className="text-gray-500 mt-1">Configuración de roles y módulos</p>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 rounded-lg text-sm font-medium border transition hover:bg-gray-50"
            style={{ borderColor: BRAND.colors.primary, color: BRAND.colors.primary }}
          >
            ← Volver al Dashboard
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["usuario", "administrador"] as const).map((role) => (
            <button
              key={role}
              onClick={() => setActiveTab(role)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition capitalize ${
                activeTab === role
                  ? "text-white"
                  : "border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
              style={activeTab === role ? { backgroundColor: BRAND.colors.primary } : {}}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Permissions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Módulo</th>
                {ACTIONS.map((a) => (
                  <th key={a.key} className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    {a.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MODULES.map((module) => (
                <tr key={module} className="hover:bg-gray-50 capitalize">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{module}</td>
                  {ACTIONS.map((action) => {
                    const isChecked = currentPerms[module]?.[action.key] ?? false;
                    const isDisabled = activeTab === "administrador";
                    return (
                      <td key={action.key} className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleToggle(module, action.key)}
                          disabled={isDisabled || saving}
                          className={`w-6 h-6 rounded transition ${
                            isChecked
                              ? isDisabled
                                ? "bg-blue-500 cursor-not-allowed"
                                : "bg-[#6BA3D0] hover:opacity-80"
                              : "bg-gray-200 hover:bg-gray-300"
                          } disabled:opacity-50`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {activeTab === "administrador" && (
          <p className="text-center text-sm text-gray-400 mt-4">
            Los permisos del administrador son fijos y no se pueden editar.
          </p>
        )}
      </div>
    </main>
  );
}

export default function AdminPermisosPage() {
  return (
    <SessionProvider>
      <PermissionsContent />
    </SessionProvider>
  );
}
