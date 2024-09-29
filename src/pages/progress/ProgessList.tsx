import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectProjects } from "../../store/projectsSlice";
import { TaskStatusChart } from "../../shared/charts/taskStatusChart";
import PlusIcon from "../../shared/icons/plus-icon";
import { AgGridReact } from "ag-grid-react";
import { getProgessOfProject } from "../../services/projectService";

// {
//   "id": "08e8538b-e530-451f-bb1f-365ed1af5701",
//   "project_id": "58ebca46-a348-490a-8f28-58ea0886defe",
//   "user_id": "10d5396e-9ebc-460d-87fd-a38cd36bc8a4",
//   "task_id": null,
//   "title": " dc",
//   "description": " d",
//   "status": "pending",
//   "media": [
//       "http://res.cloudinary.com/dqh3wljk0/image/upload/v1727503064/Screenshot_from_2024-09-22_11-54-20_w5cuog.png"
//   ],
//   "created_by": "10d5396e-9ebc-460d-87fd-a38cd36bc8a4",
//   "created_at": "2024-09-28 05:57:44.642938",
//   "modified_by": null,
//   "modified_at": null,
//   "deleted_by": null,
//   "deleted_at": null,
//   "progress_percentage": 0,
//   "comments": {},
//   "due_date": null
// }

const ProgessList = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const projects = useSelector(selectProjects);
  const ProjectName = projects.find(({ id }) => id === projectId)?.name;

  const [ProgessData , setProgessData] = useState(null);

  const OnClickOnAddOfProgess = () => {
    navigate("/project/" + projectId + "/progress/add");
  };

  const columnDefs = [
    { field: "title", filter: true, name: "title" },
    {field: "description"},
    { field: "status" },
    { field: "due_date" },
    { field: "progress_percentage" },
  ];

  const getDataOfProgessList = async () => {
    try {
      if (projectId) {
        const { data } = await getProgessOfProject(projectId);
        console.log("memeberDetails : ", data);

        setProgessData(data);
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
        <p className="text-[#2f1380] ml-2 "> Progess List</p>
      </div>

       {/* Chart section */}
       <div className="container mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-2 mx-auto">
            <TaskStatusChart isDrillDown />
          </div>
          <div className="flex-1 p-2 mx-auto">
            <TaskStatusChart isDrillDown />
          </div>
          <div className="flex-1 p-2 mx-auto">
            <TaskStatusChart isDrillDown />
          </div>
        </div>
      </div>

      {/* header section */}
       <div className="p-2 flex flex-col md:flex-row justify-between items-center max-w-[1280px] mx-auto">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-md font-semibold mr-4 text-[#2f1380]">
            Progess
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
            onClick={OnClickOnAddOfProgess}
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
              rowData={ProgessData}
              columnDefs={columnDefs}
              defaultColDef={{
                sortable: true,
                filter: true,
                resizable: true,
                flex:1
              }}
              onRowClicked={() => navigate("/project/" + projectId + "/view")}
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
