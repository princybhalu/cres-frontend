import React from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import PlusIcon from "../shared/icons/plus-icon";
import SiteStatusDashboard from "../shared/SiteStatusDashboard";
import SiteStatusDashboardOfProgress from "../shared/SiteStatusDashboardOfProgress";

const NormalUserDashBoard = () => {
  const navigation = useNavigate();

  return (
    <>
      <div className="m-4">
        <div className="flex justify-end">
          <button
            className="bg-[var(--navbar-bg)] text-[var(--navbar-text)] rounded mr-24 p-2 "
            onClick={() => navigation("/addProgress")}
          >
            Add Progress
          </button>
        </div>

        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 mx-auto">
              <SiteStatusDashboard
                //@ts-ignore
                title={"Task Status"}
              />
            </div>
            <div className="flex-1 mx-auto">
              <SiteStatusDashboardOfProgress
                //@ts-ignore
                title={"Progress Status"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NormalUserDashBoard;
