export type UserRole = "administrador" | "usuario";

export type UserProfile = {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  created_at: string;
};

export type RolePermission = {
  role: UserRole;
  module: string;
  can_view: boolean;
  can_create: boolean;
  can_edit: boolean;
  can_delete: boolean;
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role: UserRole;
  }
}
