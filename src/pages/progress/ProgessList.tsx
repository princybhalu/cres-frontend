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

  const [ProgessData, setProgessData] = useState(null);

  const OnClickOnAddOfProgess = () => {
    navigate("/project/" + projectId + "/progress/add");
  };

  const columnDefs = [
    { field: "title", filter: true, name: "title" },
    { field: "description" },
    { field: "status" },
    { field: "due_date" },
    { field: "created_by", headerName: "User", valueGetter: (params : any) => {
      console.log(params);
      if(params.data.created_by === "512107e3-0ee9-4f97-80e5-4b817752b89e") return "princy bhalu";
      return "jeen";
    } },
    {
      headerName: "",filter: false,
      cellRenderer: (params: any) => {
        return (
          <div>
            <button className="rounded-full bg-green-500 p-1 m-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </button>
            <button className="rounded-full bg-red-500 p-1 m-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="rounded-full p-1 m-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-red-800" 
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        );
      },
    },
    // { field: "progress_percentage" },
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
        <p
          className="text-[var(--navbar-bg)] mr-2"
          onClick={() => navigate("/")}
        >
          {" "}
          Projects{" "}
        </p>{" "}
        &gt;
        <p
          className="text-[var(--navbar-bg)] ml-2 mr-2 "
          onClick={() => navigate("/project/" + projectId)}
        >
          {" "}
          {ProjectName}{" "}
        </p>
        &gt;
        <p className="text-[var(--navbar-bg)] ml-2 "> Progess List</p>
      </div>

      {/* Chart section */}
      {/* <div className="container mx-auto">
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
      </div> */}

      {/* header section */}
      <div className="p-2 flex flex-col md:flex-row justify-between items-center max-w-[1280px] mx-auto">
        <div className="flex items-center mb-4 md:mb-0">
          <input
            // value={searchString}
            type="text"
            placeholder="Search"
            className="p-1 rounded border border-gray-300 focus:border-[var(--navbar-bg)] focus:outline-none w-full"
            // onChange={handleSearchInput}
          />
        </div>
        <div className="flex items-center">
          <button
            className="text-[#ffffff] bg-[var(--navbar-bg)] px-4 py-1 rounded mr-4 flex"
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
                flex: 1,
                minWidth: 250
              }}
              onRowClicked={(para) => { 
                console.log(para);
                //@ts-ignore
               return navigate("/project/" + projectId + "/view/" + para.id)}}
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
