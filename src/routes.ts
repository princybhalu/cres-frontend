import { RouteConfig } from './interface/route';
import Dashboard from './pages/Dashbord';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import AddProject from "./pages/Project/add"
import GetProjectOverview from './pages/Project/getProjectOverview';
import AddUser from './pages/User/add';
import AddMember from './pages/members/addMember';
import MembersList from './pages/members/membersList';

export const routes: RouteConfig[] = [
  { path: '/login', component: Login, protected: false, layout: false },

  { path: '/', component: Dashboard, protected: true, layout: true },
  { path: '/project/add', component: AddProject, protected: true, layout: true },
  { path: '/project/:projectId', component: GetProjectOverview, protected: true, layout: true },
  { path: '/project/:projectId/members', component: MembersList, protected: true, layout: true },
  { path: '/project/:projectId/members/add', component: AddMember, protected: true, layout: true },



  { path: '/users', component: AddUser, protected: true, layout: true },
  { path: '/user/add', component: AddUser, protected: true, layout: true },

  { path: '*', component: NotFound, protected: false, layout: false },
];
