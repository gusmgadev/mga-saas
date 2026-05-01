import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/services/supabase-admin";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").trim();
        const password = String(credentials?.password ?? "");

        if (!email || !password) {
          return null;
        }

        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL || "",
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
        );

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error || !data.user) {
          return null;
        }

        const { data: profile } = await supabaseAdmin
          .from("users")
          .select("id, email, name, role_id")
          .eq("id", data.user.id)
          .single() as { data: { id: string; email: string; name: string | null; role_id: number } | null; error: unknown };

        if (!profile) {
          return null;
        }

        const { data: role } = await supabaseAdmin
          .from("roles")
          .select("id, name")
          .eq("id", profile.role_id)
          .single() as { data: { id: number; name: string } | null; error: unknown };

        if (!role) {
          return null;
        }

        return {
          id: data.user.id,
          email: data.user.email ?? email,
          name: profile.name ?? data.user.email ?? email,
          role: role.name,
          role_id: profile.role_id,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "Usuario";
        token.role_id = (user as { role_id?: number }).role_id ?? 0;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub ?? "";
      session.user.role = token.role as string;
      session.user.role_id = token.role_id as number;
      session.user.name = token.name as string;
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
