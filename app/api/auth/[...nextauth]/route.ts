import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createSupabaseServerClient } from "@/lib/supabase";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // TODO: Implement credentials verification with Supabase
        // For now, returning null (authentication failed)
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Placeholder: In production, validate against Supabase auth
        return {
          id: "1",
          email: credentials.email,
          name: credentials.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Session object for user - token contains id
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };

