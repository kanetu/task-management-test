import Profile from "@features/Profile";
import TaskManagement from "@features/TaskManagement";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "App.scss";
import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import tw from "twin.macro";

const Input = tw.input`border hover:border-blue-50 p-5 m-4`;

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="main">
        <BrowserRouter>
          {/* <Header /> */}
          <Routes>
            <Route path="/task-management" element={<TaskManagement />} />
            <Route path="/" element={<AuthRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
};

const AuthRoute: React.FC = () => {
  const isAuthenticated = true;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default App;
