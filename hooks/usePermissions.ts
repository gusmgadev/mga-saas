"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type PermissionState = {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  loading: boolean;
};

export function usePermissions(moduleName: string): PermissionState {
  const { data: session } = useSession();
  const [state, setState] = useState<PermissionState>({
    canView: false,
    canCreate: false,
    canEdit: false,
    canDelete: false,
    loading: true,
  });

  useEffect(() => {
    if (!session?.user?.role) {
      setState((prev) => ({ ...prev, loading: false }));
      return;
    }

    fetch(`/api/permissions?role=${session.user.role}&module=${moduleName}`)
      .then((res) => {
        if (!res.ok) return { can_view: false, can_create: false, can_edit: false, can_delete: false };
        return res.json();
      })
      .then((data) => {
        setState({
          canView: data.can_view ?? false,
          canCreate: data.can_create ?? false,
          canEdit: data.can_edit ?? false,
          canDelete: data.can_delete ?? false,
          loading: false,
        });
      })
      .catch(() => {
        setState({
          canView: false,
          canCreate: false,
          canEdit: false,
          canDelete: false,
          loading: false,
        });
      });
  }, [session?.user?.role, moduleName]);

  return state;
}
