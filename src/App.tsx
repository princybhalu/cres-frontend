import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { routes } from "./routes";
import ProtectedRoute from "./shared/ProtectedRoute";
import Layout from "./shared/Layout"; // Import your layout
import NotificationWrapper from "./shared/Notification";

const App: React.FC = () => {
  return (
    <>
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
                      {/* Exclude Layout for specific routes like /login */}
                      {route.layout !== false ? (
                        <Layout>
                          <route.component />
                        </Layout>
                      ) : (
                        <route.component />
                      )}
                    </ProtectedRoute>
                  ) : route.layout !== false ? (
                    <Layout>
                      <route.component />
                    </Layout>
                  ) : (
                    <route.component />
                  )
                }
              />
            ))}
          </Routes>
        </Router>
      </Provider>
      <NotificationWrapper />
    </>
  );
};

export default App;
