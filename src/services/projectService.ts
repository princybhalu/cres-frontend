import http from './axios-wrapper'; 

export const getProjectListForDashboard = (filterData : any) => {
  return http.get({
    url: '/project',
    messageSettings: { hideSuccessMessage: true },
  });
};

export const addProjectApiCall = (body : any) => {
  console.log("body : " , body);
return http.post({
  url: '/project',
  data: body,
  messageSettings: { successMessage: "Added Sccessfully" },
});
};

export const getOneProjectData = (projectId: string) => {
  return http.get({
    url: '/project/' + projectId,
    messageSettings: { hideSuccessMessage: true },
  });
};

// memebers
export const getMembersOfProject = (projectId : string) =>  {
  return  http.get({
    url: '/project/members',
    config: {
      headers: {
        'x-project-id': projectId,
      },
    },
    messageSettings: { hideSuccessMessage: true },
  });
}


//progrss
export const getProgessOfProject = (projectId : string) =>  {
  return  http.get({
    url: '/progress',
    config: {
      headers: {
        'x-project-id': projectId,
      },
    },
    messageSettings: { hideSuccessMessage: true },
  });
}

export const addProgessOfProject = (body : any , projectId : string) =>  {
  return  http.post({
    url: '/progress',
    data: body,
    config: {
      headers: {
        'x-project-id': projectId,
      },
    },
  });
}



//task
export const getTaskOfProject = (projectId : string) =>  {
  return  http.get({
    url: '/task',
    config: {
      headers: {
        'x-project-id': projectId,
      },
    },
    messageSettings: { hideSuccessMessage: true },
  });
}

export const addTaskOfProject = (body : any , projectId : string) =>  {
  return  http.post({
    url: '/task',
    data: body,
    config: {
      headers: {
        'x-project-id': projectId,
      },
    },
  });
}
