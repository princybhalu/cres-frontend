import { RouteConfig } from './interface/route';
import Dashboard from './pages/Dashbord';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

export const routes: RouteConfig[] = [
  { path: '/', component: Dashboard, protected: false, layout: true },
  { path: '/login', component: Login, protected: false, layout: false },
  { path: '*', component: NotFound, protected: false, layout: true },
];
