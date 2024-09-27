import http from './axios-wrapper'; 
import sampleData from "../constants/sample-data";

export const getProjectListForDashboard = (filterData : any) => {
    console.log("filter data : " , filterData);
    // TODO :
    return sampleData;
  return http.get({
    url: '/project',
    messageSettings: { hideSuccessMessage: true },
  });
};