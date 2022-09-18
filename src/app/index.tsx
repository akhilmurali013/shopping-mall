import React from "react";

import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginView from "login";

import "./App.less";
import AppLayout from "./components/app-layout";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ErrorBoundary
        FallbackComponent={({ error }) => <div>{error?.name}</div>}
      >
        <Routes>
          <Route path="login/*" element={<LoginView />} />
          <Route path="a/*" element={<AppLayout />} />
          <Route path="*" element={<Navigate to="login" replace />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
