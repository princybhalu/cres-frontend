import React, { useState } from "react";

interface Permission {
  name: string;
  subPermissions: string[];
  isChecked: boolean;
  subChecked: boolean[];
}

const permissionsData: Permission[] = [
  {
    name: "Progress",
    subPermissions: [
      "can-create-progress",
      "can-update-progress",
      "can-delete-progress",
      "can-read-progress",
      "can-status-update-progress",
    ],
    isChecked: false,
    subChecked: Array(5).fill(false),
  },
  {
    name: "Task",
    subPermissions: [
      "can-create-task",
      "can-update-task",
      "can-delete-task",
      "can-read-task",
      "can-status-update-task",
    ],
    isChecked: false,
    subChecked: Array(5).fill(false),
  },
  {
    name: "User",
    subPermissions: [
      "can-create-user",
      "can-update-user",
      "can-delete-user",
      "can-read-user",
    ],
    isChecked: false,
    subChecked: Array(4).fill(false),
  },
  {
    name: "Project",
    subPermissions: [
      "can-create-project",
      "can-update-project",
      "can-delete-project",
      "can-read-project",
    ],
    isChecked: false,
    subChecked: Array(4).fill(false),
  },
];

const roles = ["officer", "contractor", "dealer"];

const PermissionForm: React.FC<{
  onSubmitOfNewUser: (data: {
    selectedRole: string;
    permissions: Permission[];
  }) => void;
}> = ({ onSubmitOfNewUser }) => {
  const [permissions, setPermissions] = useState<Permission[]>(permissionsData);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleCheckboxChange = (index: number) => {
    const updatedPermissions = [...permissions];
    updatedPermissions[index].isChecked = !updatedPermissions[index].isChecked;

    // If the main permission is unchecked, uncheck all sub-permissions
    if (!updatedPermissions[index].isChecked) {
      updatedPermissions[index].subChecked.fill(false);
    }

    setPermissions(updatedPermissions);
  };

  const handleSubCheckboxChange = (parentIndex: number, subIndex: number) => {
    const updatedPermissions = [...permissions];
    updatedPermissions[parentIndex].subChecked[subIndex] =
      !updatedPermissions[parentIndex].subChecked[subIndex];

    // Update the main permission checkbox based on sub-permission states
    updatedPermissions[parentIndex].isChecked = updatedPermissions[
      parentIndex
    ].subChecked.some((checked) => checked);

    setPermissions(updatedPermissions);
  };

  const validateSubPermissions = () => {
    return permissions.every((permission, index) => {
      if (
        permission.isChecked &&
        (permission.name === "Progress" || permission.name === "Task")
      ) {
        return permission.subChecked.some((checked) => checked);
      }
      return true;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      setError("Please select a role.");
      return;
    }

    if (!validateSubPermissions()) {
      setError(
        'Please select at least one sub-permission for "Progress" or "Task".'
      );
      return;
    }

    const isAtLeastOneChecked = permissions.some(
      (permission) =>
        permission.isChecked || permission.subChecked.some((checked) => checked)
    );
    if (!isAtLeastOneChecked) {
      setError("Please assign at least one permission to the user.");
      return;
    }

    setError("");
    onSubmitOfNewUser({ selectedRole, permissions });
    console.log("Submitted Role:", selectedRole);
    console.log("Submitted Permissions:", permissions);
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-4">Assign Permissions</h2>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <div className="mb-4">
        <label className="block mb-2">Select Role:</label>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 w-full"
          required
        >
          <option value="" disabled>
            Select a role
          </option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {permissions.map((permission, parentIndex) => (
        <div key={permission.name} className="mb-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={permission.isChecked}
              onChange={() => handleCheckboxChange(parentIndex)}
              className="mr-2"
            />
            {permission.name}
          </label>
          {permission.isChecked && (
            <div className="ml-4">
              {permission.subPermissions.map((subPermission, subIndex) => (
                <label key={subPermission} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={permission.subChecked[subIndex]}
                    onChange={() =>
                      handleSubCheckboxChange(parentIndex, subIndex)
                    }
                    className="mr-2"
                  />
                  {subPermission}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default PermissionForm;
