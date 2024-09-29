import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import TaskList from "../shared/Project/listPage";
import { TaskStatusChart } from "../shared/charts/taskStatusChart";
import DateRangePickerComp from "../shared/datePicker";
import UserRoleBarChart from "../shared/charts/barchart";
// import DateRangePicker from "../shared/datePicker";

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  console.log("user : ", user);

  if (!user) return <></>;

  const messages = [
    "New fuel delivery has been scheduled for tomorrow.",
    "Weekly maintenance checks are due this Friday.",
    "Safety training sessions for staff are starting next week.",
    "Inventory for fuel types has been updated.",
    "New customer feedback received regarding service quality.",
  ];

  return (
    <>
      {/* Chart section */}
      {user.role !== "contractor" && (
        <>
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-1 mx-auto">
                <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="p-1 border-b bg-[var(--navbar-bg)]">
                    <p className="text-xl text-center font-semibold text-white">
                      Task by Status
                    </p>
                  </div>
                  <TaskStatusChart isDrillDown />
                </div>
              </div>
              <div className="flex-1 p-1">
                <div className="mx-auto h-full">
                  <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-1 border-b bg-[var(--navbar-bg)] w-full">
                      <p className="text-xl text-center font-semibold text-white">
                        User By Role
                      </p>
                    </div>
                    <div className="mx-auto items-center flex w-full">
                        {/* <img
                          src="contractor-builder-11-svgrepo-com.svg"
                          className="w-full h-auto" 
                          style={{height: "300px"}}
                        /> */}
                        <UserRoleBarChart  />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-1 mx-auto">
                {/* <TaskStatusChart isDrillDown /> */}
                {/* <NotificationCard title="Notifications" messages={messages} /> */}
                <div className="mx-auto h-full">
                  <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-1 border-b bg-[var(--navbar-bg)] w-full">
                      <p className="text-xl text-center font-semibold text-white">
                       Total Sites 100x
                      </p>
                    </div>
                    <div className="mx-auto items-center flex w-full">
                        <img
                          src="location.jpg"
                          className="w-full h-auto" 
                          style={{height: "300px"}}
                        />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* display list */}
      <TaskList />

      {/* <DateRangePickerComp /> */}
    </>
  );
};

export default Dashboard;

interface NotificationCardProps {
  title: string;
  messages: string[];
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  messages,
}) => {
  return (
    <div className="bg-[#446ca5] rounded-lg shadow-lg p-4 m-4 text-white h-full">
      <h2 className="text-xl text-white font-bold mb-2">{title}</h2>
      <ul className="list-disc list-inside">
        {messages.map((msg, index) => (
          <li key={index} className="mt-1">
            {msg}
          </li>
        ))}
      </ul>
    </div>
  );
};
