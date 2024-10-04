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

  


export const getDataOfProgress = (id :string , projectId : any) => {
    
  return http.get({
    url: "/progress",
    config: {
      headers:{
        "x-project-id" : projectId,
      }
    }
  })
}