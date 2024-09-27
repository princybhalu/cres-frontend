import { RouteConfig } from './interface/route';
import Dashboard from './pages/Dashbord';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import AddProject from "./pages/Project/add"

export const routes: RouteConfig[] = [
  { path: '/', component: Dashboard, protected: true, layout: true },
  { path: '/login', component: Login, protected: false, layout: false },
  { path: '/project/add', component: AddProject, protected: true, layout: true },
  { path: '*', component: NotFound, protected: false, layout: false },
];
