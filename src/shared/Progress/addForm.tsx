import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { addProgessOfProject } from '../../services/projectService';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface FormValues {
  title: string;
  description: string;
  dueDate: string;
  taskName?: string;
  media: FileList;
}

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  dueDate: yup.date().required('Due date is required').nullable(),
  taskName: yup.string().optional(),
  // media: yup.mixed().required('Media is required'),
});

const AddFormOfProgress: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    //@ts-ignore
    resolver: yupResolver(schema)
  });

  const [taskNames, setTaskNames] = useState<string[]>([]);
  const [file, fileChange] = useState();
  const user = useSelector((state: RootState) => state.user.user);
  console.log(user);

  const navigate = useNavigate();
  


  const { projectId } = useParams();

  useEffect(() => {
    // Simulating API call to fetch task names
    const fetchTaskNames = async () => {
      // Replace with your API call // TODO : call api here
      const response = await new Promise<string[]>(resolve => {
        setTimeout(() => {
          resolve(['Task 1', 'Task 2', 'Task 3']);
        }, 1000);
      });
      setTaskNames(response);
    };

    fetchTaskNames();
  }, []);

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    // Handle form submission logic here
    try{

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
        media: [urlData],
        //@ts-ignore
        user_id: user.id
      }
             //todo : add task id
            //  task_id: null,
      if(projectId){
        let res = await addProgessOfProject(body , projectId);
        //@ts-ignore
        navigate("/project/" + projectId + "/progress");
      }
    }catch(err){
      console.log(err);
      
    }
  };

  return (
    <div className="mx-auto max-w-5xl border border-gray-500 p-4">
      <p className="text-lg">Add General Details</p>
      <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-2 mx-auto">
            <label className="block">Title</label>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => <input type="text" {...field} placeholder='Enter Title' className="border border-gray-300 p-2 w-full" />}
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>

          <div className="flex-1 p-2 mx-auto">
            <label className="block">Description</label>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => <textarea {...field} placeholder="Enter Description" className="border border-gray-300 p-2 w-full" />}
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-2 mx-auto">
            <label className="block">Due Date</label>
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <input type="date" {...field} className="border border-gray-300 p-2 w-full" />
              )}
            />
            {errors.dueDate && <p className="text-red-500">{errors.dueDate.message}</p>}
          </div>

          <div className="flex-1 p-2 mx-auto">
            <label className="block">Task Name (Optional)</label>
            <Controller
              name="taskName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select {...field} className="border border-gray-300 p-2 w-full">
                  <option value="">Select a task</option>
                  {taskNames.map(task => (
                    <option key={task} value={task}>{task}</option>
                  ))}
                </select>
              )}
            />
          </div>
        </div>

        <div className="flex-1 p-2 mx-auto">
          <label className="block">Media Upload</label>
          <Controller
            name="media"
            control={control}
            render={({ field }) => (
                //@ts-ignore
              <input type="file" {...field} multiple accept="image/*" className="border border-gray-300 p-2 w-full"    onChange={(e) => {
                if (e.target.files) {
                  //@ts-ignore
                  fileChange(e.target.files[0]);
                }
                    
              }} />
            )}
          />
          {errors.media && <p className="text-red-500">{errors.media.message}</p>}
        </div>

        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddFormOfProgress;
