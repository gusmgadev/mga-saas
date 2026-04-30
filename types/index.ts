export type Cliente = {
  id: string;
  nombre: string;
  detalle: string;
  fotos: string[];
  created_at: string;
};

export type Profile = {
  id: string;
  full_name: string | null;
  tenant_id: string | null;
  created_at: string;
};

export type Tenant = {
  id: string;
  name: string;
  slug: string;
  domain: string | null;
  logo_url: string | null;
  created_at: string;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  phone: string | null;
  tenant_id: string | null;
  created_at: string;
};
