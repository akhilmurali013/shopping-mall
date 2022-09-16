import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginView from "login";

import "./App.less";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="login/*" element={<LoginView />} />
        <Route path="*" element={<Navigate to="login" replace />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
