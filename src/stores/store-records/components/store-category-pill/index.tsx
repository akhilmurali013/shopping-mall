import React from "react";

import { StoreCatagories } from "app/types/store";

import "./styles.less";

const categoryLabel = {
  [StoreCatagories.APPAREL]: "Apparels",
  [StoreCatagories.FASHION]: "Fashion",
  [StoreCatagories.SHOES]: "Shoes",
};

const categoryStyleMap = {
  [StoreCatagories.APPAREL]: "apparels",
  [StoreCatagories.FASHION]: "fashion",
  [StoreCatagories.SHOES]: "shoes",
};

const StoreCategoryPill: React.FC<{
  category: StoreCatagories;
}> = ({ category }) => {
  const className = categoryStyleMap[category] ?? categoryStyleMap?.SHOES;
  return <span className={`pill ${className}`}>{categoryLabel[category]}</span>;
};

export default StoreCategoryPill;
