// import React from "react";
// import { useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { selectProjects } from "../../store/projectsSlice";
// import "./addProgress.css";

// const AddProgess = () => {
//   const navigate = useNavigate();
//   const { projectId } = useParams();

//   return (
//     <>
//       <div className="dialog-box body-of-form mt-4">
//         <h2>Add General Details</h2>
//         <form>
//           <label htmlFor="title">Title</label>
//           <input type="text" id="title" placeholder="Enter Title" />

//           <label htmlFor="description">Description</label>
//           <textarea id="description" placeholder="Enter Description"></textarea>

//           <label htmlFor="due-date">Due Date</label>
//           <input type="text" id="due-date" placeholder="dd/mm/yyyy" />

//           <label htmlFor="task-name">Task (Optional)</label>
//           <input type="text" id="task-name" placeholder="Enter Task" />

//           <label htmlFor="media-upload">Media Upload</label>
//           <input type="file" id="media-upload" />

//           <button className="add-button" type="submit">Submit</button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddProgess;

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import "./addProgress.css";
import { addProgessOfProject } from "../../services/projectService";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

interface FormData {
  title: string;
  description: string;
  dueDate: string;
  taskName?: string;
  media: FileList;
}

const AddProgress: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [file, fileChange] = useState();
  const user = useSelector((state: RootState) => state.user.user);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      let urlData;
      try {
        //Request Body To Pass Api
        const formData = new FormData();
        console.log(file);
        //@ts-ignore
        formData.append("file", file);
        formData.append("upload_preset", "publish_page");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dqh3wljk0/image/upload`,
          {
            method: "post",
            body: formData,
          }
        );
        urlData = await response.json();
        urlData = urlData?.url;
        console.log(urlData);
      } catch (err) {
        console.log(err);
      }

      let body = {
        ...data,
        due_date: data.dueDate,
        media: [urlData],
        //@ts-ignore
        user_id: user.id,
      };
      //todo : add task id
      //  task_id: null,
      if (projectId) {
        let res = await addProgessOfProject(body, projectId);
        //@ts-ignore
        navigate("/project/" + projectId + "");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dialog-box body-of-form mt-4">
      <h2>Add General Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              type="text"
              id="title"
              placeholder="Enter Title"
              {...field}
            />
          )}
        />
        {errors.title && <p className="error">{errors.title.message}</p>}

        <label htmlFor="description">Description</label>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <textarea
              id="description"
              placeholder="Enter Description"
              {...field}
            />
          )}
        />
        {errors.description && (
          <p className="error">{errors.description.message}</p>
        )}

        <label htmlFor="due-date">Due Date</label>
        <Controller
          name="dueDate"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              type="date"
              id="due-date"
              placeholder="dd/mm/yyyy"
              {...field}
            />
          )}
        />
        {errors.dueDate && <p className="error">{errors.dueDate.message}</p>}

        <label htmlFor="task-name">Task (Optional)</label>
        <Controller
          name="taskName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              type="text"
              id="task-name"
              placeholder="Enter Task"
              {...field}
            />
          )}
        />

        <label htmlFor="media-upload">Media Upload</label>
        {/*  */}
        <input type="file" capture="user" accept="image/"/>
        <input type="file" id="media-upload" {...register("media")}  onChange={(e) => {
                if (e.target.files) {
                  //@ts-ignore
                  fileChange(e.target.files[0]);
                }}} />
        {errors.media && <p className="error">{errors.media.message}</p>}

        <button className="add-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProgress;
