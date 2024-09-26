import { RouteConfig } from './interface/route';
import Dashboard from './pages/Dashbord';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

export const routes: RouteConfig[] = [
  { path: '/', component: Dashboard, protected: true },
  { path: '/login', component: Login, protected: false },
  { path: '*', component: NotFound, protected: false },
];


// // src/routes.ts
// import { CustomRouteObject } from './interface/route';
// import Dashboard from './pages/Dashbord';
// import Login from './pages/Login';

// const routes: CustomRouteObject[] = [
//   {
//     path: '/login',
//     element: Login ,
//   },
//   {
//     path: '/dashboard',
//     element: Dashboard ,
//     protected: true, // Mark as protected
//   },
//   {
//     path: '*',
//     element: Login,
//   },
// ];

// export default routes;
