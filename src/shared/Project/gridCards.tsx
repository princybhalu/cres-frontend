import React from "react";
import { ProjectForDashboard } from "../../interface/project";
import LocationIcon from "../icons/location-icon";
import { useNavigate } from "react-router-dom";

const ProjectCard: React.FC<{
  project: ProjectForDashboard;
  index: number; 
  user: any
}> = ({ project, index , user }) => {
  const navigation = useNavigate();

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-4 m-4 w-72 h-70 border border-gray-400"
      onClick={() => {
        console.log("in");
        navigation("/project/" + project.id);
      }}
    >
      {/* Fixed width of cards */}
      {index === 0 && user.role !== "contractor" && (
        <div className="bg-red-400 text-white rounded p-2 mb-2 font-semibold text-md">
          {project.newCommentCount ?? 9} Notifiction
        </div>
      )}

      {/* Image Section */}
      {project.picture && (
        <div className="w-70">
          <img
            src={project.picture}
            alt={project.name}
            className="w-full h-32 object-cover rounded mb-2" // Adjust height as needed
          />
        </div>
      )}

      <h2 className="text-lg font-bold">{project.name}</h2>
      <p className="text-gray-700 mt-2">{project.description}</p>
      <p className="text-gray-600 mt-1 flex">
        {/* Assuming LocationgrayIcon is defined elsewhere */}
        <LocationIcon /> {project.location}
      </p>
      {/* <p className="my-2">
      Progress Percentage: <span className="text-blue-500"> {project.progress_percentage} % </span>
    </p> */}
    {/* <div className="relative pt-1 mb-2">
      <div className="flex items-center justify-between">
        <div className="w-full bg-white rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full"
            style={{ width: `${project.progress_percentage}%` }} // Dynamic width based on value prop
            aria-valuenow={project.progress_percentage} // Pass value as a number
            aria-valuemin={0} // Set as a number
            aria-valuemax={100} // Set as a number
          >
            <span className="sr-only">{project.progress_percentage}%</span>
          </div>
        </div>
      </div>
    </div> */}
      {project.role === "admin" ? (
        <div className="mt-4">
          {project.pendingTaskCount && project.pendingTaskCount > 0 && (
            <p className="text-gray-800">
              Pending Tasks:{" "}
              <span className="text-red-500">{project.pendingTaskCount} </span>
            </p>
          )}
          {project.pendingTaskCount &&
            //@ts-ignore
            project.pendingProgressCount > 0 && (
              <p className="text-gray-800">
                Pending for Review:{" "}
                <span className="text-blue-500">
                  {" "}
                  {project.pendingProgressCount}{" "}
                </span>
              </p>
            )}
        </div>
      ) : (
        <div className="mt-4">
          {project.remainingProgessToComplete &&
            project.remainingProgessToComplete > 0 && (
              <p className="text-gray-800">
                Remaining Progress to Complete:{" "}
                <span className="text-red-500">
                  {" "}
                  {project.remainingProgessToComplete}{" "}
                </span>
              </p>
            )}
        </div>
      )}
    </div>
  );
};

const ProjectList: React.FC = ({ ProjectData , user }: any) => {
  return (
    <div className="flex flex-wrap justify-center">
      {ProjectData &&
        ProjectData.map((project: ProjectForDashboard, index: number) => (
          <ProjectCard key={project.id} project={project} index={index} user={user} />
        ))}
    </div>
  );
};

export default ProjectList;
