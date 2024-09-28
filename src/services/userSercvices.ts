import { ht } from 'date-fns/locale';
import http from './axios-wrapper'; 

// memebers
export const getUserByEmail = (email : string) =>  {
    return  http.get({
      url: '/user?email=' + email,
      messageSettings: { hideSuccessMessage: true , hideErrorMessage: true },
    });
  }

  export const sendInviteToUser = (body : any) => {
    return http.post({
      url: "/user/invite",
      data: body,
    })
  }

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