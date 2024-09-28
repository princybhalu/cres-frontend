import http from './axios-wrapper';

export const updatePermissionOfUserForProject = (body : any , projectId : string , userId : string) => {
    
    return http.put({
      url: "/permission",
      data: body ,
      config: {
        headers:{
          "x-project-id" : projectId,
          "x-user-id" : userId
        }
      }
    })
  }