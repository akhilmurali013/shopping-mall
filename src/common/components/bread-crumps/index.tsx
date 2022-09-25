import React from "react";

import { Breadcrumb as AntDBreadcrumb } from "antd";

import Icon from "../icon";

import "./styles.less";

const BreadCrumps: React.FC<{
  pathItems: string[];
}> = ({ pathItems }) => (
  <AntDBreadcrumb
    separator={<Icon name="right" />}
    className="bread-crump-parent"
  >
    {pathItems?.map((item, index) => (
      <AntDBreadcrumb.Item
        key={item}
        className={index === pathItems.length - 1 ? "last-crump" : undefined}
      >
        {item}
      </AntDBreadcrumb.Item>
    ))}
  </AntDBreadcrumb>
);

export default BreadCrumps;
