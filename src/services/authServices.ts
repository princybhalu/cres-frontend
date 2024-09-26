import http from './axios-wrapper';

export const loginUser = (body : any ) => {
  return http.post({
    url: '/user/login',
    data: body,
    messageSettings: { successMessage: 'Login Successfully' },
  });
};