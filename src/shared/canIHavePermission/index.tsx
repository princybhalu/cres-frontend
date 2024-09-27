import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CanIHavePermissionProps } from "../../interface/CanIHavePermissionProps";
import { doesUserHasPermissions } from "../../utils/utils";
import { RootState } from "../../store";
import ErrorComp from "../error";


function CanIHavePermission({
  of: permissions,
  children: component,
  hide = false,
  any = false,
  projectId = null,
}: CanIHavePermissionProps) {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const authorized = doesUserHasPermissions({
      //@ts-ignore  
      userPermissions: user.permissions,
      // @ts-ignore
      actions: permissions,
      projectId: projectId,
      any,
    });

    // Set isAuthorized app loading to false
    setIsAuthorized(authorized);
    setLoading(false);
  }, []);

  return loading ? (
    // isInlineEdit : disable loader from ApiTable inlineEdit.
    <></>
  ) : isAuthorized ? (
    <>{component}</>
  ) : hide ? null : (
    <ErrorComp />
  );
}

export default CanIHavePermission;
