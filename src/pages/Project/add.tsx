import React , {useState}from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addProjectApiCall } from "../../services/projectService";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  location: yup.string(),
  picture: yup.mixed().required("A picture is required"), // Max 2MB
});

interface FormData {
  name: string;
  description: string;
  location: string;
  picture: FileList;
}

const AddProject = () => {
  const navigate = useNavigate();
  const [file, fileChange] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    //@ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    let requestBody = {
      name: data.name,
      description:data.description,
      location: data.location,
      picture: null,
    };

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
    //@ts-ignore
    requestBody.picture = urlData;

    try{
        let data = await addProjectApiCall(requestBody);
        console.log("data : " , data);

        navigate("/"); 
        
    }catch(err){
        console.log("err : " , err);
    }
  };

  return (
    <>
      {/* Bradscrems */}
      <div className="w-full p-4 flex text-lg">
        <p className="text-[var(--navbar-bg)] mr-2" onClick={() => navigate("/")}>
          {" "}
          Projects{" "}
        </p>{" "}
        &gt;
        <p className="text-[var(--navbar-bg)] ml-2 "> Add </p>
      </div>
      {/* Add Form */}
      <div className="bg-gray-100 p-2 h-screen">
        <div className=" mx-auto mt-4 max-w-5xl">
          <h2 className=" text-[var(--navbar-bg)] text-2xl m-2">Add General Details</h2>
 
          <div className="h-full bg-white w-full border border-gray-200 p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Name
                </label>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      placeholder="Enter Name"
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-red-500 text-md">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Description
                </label>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <textarea
                      {...field}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      placeholder="Enter description"
                      rows={4}
                    />
                  )}
                />
                {errors.description && (
                  <p className="text-red-500 text-md">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Location
                </label>
                <Controller
                  name="location"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      placeholder="Enter location"
                    />
                  )}
                />
                {errors.location && (
                  <p className="text-red-500 text-md">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Picture
                </label>
                <Controller
                  name="picture"
                  control={control}
                  //@ts-ignore
                  defaultValue={null}
                  render={({ field: { onChange } }) => (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files) {
                          onChange(e.target.files);
                          //@ts-ignore
                          fileChange(e.target.files[0]);
                        }
                            
                      }}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  )}
                />
                {errors.picture && (
                  <p className="text-red-500 text-md">
                    {errors.picture.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-lg bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProject;
