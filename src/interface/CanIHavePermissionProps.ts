export interface CanIHavePermissionProps {
  of: String[];
  children: any;
  hide?: boolean;
  any?: boolean;
  projectId?: string | null;
}

export interface DoesUserHasPermissionsInterface {
  userPermissions: any,
  actions: string[],
  projectId?: string | null,
  any? : boolean,
}