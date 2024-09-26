import { DoesUserHasPermissionsInterface } from "../interface/CanIHavePermissionProps";

export const doesUserHasPermissions = (data : DoesUserHasPermissionsInterface) => {
    let assignedActions = Object.keys(data.userPermissions);
  
    // Check whether organizations is passed and if user is not of MOXFIVE org and orgId not match then set authorized to false
    if (data.projectId && data.userPermissions.hasOwnProperty(data.projectId)) {
      assignedActions = Object.keys(data.userPermissions[data.projectId]);
    }

    // If any is passed then check whether user has any of the provided actions
    if (data.any) {
      return data.actions.some(action => {
        return assignedActions.includes(action);
      });
    } else {
      // Check whether user has all the provided actions
      return data.actions.every(action => {
        return assignedActions.includes(action);
      });
    }
  };