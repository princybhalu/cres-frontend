import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getOneProjectData,
  getProgessOfProject,
} from "../../services/projectService";
import LoaderIcon from "../../shared/icons/loader-icon";
import { ProjectRedux } from "../../store/projectsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  removeProject,
  selectProjects,
} from "../../store/projectsSlice";
import { RootState } from "../../store";
import SiteStatusDashboardOfProgress from "../../shared/SiteStatusDashboardOfProgress";
import SiteStatusDashboard from "../../shared/SiteStatusDashboardOfProgress";
import DateRangePickerComp from "../../shared/datePicker";
import DisplayCards from "../../shared/Progress/displayCards";
import StatusDashboard from "../../shared/new"

// {
//   "id": "33bea34f-0e14-4067-bdec-2643af1febe4",
//   "project_id": "4e6f1d28-3af4-467a-9e69-f970a64f1c0d",
//   "user_id": "49bb97b5-8fe5-48c4-9061-3805eaedb31c",
//   "task_id": null,
//   "title": "aaa",
//   "description": "aa",
//   "status": "pending",
//   "media": [
//       "http://res.cloudinary.com/dqh3wljk0/image/upload/v1727531940/Screenshot_from_2024-09-22_11-33-50_zu1prr.png"
//   ],
//   "created_by": "49bb97b5-8fe5-48c4-9061-3805eaedb31c",
//   "created_at": "2024-09-28 13:59:00.830379",
//   "modified_by": null,
//   "modified_at": null,
//   "deleted_by": null,
//   "deleted_at": null,
//   "progress_percentage": 0,
//   "comments": {},
//   "due_date": null
// }
// title , description , status , media[0] , progress_percentage due_date

interface ProjectDataInter {
  id: string;
  name: string;
  description: string;
  picture: string;
  documents: null;
  created_at: string;
  created_by: string;
  modified_at: null;
  modified_by: null;
  deleted_at: null;
  deleted_by: null;
  progress_percentage: number;
  location?: string;
}

const GetProjectOverview = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const user = useSelector((state: RootState) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const [projectData, setProjectData] = useState<ProjectDataInter | null>(null);
  const { projectId } = useParams();
  const navigation = useNavigate();
  const [isOpenDatepicker, setIsOpenDatePicker] = useState(false);

  const [ProgessData, setProgessData] = useState(null);

  const getDataOfProject = async () => {
    try {
      if (projectId) {
        const { data: project } = await getOneProjectData(projectId);
        console.log(project);
        setProjectData(project);
        const newProject: ProjectRedux = {
          id: projectId,
          name: project.name,
          location: project.location,
        };
        dispatch(addProject(newProject));
      }
    } catch (err) {
      console.log("err : ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const goTo = (path: string) => {
    navigation(path);
  };

  useEffect(() => {
    if (user && user.role === "officer") getDataOfProject().then();
    if (user && user.role === "contractor") getDataOfProgessList().then();
  }, []);

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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(ProgessData);
    console.log("isLoading : ", isLoading);

    return () => {};
  }, [ProgessData]);

  return (
    <>
      {isLoading && (
        <>
          {" "}
          <LoaderIcon />{" "}
        </>
      )}
      {!isLoading &&
        user &&
        //@ts-ignore
        user.role === "officer" &&
        projectData && (
          <>
            <div className="mx-auto mt-4 max-w-5xl">
              {/* <h1 className="text-lg text">Project Overview</h1> */}
              {/* General Info */}
              <div className="border border-gray-300 bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xl font-semibold">General Details</p>
                  <button
                    onClick={() => navigation("/")}
                    aria-label="Navigate to Home"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-700 hover:text-gray-900 transition duration-200"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row justify-between my-2">
                  <p className="text-gray-700">
                    Name:{" "}
                    <span className="font-medium">{projectData.name}</span>
                  </p>
                  <p className="text-gray-700 mt-2 sm:mt-0">
                    Location:{" "}
                    <span className="font-medium">
                      {projectData.location ?? "--"}
                    </span>
                  </p>
                </div>
                <div className="my-2">
                  <p className="text-gray-700">
                    Description:{" "}
                    <span className="font-medium">
                      {projectData.description}
                    </span>
                  </p>
                </div>
                {/* <div className="my-2">
                  <p className="text-gray-700">
                    Progress Percentage:{" "}
                    <span className="font-medium">
                      {projectData.progress_percentage} %
                    </span>
                  </p>
                </div> */}
              </div>
              {/* Mertic */}
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 mx-auto">
                    <SiteStatusDashboard
                      //@ts-ignore
                      title={"Task Status"}
                    />
                  </div>
                  <div className="flex-1 mx-auto">
                    <StatusDashboard title={""} />
                  </div>
                </div>
              </div>

              {/* navigation options */}
              <div className="mt-2">
                <p className="text-md"> Suggestions </p>
                <CardNavigation
                  //@ts-ignore
                  projectId={projectId}
                  goTo={goTo}
                />
              </div>
            </div>
          </>
        )}

      {!isLoading &&
        user &&
        //@ts-ignore
        user.role === "contractor" &&
        ProgessData && (
          <>
            <div className="m-4">
              <div className="flex justify-end">
                <button
                  className="bg-[var(--navbar-bg)] text-[var(--navbar-text)] rounded mr-24 p-2 "
                  onClick={() =>
                    navigation("/project/" + projectId + "/progress/add")
                  }
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

              <div className="container mx-auto">
                <div className="flex ml-30">
                  <div className="ml-12">
                    <input
                      type="text"
                      placeholder="Search"
                      className="p-1 rounded border w-full border-gray-300 focus:border-[var(--navbar-bg)] focus:outline-none w-full "
                    />
                  </div>

                  <div className="flex flex-col">
                    <button
                      onClick={() => setIsOpenDatePicker((prv) => !prv)}
                      className="bg-[var(--navbar-bg)] text-[var(--navbar-text)]  p-2 ml-2 "
                    >
                      Select Date Range
                    </button>
                    {isOpenDatepicker && <DateRangePickerComp />}
                  </div>
                </div>

                <div className="flex flex-wrap justify-center">
                  {ProgessData &&
                    //@ts-ignore
                    ProgessData?.length !== 0 &&
                    //@ts-ignore
                    ProgessData.map((_progress) => (
                      <>
                        <div className="p-4">
                          <DisplayCards task={_progress} />
                        </div>
                      </>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
    </>
  );
};

export default GetProjectOverview;

const UsersIcon = () => (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6 w-6 h-6"
    >
      <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
    </svg>
  </>
);

const DocumentTextIcon = () => (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6 h-6 w-6"
    >
      <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
      <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
    </svg>
  </>
);

const ShieldCheckIcon = () => (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6 h-6 w-6 "
    >
      <path
        fillRule="evenodd"
        d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  </>
);

const ChatAlt2Icon = () => (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6 h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
        clipRule="evenodd"
      />
    </svg>
  </>
);

interface NavigationItem {
  key: string;
  label: string;
  position: string;
  onClick: () => void;
  icon: JSX.Element;
  color: string;
}

const CardNavigation = ({
  projectId,
  goTo,
}: {
  projectId: string;
  goTo: (path: string) => void;
}) => {
  const items: NavigationItem[] = [
    {
      key: "/projects/resources",
      label: "Documents",
      position: "leftbar",
      onClick: () => goTo(`/project/${projectId}/resources`),
      icon: <DocumentTextIcon />,
      color: "bg-green-500",
    },
    {
      key: `/projects/${projectId}/progress`,
      label: "Progress",
      position: "leftbar",
      onClick: () => goTo(`/project/${projectId}/progress`),
      icon: <ChatAlt2Icon />,
      color: "bg-blue-500",
    },
    {
      key: "/users",
      label: "Members",
      position: "leftbar",
      onClick: () => goTo(`/project/${projectId}/members`),
      icon: <UsersIcon />,
      color: "bg-red-500",
    },
    {
      key: "/task",
      label: "Task",
      position: "leftbar",
      onClick: () => goTo(`/project/${projectId}/task`),
      icon: <ShieldCheckIcon />,
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {items.map((item) => (
        <div
          key={item.key}
          onClick={item.onClick}
          className={`${item.color} text-white font-bold p-4 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition`}
        >
          <div className="text-3xl mb-2">{item.icon}</div>
          <div>{item.label}</div>
        </div>
      ))}
    </div>
  );
};

const StatusBoxes: React.FC = () => {
  return (
    <div className="flex justify-around max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="flex-1 m-2 p-6 text-white bg-[#446ca5] rounded-lg text-center">
        <h3 className="text-lg font-normal">New</h3>
        <p className="text-3xl font-bold">15</p>
      </div>
      <div className="flex-1 m-2 p-6 text-white bg-[#f39c12] rounded-lg text-center">
        <h3 className="text-lg font-normal">Pending for Approval</h3>
        <p className="text-3xl font-bold">3</p>
      </div>
      <div className="flex-1 m-2 p-6 text-white bg-[#27ae60] rounded-lg text-center">
        <h3 className="text-lg font-normal">Approved</h3>
        <p className="text-3xl font-bold">0</p>
      </div>
      <div className="flex-1 m-2 p-6 text-white bg-[#b7950b] rounded-lg text-center">
        <h3 className="text-lg font-normal">Applied</h3>
        <p className="text-3xl font-bold">0</p>
      </div>
      <div className="flex-1 m-2 p-6 text-white bg-[#e74c3c] rounded-lg text-center">
        <h3 className="text-lg font-normal">Closed</h3>
        <p className="text-3xl font-bold">0</p>
      </div>
      <div className="flex-1 m-2 p-6 text-white bg-[#8e3b47] rounded-lg text-center">
        <h3 className="text-lg font-normal">Rejected</h3>
        <p className="text-3xl font-bold">12</p>
      </div>
    </div>
  );
};


// const StatusDashboard: React.FC = () => {
//   const statuses = [
//     { title: 'New', count: 15, color: '#446ca5' },
//     { title: 'Pending for Approval', count: 3, color: '#f39c12' },
//     { title: 'Approved', count: 0, color: '#27ae60' },
//     { title: 'Applied', count: 0, color: '#b7950b' },
//     { title: 'Closed', count: 0, color: '#e74c3c' },
//     { title: 'Rejected', count: 12, color: '#8e3b47' },
//   ];

//   return (
//     <div className="min-w-[320px] max-w-4xl mx-auto p-4">
//       <div className="flex flex-wrap justify-around bg-white rounded-lg shadow-lg p-4">
//         {statuses.map((status, index) => (
//           <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-2">
//             <div 
//               className="text-white rounded-lg text-center p-4" 
//               style={{ backgroundColor: status.color }}
//             >
//               <h3 className="text-lg font-normal">{status.title}</h3>
//               <p className="text-3xl font-bold">{status.count}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
