import React from "react";

import { Table as AntDTable, Image } from "antd";
import type { TableProps } from "antd/es/table";

import Icon from "../icon";

import "./styles.less";

const Table: React.FC<TableProps<Record<string, unknown>>> = ({ ...props }) => (
  <AntDTable
    {...props}
    className="table"
    pagination={
      (props?.dataSource?.length ?? 0) <= 10
        ? false
        : ["object", "undefined"].includes(typeof props.pagination)
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

const CellWithImage: React.FC<{
  imageUrl: string;
  text: string;
}> = ({ imageUrl, text }) => (
  <div className="cell-with-image">
    {imageUrl && (
      <>
        <Image className="image" src={imageUrl} />
        &nbsp;
      </>
    )}
    {text}
  </div>
);

export default Object.assign(Table, { CellWithImage });
