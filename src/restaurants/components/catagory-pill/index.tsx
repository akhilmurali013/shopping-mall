import React from "react";

import { CuisineStyle } from "app/types";

import "./styles.less";

const CategoryPill: React.FC<{
  cuisineStyle?: CuisineStyle;
}> = ({ cuisineStyle }) => {
  if (!cuisineStyle) return null;
  return <span className="styled-pill">{cuisineStyle.cuisineStyleName}</span>;
};

export default CategoryPill;
