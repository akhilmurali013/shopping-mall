import React, { useMemo } from "react";

import { Input } from "antd";

import Label from "common/components/label";

import "./styles.less";

export type CardProps = {
  header: string;
  description: string;
  onEditClick: () => void;
};

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  onEditClick,
  header,
  description,
  children,
}) => (
  <div className="card">
    <div className="card-header">
      <div>
        <div className="header">{header}</div>
        <div>{description}</div>
      </div>
      <button type="button" className="action-button" onClick={onEditClick}>
        Edit
      </button>
    </div>
    <div className="card-content-wrapper">{children}</div>
  </div>
);

const CardContent: React.FC<{
  items: {
    position: number;
    value: string;
    id: string;
  }[];
  noOfItemsRequired: number;
}> = ({ items, noOfItemsRequired }) => {
  const itemsToRender = useMemo(() => {
    if (items?.length < noOfItemsRequired) {
      const emptyItems = Array.from(
        Array(noOfItemsRequired - items?.length).keys()
      ).map((item) => ({
        position: items.length + item + 1,
        value: "None",
        id: `${items.length + item + 1}`,
      }));
      return [...items, ...emptyItems];
    }
    return items;
  }, [items, noOfItemsRequired]);

  return (
    <div className="card-content">
      {itemsToRender?.map((item, index) => (
        <div key={item?.id}>
          <Label>{`Position ${index + 1}`}</Label>
          <Input value={item?.value} size="large" disabled />
        </div>
      ))}
    </div>
  );
};

export default Object.assign(Card, { CardContent });
