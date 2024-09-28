import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectProjects } from "../../store/projectsSlice";
import {
  getUserByEmail,
  sendInviteToUser,
  updatePermissionOfUserForProject,
} from "../../services/userSercvices";
import PermissionFormOfNew from "../../shared/permmission/from";
import PermissionFormOfEXisitngUser from "../../shared/permmission/alreadyExisitUser";

const AddMember = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const projects = useSelector(selectProjects);
  const ProjectName = projects.find(({ id }) => id === projectId)?.name;

  const [userEmail, setUserEmail] = useState(null);
  const userEmailRef = useRef(null);

  const [addRoleSection, setAddRoleSection] = useState("");

  const onSearchOfUserEmail = async (e: any) => {
    try {
      if (userEmailRef && userEmailRef.current) {
        // @ts-ignore
        const email = userEmailRef.current.value;
        let { data: user } = await getUserByEmail(email);
        setUserEmail(user);
        setAddRoleSection("old");
      }
    } catch (err) {
      console.log(err);
      setUserEmail(null);
      //@ts-ignore
      if (err.status === 404) {
        //@ts-ignore
        setUserEmail(userEmailRef.current.value);
        setAddRoleSection("new");
      }
    }
  };

  const getCheckedSubPermissions = (permissions: any) => {
    const result = {};

    // @ts-ignore
    permissions.forEach((permission) => {
      if (permission.isChecked) {
        // @ts-ignore
        result[permission.name.toLowerCase()] = {}; // Create an empty object for the main permission
        // @ts-ignore
        permission.subPermissions.forEach((subPermission, index) => {
          if (permission.subChecked[index]) {
            // @ts-ignore
            result[permission.name.toLowerCase()][subPermission] = true; // Add checked sub-permissions
          }
        });
      }
    });
    console.log(result);

    return result;
  };

  const onSubmitOfNewUser = async (data: any) => {
    console.log("data : ", data);
    try {
      let body = {
        email: userEmail,
        projectId: projectId,
        role: data.selectedRole,
        permissions: { ...getCheckedSubPermissions(data.permissions) },
      };
      console.log("body : ", body);

      const res = await sendInviteToUser(body);
      navigate("/project/" + projectId + "/members");

    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitOfOldUser = async (data: any) => {
    console.log("data : ", data);
    try {
      const result = {};

      data.permissions.forEach(
        (permission: {
          isChecked: any;
          subPermissions: any[];
          subChecked: { [x: string]: any };
        }) => {
          if (permission.isChecked) {
            permission.subPermissions.forEach(
              (subPermission: string | number, index: string | number) => {
                if (permission.subChecked[index]) {
                  //@ts-ignore
                  result[subPermission] = true;
                }
              }
            );
          }
        }
      );
      let body = {
        permission: { ...result },
      };
      if (projectId && userEmail) {
        const res = await updatePermissionOfUserForProject(
          body,
          projectId,
          //@ts-ignore
          userEmail.id
        );
        navigate("/project/" + projectId + "/members");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Bradscrems */}
      <div className="w-full p-4 flex text-lg">
        <p className="text-[#2f1380] mr-2" onClick={() => navigate("/")}>
          {" "}
          Projects{" "}
        </p>{" "}
        &gt;
        <p
          className="text-[#2f1380] ml-2 mr-2 "
          onClick={() => navigate("/project/" + projectId)}
        >
          {" "}
          {ProjectName}{" "}
        </p>
        &gt;
        <p
          className="text-[#2f1380] ml-2 mr-2 "
          onClick={() => navigate("/project/" + projectId + "/members")}
        >
          {" "}
          Members List
        </p>
        &gt;
        <p className="text-[#2f1380] ml-2">Add Member </p>
      </div>

      <div className="mx-auto max-w-5xl border border-gray-500 p-4">
        <p className="text-lg">Find User</p>
        <div className="flex">
          <input
            type="email"
            name="email"
            className="p-2 "
            placeholder="Enter User Email"
            ref={userEmailRef}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={onSearchOfUserEmail}
          >
            {" "}
            Search User{" "}
          </button>
        </div>
      </div>

      {addRoleSection !== "" && addRoleSection === "old" && (
        <>
          <div className="mx-auto max-w-5xl border border-gray-500 p-4 mt-3">
            <p className="text-lg">Add Permission of User</p>
            <PermissionFormOfEXisitngUser
              onSubmitOfOldUser={onSubmitOfOldUser}
            />
          </div>
        </>
      )}

      {addRoleSection === "new" && (
        <>
          <div className="mx-auto max-w-5xl border border-gray-500 p-4">
            <PermissionFormOfNew onSubmitOfNewUser={onSubmitOfNewUser} />
          </div>
        </>
      )}
    </>
  );
};

export default AddMember;
