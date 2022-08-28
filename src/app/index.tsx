import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";

import { Button, Typography } from "antd";
import "./App.less";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <div>12345677</div>
    <Button style={{ backgroundColor: "red" }}>primary</Button>
    <Button type="ghost">ghost</Button>
    <Button type="dashed">dashed</Button>
    <Button type="default">default</Button>
    <Button type="link">link</Button>
    <Button type="text">text</Button>
    <Typography>12344</Typography>
    {/* <Button type="primary">Button</Button>
    <Button type="primary">Button</Button> */}
  </QueryClientProvider>
);

export default App;
