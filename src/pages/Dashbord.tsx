import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import TaskList from "../shared/Project/listPage";
import { TaskStatusChart } from "../shared/charts/taskStatusChart";
import DateRangePickerComp from "../shared/datePicker";
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
              <div className="flex-1 flex p-1 mx-auto items-center">
                <div className="mx-auto">
                  <img src="petrol-pump.png" className="w-40 h-32" />
                  <p className="text-lg font-bold text-center">Total Site 20</p>
                </div>
              </div>
              <div className="flex-1 p-1 mx-auto mb-3 m-4">
                {/* <TaskStatusChart isDrillDown /> */}
                <NotificationCard title="Notifications" messages={messages} />
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
