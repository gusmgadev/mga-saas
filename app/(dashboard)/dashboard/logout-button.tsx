"use client";

import { signOut } from "next-auth/react";
import { BRAND } from "@/lib/constants";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
      className="rounded-lg px-4 py-2 font-semibold text-white transition hover:opacity-90"
      style={{ backgroundColor: BRAND.colors.primary }}
    >
      Cerrar sesion
    </button>
  );
}

