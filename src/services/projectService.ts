import http from './axios-wrapper';

export const getProjectListForDashboard = (filterData : any) => {
    console.log("filter data : " , filterData);
    
  return http.get({
    url: '/project',
    messageSettings: { hideSuccessMessage: true },
  });
};