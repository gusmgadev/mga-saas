export type Database = {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string;
          name: string;
          slug: string;
          domain: string | null;
          logo_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          domain?: string | null;
          logo_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          domain?: string | null;
          logo_url?: string | null;
          created_at?: string;
        };
      };
      // profiles extends auth.users (managed by Supabase Auth)
      // email is read from auth.users — not stored here
      profiles: {
        Row: {
          id: string;           // same UUID as auth.users.id
          full_name: string | null;
          tenant_id: string | null;
          created_at: string;
        };
        Insert: {
          id: string;           // must match an existing auth.users.id
          full_name?: string | null;
          tenant_id?: string | null;
          created_at?: string;
        };
        Update: {
          full_name?: string | null;
          tenant_id?: string | null;
          created_at?: string;
        };
      };
      contacts: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          phone: string | null;
          tenant_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          phone?: string | null;
          tenant_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          phone?: string | null;
          tenant_id?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
};
