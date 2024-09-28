import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectProjects } from "../../store/projectsSlice";
import LoaderIcon from "../../shared/icons/loader-icon";
import PlusIcon from "../../shared/icons/plus-icon";
import { AgGridReact } from "ag-grid-react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { getMembersOfProject } from "../../services/projectService";



const MembersList = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const projects = useSelector(selectProjects);
  const ProjectName = projects.find(({ id }) => id === projectId)?.name;
  const [isLoading, setIsLoading] = useState(false);
  const [memeberData, setMemberData] = useState(null);

  const columnDefs = [
    { field: "email", filter: true, name: "Email" },
    {
      headerName: "Full Name",
      valueGetter: (params: any) =>
        `${params.data.firstName} ${params.data.lastName}`,
      // Optional: You can set it as a value formatter
      cellRenderer: (params: any) => {
        return `${params.data.firstname} ${params.data.lastname}`;
      },
      filter: true,
    },
    { field: "role" },
    { field: "age" },
    { field: "dob" },
    { field: "role" },
    // { field: "permissions", 
    //   // cellRenderer: (params: any) => {
    //   // return projectId ? params.data.permissions[projectId] ? Object.keys(params.data.permissions[projectId]) : "" : "";} 
    // },
  ];

  const getDataOfMembeList = async () => {
    try {
      if (projectId) {
        const { data: memeberDetails } = await getMembersOfProject(projectId);
        console.log("memeberDetails : ", memeberDetails);

        setMemberData(memeberDetails);
      }
    } catch (err) {
      console.log("err : ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const OnClickOnAddOfMember = () => {
    navigate("/project/" + projectId + "/members/add");
  };

  useEffect(() => {
    getDataOfMembeList().then();
    return () => {};
  }, []);

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
        <p className="text-[#2f1380] ml-2 "> Members List</p>
      </div>

      {/* matrix */}

      {/* Heder Sections */}
      <div className="p-2 flex flex-col md:flex-row justify-between items-center max-w-[1280px] mx-auto">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-md font-semibold mr-4 text-[#2f1380]">
            Members (10)
          </h1>
          {/* <input
            value={searchString}
            type="text"
            placeholder="Search"
            className="p-1 rounded border border-gray-300 focus:border-[var(--navbar-bg)] focus:outline-none w-full sm:w-1/2"
            onChange={handleSearchInput}
          /> */}
        </div>
        <div className="flex items-center">
          <button
            className="text-[#ffffff] bg-[#2f1380] px-4 py-1 rounded mr-4 flex"
            onClick={OnClickOnAddOfMember}
          >
            <span className="mr-2">
              <PlusIcon />
            </span>
            Add
          </button>
        </div>
      </div>

      {/* grid section */}
      <div className="flex items-center justify-center">
        <div className="w-full p-4">
          <div
            className="ag-theme-quartz" // applying the Data Grid theme
            style={{ height: 500 }}
          >
            {" "}
            <AgGridReact
              rowData={memeberData}
              columnDefs={columnDefs}
              defaultColDef={{
                sortable: true,
                filter: true,
                resizable: true,
              }}
              // pagination={true}
              // paginationPageSize={5}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MembersList;
