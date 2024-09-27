import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

const ProjectListView: React.FC = ({ ProjectData }: any) => {
  const [rowData] = useState(ProjectData);
  console.log("ProjectData : ", ProjectData);

  const columnDefs = [
    { field: "title", filter: true, name: "Title" },
    { field: "description" },
    { field: "location", filter: true },
    { field: "newCommentCount" },
    { field: "role" },
    { field: "pendingTaskCount" },
    { field: "pendingProgressCount" },
    { field: "remainingProgessToComplete" },
    { field: "progressPercentage" },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="w-full p-4">
        <div
          className="ag-theme-quartz" // applying the Data Grid theme
          style={{ height: 500 }}
        >
          {" "}
          <AgGridReact
            rowData={rowData}
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
  );
};

export default ProjectListView;
