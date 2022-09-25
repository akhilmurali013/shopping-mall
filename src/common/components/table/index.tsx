import React from "react";

import { Table as AntDTable } from "antd";
import type { TableProps } from "antd/es/table";

import "./styles.less";
import Icon from "../icon";

const Table: React.FC<TableProps<Record<string, unknown>>> = ({ ...props }) => (
  <AntDTable
    {...props}
    className="table"
    pagination={
      typeof props.pagination === "object"
        ? {
            ...props.pagination,
            position: ["bottomCenter"],
            showSizeChanger: false,
            itemRender: (
              page: number,
              type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
              element: React.ReactNode
            ) => {
              if (type === "prev") {
                return (
                  <div className="next-prev-button">
                    <Icon name="arrow-left" /> Previous
                  </div>
                );
              }
              if (type === "next") {
                return (
                  <div className="next-prev-button">
                    Next <Icon name="arrow-right" />
                  </div>
                );
              }
              return element;
            },
          }
        : props.pagination
    }
  />
);

export default Table;
