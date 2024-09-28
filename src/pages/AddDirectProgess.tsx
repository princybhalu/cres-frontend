import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectProjects } from "../store/projectsSlice";
import AddFormOfProgress from "../shared/Progress/addForm";

const AddDirectProgess = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const projects = useSelector(selectProjects);
  const ProjectName = projects.find(({ id }) => id === projectId)?.name;

  return (
    <>
      {/* Bradscrems */}
      <div className="w-full p-4 flex text-lg">
        <p className="text-[#2f1380] mr-2" onClick={() => navigate("/")}>
          {" "}
          Projects{" "}
        </p>{" "}
        &gt;
        <p
          className="text-[#2f1380] ml-2 mr-2 "
          onClick={() => navigate("/project/" + projectId)}
        >
          {" "}
          {ProjectName}{" "}
        </p>
        &gt;
        <p
          className="text-[#2f1380] ml-2 mr-2 "
          onClick={() => navigate("/project/" + projectId + "/progress")}
        >
          {" "}
          Progress List
        </p>
        &gt;
        <p className="text-[#2f1380] ml-2">Add Progress </p>
      </div>

      <AddFormOfProgress />
      {/* <div className="mx-auto max-w-5xl border border-gray-500 p-4">
        <p className="text-lg">Add General Deatils </p>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row">   
            <div className="flex-1 p-2 mx-auto">
              <div className="">
                {" "}
                <label className="">Title</label> 
                <input type="text" name="" />{" "}
              </div>
            </div>
            <div className="flex-1 p-2 mx-auto"></div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default AddDirectProgess;
