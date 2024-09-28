import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectProjects } from "../../store/projectsSlice";
import { TaskStatusChart } from "../../shared/charts/taskStatusChart";
import PlusIcon from "../../shared/icons/plus-icon";
import { AgGridReact } from "ag-grid-react";
import { getProgessOfProject, getTaskOfProject } from "../../services/projectService";

const ProgessList = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const projects = useSelector(selectProjects);
  const ProjectName = projects.find(({ id }) => id === projectId)?.name;

  const [TaskData , setTaskData] = useState(null);

  const OnClickOnAddOfTask = () => {
    navigate("/project/" + projectId + "/task/add");
  };

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
    { field: "role" }
  ];

  const getDataOfProgessList = async () => {
    try {
      if (projectId) {
        const { data } = await getTaskOfProject(projectId);
        console.log("memeberDetails : ", data);

        setTaskData(data);
      }
    } catch (err) {
      console.log("err : ", err);
    } finally {
    }
  };

  useEffect(() => {
    getDataOfProgessList().then();
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
        <p className="text-[#2f1380] ml-2 "> Task List</p>
      </div>

       {/* Chart section */}
       <div className="container mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-2 mx-auto">
            <TaskStatusChart isDrillDown />
          </div>
          
        </div>
      </div>

      {/* header section */}
       <div className="p-2 flex flex-col md:flex-row justify-between items-center max-w-[1280px] mx-auto">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-md font-semibold mr-4 text-[#2f1380]">
            Task
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
            onClick={OnClickOnAddOfTask}
          >
            <span className="mr-2">
              <PlusIcon />
            </span>
            Add
          </button>
        </div>
      </div>

      {/* List DATA SECTION */}
      <div className="flex items-center justify-center">
        <div className="w-full p-4">
          <div
            className="ag-theme-quartz" // applying the Data Grid theme
            style={{ height: 500 }}
          >
            {" "}
            <AgGridReact
              rowData={TaskData}
              columnDefs={columnDefs}
              defaultColDef={{
                sortable: true,
                filter: true,
                resizable: true,
                flex:1
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

export default ProgessList;
