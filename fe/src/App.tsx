import TaskManagement from "@features/TaskManagement";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "App.scss";
import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="main">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TaskManagement />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
};

export default App;
