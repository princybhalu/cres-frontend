import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

const ProjectListView: React.FC = ({ ProjectData }: any) => {
  const [rowData] = useState(ProjectData);
  console.log("ProjectData : ", ProjectData);

  const columnDefs = [
    { field: "name", filter: true, name: "Name" },
    { field: "description" },
    { field: "location", filter: true },
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
              flex: 1
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
