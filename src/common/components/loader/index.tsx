import React from "react";

import { Spin } from "antd";

import "./styles.less";

const Loader: React.FC = () => (
  <div className="loader">
    <Spin size="large" />
  </div>
);

export default Loader;
