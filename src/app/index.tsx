import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <div>12345677</div>
  </QueryClientProvider>
);

export default App;
