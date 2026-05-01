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

type Role = {
  id: number;
  name: string;
  description: string | null;
  is_default: boolean;
};

type PermissionModule = { can_view: boolean; can_create: boolean; can_edit: boolean; can_delete: boolean };
type PermissionsByRole = Record<number, Record<string, PermissionModule>>;

function PermissionsContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([]);
  const [activeRoleId, setActiveRoleId] = useState<number | null>(null);
  const [permissions, setPermissions] = useState<PermissionsByRole>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [adminRoleId, setAdminRoleId] = useState<number | null>(null);

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
      .then((rolesData: Role[]) => {
        setRoles(rolesData);
        const admin = rolesData.find((r) => r.name === "Administrador");
        if (admin) setAdminRoleId(admin.id);

        const perm: PermissionsByRole = {};
        const promises = rolesData.map((role) =>
          fetch(`/api/admin/permisos?role_id=${role.id}`)
            .then((res) => res.json())
            .then((data: { module: string; can_view: boolean; can_create: boolean; can_edit: boolean; can_delete: boolean }[]) => {
              perm[role.id] = {};
              data.forEach((p) => {
                perm[role.id][p.module] = {
                  can_view: p.can_view,
                  can_create: p.can_create,
                  can_edit: p.can_edit,
                  can_delete: p.can_delete,
                };
              });
            })
        );

        Promise.all(promises).then(() => {
          setPermissions(perm);
          if (rolesData.length > 0) {
            setActiveRoleId(rolesData[0].id);
          }
          setLoading(false);
        });
      });
  }, [status]);

  const handleToggle = async (module: string, actionKey: string) => {
    if (!activeRoleId || activeRoleId === adminRoleId) return;

    const current = (permissions[activeRoleId]?.[module]?.[actionKey as keyof PermissionModule]) ?? false;
    setPermissions((prev) => ({
      ...prev,
      [activeRoleId]: {
        ...(prev[activeRoleId] || {}),
        [module]: {
          ...(prev[activeRoleId]?.[module] || { can_view: false, can_create: false, can_edit: false, can_delete: false }),
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
          role_id: activeRoleId,
          module,
          action: actionKey,
          value: !current,
        }),
      });
    } finally {
      setSaving(false);
    }
  };

  const activeRole = roles.find((r) => r.id === activeRoleId);
  const currentPerms = activeRoleId ? permissions[activeRoleId] || {} : {};
  const isReadOnly = activeRoleId === adminRoleId;

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

        <div className="flex gap-2 mb-6 flex-wrap">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setActiveRoleId(role.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition capitalize ${
                activeRoleId === role.id
                  ? "text-white"
                  : "border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
              style={activeRoleId === role.id ? { backgroundColor: BRAND.colors.primary } : {}}
            >
              {role.name}
            </button>
          ))}
        </div>

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
                    return (
                      <td key={action.key} className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleToggle(module, action.key)}
                          disabled={isReadOnly || saving}
                          className={`w-6 h-6 rounded transition ${
                            isChecked
                              ? isReadOnly
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

        {isReadOnly && (
          <p className="text-center text-sm text-gray-400 mt-4">
            Los permisos del administrador son fijos y no se pueden editar.
          </p>
        )}

        {activeRole && !isReadOnly && activeRole.is_default && (
          <p className="text-center text-sm text-gray-400 mt-4">
            Este es el rol por defecto (se asigna automáticamente al registrarse).
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
