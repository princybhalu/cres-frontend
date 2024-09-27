import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import TaskList from "../shared/Project/listPage";
import { TaskStatusChart } from "../shared/charts/taskStatusChart";
// import DateRangePicker from "../shared/datePicker";

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user) return <></>;

  return (
    <>
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

      {/* display list */}
      <TaskList />

    </>
  );
};

export default Dashboard;
