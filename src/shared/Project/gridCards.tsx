import React from "react";
import { ProjectForDashboard } from "../../interface/project";
import LocationIcon from "../icons/location-icon";

const ProjectCard: React.FC<{ project: ProjectForDashboard }> = ({
  project,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 m-4 w-64 border border-gray-400">
      {" "}
      {/* Fixed width of cards */}
      {project.newCommentCount > 0 && (
        <div className="bg-green-200 text-green-800 rounded p-2 mb-2 text-sm">
          {project.newCommentCount} new comments
        </div>
      )}{" "}
      
      <h2 className="text-lg font-bold">{project.title}</h2>
      <p className="text-gray-700 mt-2">{project.description}</p>
      <p className="text-gray-600 mt-1 flex">
        {/* Assuming LocationIcon is defined elsewhere */}
        <LocationIcon /> {project.location}
      </p>
      <p className="my-2">
        Progres Percentage : <span className="text-blue-500"> {project.progressPercentage} %  </span>
      </p>
      <div className="relative pt-1 mb-2">
        <div className="flex items-center justify-between">
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${project.progressPercentage}%` }} // Dynamic width based on value prop
              aria-valuenow={project.progressPercentage} // Pass value as a number
              aria-valuemin={0} // Set as a number
              aria-valuemax={100} // Set as a number
            >
              <span className="sr-only">{project.progressPercentage}%</span>
            </div>
          </div>
        </div>
      </div>
      {project.role === "admin" ? (
        <div className="mt-4">
          {project.pendingTaskCount && project.pendingTaskCount > 0 && (
            <p className="text-gray-800">
              Pending Tasks: <span className="text-red-500">{project.pendingTaskCount} </span>
            </p>
          )}
          {project.pendingTaskCount &&
            //@ts-ignore
            project.pendingProgressCount > 0 && (
              <p className="text-gray-800">
                Pending for Review: <span className="text-blue-500"> {project.pendingProgressCount} </span>
              </p>
            )}
        </div>
      ) : (
        <div className="mt-4">
          {project.remainingProgessToComplete &&
            project.remainingProgessToComplete > 0 && (
              <p className="text-gray-800">
                Remaining Progress to Complete:{" "}
                <span className="text-red-500"> {project.remainingProgessToComplete} </span>
              </p>
            )}
        </div>
      )}
    </div>
  );
};

const ProjectList: React.FC = ({ ProjectData }: any) => {
  return (
    <div className="flex flex-wrap justify-center">
      {ProjectData &&
        ProjectData.map((project: ProjectForDashboard) => (
          <ProjectCard key={project.id} project={project} />
        ))}
    </div>
  );
};

export default ProjectList;
