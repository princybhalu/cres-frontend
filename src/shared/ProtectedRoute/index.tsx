import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;




// // src/ProtectedRoute.tsx
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// interface ProtectedRouteProps {
//   element: JSX.Element;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
//     // TODO : modify this
//   const isLoggedIn = !!true;
//   return isLoggedIn ? element : <Navigate to="/login" />;
// };

// export default ProtectedRoute;
