import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { routes } from './routes';
import ProtectedRoute from './shared/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.protected ? (
                  <ProtectedRoute>
                    <route.component />
                  </ProtectedRoute>
                ) : (
                  <route.component />
                )
              }
            />
          ))}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;